package graphql

import (
	"context"
	"errors"
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"

	"backend-crunchyroll/auth"
	"backend-crunchyroll/enums"
	"backend-crunchyroll/models"

	"github.com/graphql-go/graphql"

	"github.com/nedpals/supabase-go"
	"go.uber.org/zap"
)

type Resolver struct {
	DB      *supabase.Client
	logger  *zap.Logger
	cache   *CacheStore
	metrics *ResolverMetrics
}

type CacheStore struct {
	animes              sync.Map // map[string]*models.Anime
	episodes            sync.Map // map[string][]*models.Episode
	animeBySlug         sync.Map // map[string]string (slug -> animeID)
	latestAnimes        []*models.Anime
	popularAnimes       []*models.Anime
	releasingAnimes     []*models.Anime
	seasonPopularAnimes []*models.Anime
	nextSeasonAnimes    []*models.Anime
	hasThumbnail        []*models.Anime
	movie               []*models.Anime
	genres              sync.Map // map[string][]*models.Genre
	latestFetch         time.Time
	popularFetch        time.Time
}

type ResolverMetrics struct {
	cacheHits   int64
	cacheMisses int64
	dbQueries   int64
}

func NewResolver(db *supabase.Client) *Resolver {
	return &Resolver{
		DB:      db,
		logger:  zap.NewExample(),
		cache:   &CacheStore{},
		metrics: &ResolverMetrics{},
	}
}

func (r *Resolver) GetAnimeBySlug(ctx context.Context, args struct{ Slug string }) (*models.Anime, error) {
	if anime, ok := r.getAnimeFromCacheBySlug(args.Slug); ok {
		r.metrics.cacheHits++
		return anime, nil
	}
	r.metrics.cacheMisses++

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	// Buscar dados brutos primeiro para evitar problemas de parsing
	var rawAnimes []map[string]interface{}
	err := r.DB.DB.From("animes").
		Select("*").
		Eq("slug", args.Slug).
		ExecuteWithContext(ctx, &rawAnimes)

	if err != nil {
		r.logger.Error("Falha ao buscar anime", zap.String("slug", args.Slug), zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	if len(rawAnimes) == 0 {
		return nil, errors.New("anime não encontrado")
	}

	rawAnime := rawAnimes[0]
	anime := &models.Anime{
		ID:                 rawAnime["id"].(string),
		PublicCode:         rawAnime["public_code"].(string),
		Slug:               rawAnime["slug"].(string),
		Name:               rawAnime["name"].(string),
		ImagePoster:        rawAnime["image_poster"].(string),
		ImageBannerDesktop: rawAnime["image_banner_desktop"].(string),
		ImageBannerMobile:  rawAnime["image_banner_mobile"].(string),
		ImageCardCompact:   rawAnime["image_card_compact"].(string),
		Synopsis:           rawAnime["synopsis"].(string),
		Rating:             intPtr(int(rawAnime["rating"].(float64))),
		Score:              float64Ptr(rawAnime["score"].(float64)),
		ImageLogo:          rawAnime["image_logo"].(string),
		ImageThumbnail:     rawAnime["image_thumbnail"].(string),
		ContentAdvisory:    rawAnime["content_advisory"].(string),
		IsReleasing:        rawAnime["is_releasing"].(bool),
		IsSeasonPopular:    rawAnime["is_season_popular"].(bool),
		IsNewRelease:       rawAnime["is_new_release"].(bool),
		IsPopular:          rawAnime["is_popular"].(bool),
		HasNextSeason:      rawAnime["has_next_season"].(bool),
		HasThumbnail:       rawAnime["has_thumbnail"].(bool),
		IsMovie:            rawAnime["is_movie"].(bool),
	}

	// Converter campos opcionais com verificação de tipo
	if releaseYear, ok := rawAnime["release_year"].(float64); ok {
		year := int(releaseYear)
		anime.ReleaseYear = &year
	}

	if releaseDateStr, ok := rawAnime["release_date"].(string); ok {
		releaseDate, err := time.Parse("2006-01-02T15:04:05.999999", releaseDateStr)
		if err == nil {
			anime.ReleaseDate = &releaseDate
		}
	}

	if airingDayStr, ok := rawAnime["airing_day"].(string); ok {
		airingDay := enums.AiringDay(airingDayStr)
		anime.AiringDay = &airingDay
	}

	if audioTypeStr, ok := rawAnime["audio_type"].(string); ok {
		audioType := enums.AudioType(audioTypeStr)
		anime.AudioType = &audioType
	}

	// Parse created_at e updated_at com o formato correto
	if createdAtStr, ok := rawAnime["created_at"].(string); ok {
		createdAt, err := time.Parse("2006-01-02T15:04:05.999999", createdAtStr)
		if err == nil {
			anime.CreatedAt = createdAt
		} else {
			anime.CreatedAt = time.Now()
		}
	}

	if updatedAtStr, ok := rawAnime["updated_at"].(string); ok {
		updatedAt, err := time.Parse("2006-01-02T15:04:05.999999", updatedAtStr)
		if err == nil {
			anime.UpdatedAt = updatedAt
		} else {
			anime.UpdatedAt = time.Now()
		}
	}

	// Contar total de episódios
	var countResult []map[string]interface{}
	err = r.DB.DB.From("episodes").
		Select("count").
		Eq("anime_id", anime.ID).
		ExecuteWithContext(ctx, &countResult)

	if err != nil {
		r.logger.Error("Falha ao contar episódios do anime", zap.String("animeID", anime.ID), zap.Error(err))
	} else if len(countResult) > 0 {
		if count, ok := countResult[0]["count"].(float64); ok {
			episodeCount := int(count)
			anime.TotalEpisodes = &episodeCount
		}
	}

	r.cacheAnime(anime)
	r.metrics.dbQueries++

	return anime, nil
}

func (r *Resolver) GetEpisodesByAnime(ctx context.Context, args struct{ AnimeID string }) ([]*models.Episode, error) {
	if episodes, ok := r.cache.episodes.Load(args.AnimeID); ok {
		r.metrics.cacheHits++
		return episodes.([]*models.Episode), nil
	}
	r.metrics.cacheMisses++

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var rawResults []map[string]interface{}
	err := r.DB.DB.From("episodes").
		Select("*").
		Eq("anime_id", args.AnimeID).
		ExecuteWithContext(ctx, &rawResults)

	if err != nil {
		r.logger.Error("Falha ao buscar episódios", zap.String("animeID", args.AnimeID), zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	episodes := make([]*models.Episode, 0, len(rawResults))
	for _, raw := range rawResults {
		episode := &models.Episode{
			ID:            raw["id"].(string),
			AnimeID:       raw["anime_id"].(string),
			PublicCode:    raw["public_code"].(string),
			SeasonID:      raw["season_id"].(string),
			LikesCount:    0,
			DislikesCount: 0,
		}

		// Buscar o número da temporada da tabela anime_seasons
		var seasonResults []map[string]interface{}
		err := r.DB.DB.From("anime_seasons").
			Select("season_number").
			Eq("id", episode.SeasonID).
			ExecuteWithContext(ctx, &seasonResults)

		if err == nil && len(seasonResults) > 0 {
			if seasonNumber, ok := seasonResults[0]["season_number"].(float64); ok {
				episode.Season = int(seasonNumber)
			}
		}

		if title, ok := raw["title"].(string); ok {
			episode.Title = title
		}
		if slug, ok := raw["slug"].(string); ok {
			episode.Slug = slug
		}
		if duration, ok := raw["duration"].(string); ok {
			episode.Duration = &duration
		}
		if synopsis, ok := raw["synopsis"].(string); ok {
			episode.Synopsis = &synopsis
		}
		if image, ok := raw["image"].(string); ok {
			episode.Image = &image
		}

		// Parse release_date
		if releaseDate, ok := raw["release_date"].(string); ok {
			// Tenta diferentes formatos de data
			formats := []string{
				"2006-01-02T15:04:05.999999",
				"2006-01-02T15:04:05Z07:00",
				"2006-01-02",
			}

			var parsedTime time.Time
			var parseErr error

			for _, format := range formats {
				parsedTime, parseErr = time.Parse(format, releaseDate)
				if parseErr == nil {
					episode.ReleaseDate = &parsedTime
					break
				}
			}
		}

		// Parse created_at
		if createdAt, ok := raw["created_at"].(string); ok {
			t, err := time.Parse("2006-01-02T15:04:05.999999", createdAt)
			if err == nil {
				episode.CreatedAt = t
			} else {
				episode.CreatedAt = time.Now() // Fallback para data atual
			}
		}

		// Parse updated_at
		if updatedAt, ok := raw["updated_at"].(string); ok {
			t, err := time.Parse("2006-01-02T15:04:05.999999", updatedAt)
			if err == nil {
				episode.UpdatedAt = t
			} else {
				episode.UpdatedAt = time.Now() // Fallback para data atual
			}
		}

		// Fetch episode versions
		var versions []map[string]interface{}
		err = r.DB.DB.From("episode_versions").
			Select("*").
			Eq("episode_id", episode.ID).
			ExecuteWithContext(ctx, &versions)

		if err != nil {
			r.logger.Error("Falha ao buscar versões do episódio", zap.String("episodeID", episode.ID), zap.Error(err))
			continue
		}

		episode.Versions = make([]models.EpisodeVersion, 0, len(versions))
		for _, v := range versions {
			version := models.EpisodeVersion{
				ID:        v["id"].(string),
				EpisodeID: v["episode_id"].(string),
				VideoURL:  v["video_url"].(string),
			}

			if languageType, ok := v["language_type"].(string); ok {
				version.LanguageType = enums.EpisodeLanguageType(languageType)
			}

			// Parse created_at
			if createdAt, ok := v["created_at"].(string); ok {
				t, err := time.Parse("2006-01-02T15:04:05.999999", createdAt)
				if err == nil {
					version.CreatedAt = t
				} else {
					version.CreatedAt = time.Now()
				}
			}

			// Parse updated_at
			if updatedAt, ok := v["updated_at"].(string); ok {
				t, err := time.Parse("2006-01-02T15:04:05.999999", updatedAt)
				if err == nil {
					version.UpdatedAt = t
				} else {
					version.UpdatedAt = time.Now()
				}
			}

			episode.Versions = append(episode.Versions, version)
		}

		if likesCount, ok := raw["likes_count"].(float64); ok {
			episode.LikesCount = int(likesCount)
		}
		if dislikesCount, ok := raw["dislikes_count"].(float64); ok {
			episode.DislikesCount = int(dislikesCount)
		}

		episodes = append(episodes, episode)
	}

	r.cache.episodes.Store(args.AnimeID, episodes)
	r.metrics.dbQueries++

	return episodes, nil
}

func (r *Resolver) GetLatestReleases(ctx context.Context) ([]*models.Anime, error) {
	if !r.cache.latestFetch.IsZero() && time.Since(r.cache.latestFetch) < 5*time.Minute && len(r.cache.latestAnimes) > 0 {
		r.metrics.cacheHits++
		return r.cache.latestAnimes, nil
	}
	r.metrics.cacheMisses++

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var animes []*models.Anime
	err := r.DB.DB.From("animes").
		Select("*").
		Eq("is_new_release", strconv.FormatBool(true)).
		ExecuteWithContext(ctx, &animes)

	if err != nil {
		r.logger.Error("Falha ao buscar lançamentos recentes", zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	for _, anime := range animes {
		r.cacheAnime(anime)
	}

	r.cache.latestAnimes = animes
	r.cache.latestFetch = time.Now()
	r.metrics.dbQueries++

	return animes, nil
}

func (r *Resolver) GetPopularAnimes(ctx context.Context) ([]*models.Anime, error) {
	if !r.cache.popularFetch.IsZero() && time.Since(r.cache.popularFetch) < 5*time.Minute && len(r.cache.popularAnimes) > 0 {
		r.metrics.cacheHits++
		return r.cache.popularAnimes, nil
	}
	r.metrics.cacheMisses++

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var animes []*models.Anime
	err := r.DB.DB.From("animes").
		Select("*").
		Eq("is_popular", strconv.FormatBool(true)).
		ExecuteWithContext(ctx, &animes)

	if err != nil {
		r.logger.Error("Falha ao buscar animes populares", zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	for _, anime := range animes {
		r.cacheAnime(anime)
	}

	r.cache.popularAnimes = animes
	r.cache.popularFetch = time.Now()
	r.metrics.dbQueries++

	return animes, nil
}

func (r *Resolver) GetReleasingAnimes(ctx context.Context) ([]*models.Anime, error) {
	if !r.cache.popularFetch.IsZero() && time.Since(r.cache.popularFetch) < 5*time.Minute && len(r.cache.releasingAnimes) > 0 {
		r.metrics.cacheHits++
		return r.cache.releasingAnimes, nil
	}
	r.metrics.cacheMisses++

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var animes []*models.Anime
	err := r.DB.DB.From("animes").
		Select("*").
		Eq("is_releasing", strconv.FormatBool(true)).
		ExecuteWithContext(ctx, &animes)

	if err != nil {
		r.logger.Error("Falha ao buscar animes em lancamento", zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	for _, anime := range animes {
		r.cacheAnime(anime)
	}

	r.cache.releasingAnimes = animes
	r.cache.popularFetch = time.Now()
	r.metrics.dbQueries++

	return animes, nil
}

// GetAnimeOfTheDay retrieves a random anime from the database
// GetAnimeOfTheDay retrieves a random anime from the database based on the current day of the week.
func (r *Resolver) GetAnimeOfTheDay(ctx context.Context) (*models.Anime, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	currentDay := strings.ToLower(time.Now().Weekday().String())

	var animes []*models.Anime
	err := r.DB.DB.From("animes").
		Select("*").
		Eq("airing_day", currentDay).
		ExecuteWithContext(ctx, &animes)

	if err != nil {
		r.logger.Error("Falha ao buscar animes", zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	if len(animes) == 0 {
		return nil, nil
	}

	randomIndex := rand.Intn(len(animes))
	anime := animes[randomIndex]
	r.cacheAnime(anime)
	r.metrics.dbQueries++

	return anime, nil
}

func (r *Resolver) GetSeasonPopularAnimes(ctx context.Context) ([]*models.Anime, error) {
	if !r.cache.popularFetch.IsZero() && time.Since(r.cache.popularFetch) < 5*time.Minute && len(r.cache.seasonPopularAnimes) > 0 {
		r.metrics.cacheHits++
		return r.cache.seasonPopularAnimes, nil
	}
	r.metrics.cacheMisses++

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var animes []*models.Anime
	err := r.DB.DB.From("animes").
		Select("*").
		Eq("is_season_popular", strconv.FormatBool(true)).
		ExecuteWithContext(ctx, &animes)

	if err != nil {
		r.logger.Error("Falha ao buscar animes de season popular", zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	for _, anime := range animes {
		r.cacheAnime(anime)
	}

	r.cache.seasonPopularAnimes = animes
	r.cache.popularFetch = time.Now()
	r.metrics.dbQueries++

	return animes, nil
}

func (r *Resolver) GetNextSeasonAnimes(ctx context.Context) ([]*models.Anime, error) {
	if !r.cache.popularFetch.IsZero() && time.Since(r.cache.popularFetch) < 5*time.Minute && len(r.cache.nextSeasonAnimes) > 0 {
		r.metrics.cacheHits++
		return r.cache.nextSeasonAnimes, nil
	}
	r.metrics.cacheMisses++

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var animes []*models.Anime
	err := r.DB.DB.From("animes").
		Select("*").
		Eq("has_next_season", strconv.FormatBool(true)).
		ExecuteWithContext(ctx, &animes)

	if err != nil {
		r.logger.Error("Falha ao buscar animes de temporadas futuras", zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	for _, anime := range animes {
		r.cacheAnime(anime)
	}

	r.cache.seasonPopularAnimes = animes
	r.cache.popularFetch = time.Now()
	r.metrics.dbQueries++

	return animes, nil
}

func (r *Resolver) GetHasThumbnail(ctx context.Context) ([]*models.Anime, error) {
	if !r.cache.popularFetch.IsZero() && time.Since(r.cache.popularFetch) < 5*time.Minute && len(r.cache.hasThumbnail) > 0 {
		r.metrics.cacheHits++
		return r.cache.hasThumbnail, nil
	}
	r.metrics.cacheMisses++

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var animes []*models.Anime
	err := r.DB.DB.From("animes").
		Select("*").
		Eq("has_thumbnail", strconv.FormatBool(true)).
		ExecuteWithContext(ctx, &animes)

	if err != nil {
		r.logger.Error("Falha ao buscar animes de com thumbnails", zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	for _, anime := range animes {
		r.cacheAnime(anime)
	}

	r.cache.hasThumbnail = animes
	r.cache.popularFetch = time.Now()
	r.metrics.dbQueries++

	return animes, nil
}

func (r *Resolver) GetMovie(ctx context.Context) ([]*models.Anime, error) {
	if !r.cache.popularFetch.IsZero() && time.Since(r.cache.popularFetch) < 5*time.Minute && len(r.cache.movie) > 0 {
		r.metrics.cacheHits++
		return r.cache.movie, nil
	}
	r.metrics.cacheMisses++

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var animes []*models.Anime
	err := r.DB.DB.From("animes").
		Select("*").
		Eq("is_movie", strconv.FormatBool(true)).
		ExecuteWithContext(ctx, &animes)

	if err != nil {
		r.logger.Error("Falha ao buscar filmes", zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	for _, anime := range animes {
		r.cacheAnime(anime)
	}

	r.cache.hasThumbnail = animes
	r.cache.popularFetch = time.Now()
	r.metrics.dbQueries++

	return animes, nil
}

func (r *Resolver) GetDubbedAnimes(ctx context.Context) ([]*models.Anime, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var animes []*models.Anime
	err := r.DB.DB.From("animes").
		Select("*").
		In("audio_type", []string{"subtitled_dubbed"}).
		ExecuteWithContext(ctx, &animes)

	if err != nil {
		r.logger.Error("Falha ao buscar animes dublados", zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	if len(animes) == 0 {
		return nil, nil
	}

	for _, anime := range animes {
		r.cacheAnime(anime)
	}

	r.metrics.dbQueries++

	return animes, nil
}

func (r *Resolver) GetAllAnimeNames(ctx context.Context) ([]string, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var results []map[string]interface{}
	err := r.DB.DB.From("animes").
		Select("name").
		ExecuteWithContext(ctx, &results)

	if err != nil {
		r.logger.Error("Falha ao buscar nomes de animes", zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	animeNames := make([]string, len(results))
	for i, result := range results {
		if name, ok := result["name"].(string); ok {
			animeNames[i] = name
		} else {
			r.logger.Error("Nome do anime não é uma string", zap.Any("result", result))
			return nil, errors.New("erro interno do servidor: nome do anime inválido")
		}
	}

	r.metrics.dbQueries++

	return animeNames, nil
}

// -- Cache helpers --

func (r *Resolver) cacheAnime(anime *models.Anime) {
	r.cache.animes.Store(anime.ID, anime)
	r.cache.animeBySlug.Store(anime.Slug, anime.ID)
}

func (r *Resolver) getAnimeFromCacheBySlug(slug string) (*models.Anime, bool) {
	if id, ok := r.cache.animeBySlug.Load(slug); ok {
		if anime, ok := r.cache.animes.Load(id.(string)); ok {
			return anime.(*models.Anime), true
		}
	}
	return nil, false
}

// -- Monitoring & Cache --

func (r *Resolver) GetCacheStats() map[string]int64 {
	return map[string]int64{
		"hits":    r.metrics.cacheHits,
		"misses":  r.metrics.cacheMisses,
		"queries": r.metrics.dbQueries,
	}
}

func (r *Resolver) InvalidateCache() {
	r.cache = &CacheStore{}
	r.logger.Info("Cache invalidado")
}

func (r *Resolver) GetGenresByAnimeId(ctx context.Context, args struct{ AnimeID string }) ([]*models.Genre, error) {
	if genres, ok := r.cache.genres.Load(args.AnimeID); ok {
		r.metrics.cacheHits++
		return genres.([]*models.Genre), nil
	}
	r.metrics.cacheMisses++

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	// Primeiro, buscar os IDs dos gêneros na tabela de relacionamento
	var genreRelations []struct {
		GenreID string `json:"genre_id"`
	}
	err := r.DB.DB.From("anime_genres").
		Select("genre_id").
		Eq("anime_id", args.AnimeID).
		ExecuteWithContext(ctx, &genreRelations)

	if err != nil {
		r.logger.Error("Falha ao buscar relações de gêneros", zap.String("animeID", args.AnimeID), zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	if len(genreRelations) == 0 {
		return []*models.Genre{}, nil
	}

	// Extrair os IDs dos gêneros
	genreIDs := make([]string, len(genreRelations))
	for i, relation := range genreRelations {
		genreIDs[i] = relation.GenreID
	}

	// Buscar os dados brutos dos gêneros primeiro
	var rawGenres []map[string]interface{}
	err = r.DB.DB.From("genres").
		Select("*").
		In("id", genreIDs).
		ExecuteWithContext(ctx, &rawGenres)

	if err != nil {
		r.logger.Error("Falha ao buscar gêneros", zap.String("animeID", args.AnimeID), zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	// Converter dados brutos para struct Genre manualmente
	genres := make([]*models.Genre, 0, len(rawGenres))
	for _, rawGenre := range rawGenres {
		genre := &models.Genre{
			ID:   rawGenre["id"].(string),
			Name: rawGenre["name"].(string),
		}

		// Converter created_at
		if createdAtStr, ok := rawGenre["created_at"].(string); ok {
			createdAt, err := time.Parse("2006-01-02T15:04:05.999999", createdAtStr)
			if err == nil {
				genre.CreatedAt = createdAt
			} else {
				genre.CreatedAt = time.Now() // Fallback para data atual
			}
		}

		// Converter updated_at
		if updatedAtStr, ok := rawGenre["updated_at"].(string); ok {
			updatedAt, err := time.Parse("2006-01-02T15:04:05.999999", updatedAtStr)
			if err == nil {
				genre.UpdatedAt = updatedAt
			} else {
				genre.UpdatedAt = time.Now() // Fallback para data atual
			}
		}

		genres = append(genres, genre)
	}

	r.cache.genres.Store(args.AnimeID, genres)
	r.metrics.dbQueries += 2 // Incrementa 2 porque fizemos duas queries

	return genres, nil
}

func (r *Resolver) GetAudioLanguagesByAnimeId(ctx context.Context, args struct{ AnimeID string }) ([]string, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var results []map[string]interface{}
	err := r.DB.DB.From("anime_audio_languages").
		Select("audio_language").
		Eq("anime_id", args.AnimeID).
		ExecuteWithContext(ctx, &results)

	if err != nil {
		r.logger.Error("Falha ao buscar audio languages", zap.String("animeID", args.AnimeID), zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	audioLanguages := make([]string, 0, len(results))
	for _, result := range results {
		if language, ok := result["audio_language"].(string); ok {
			audioLanguages = append(audioLanguages, language)
		}
	}

	r.metrics.dbQueries++
	return audioLanguages, nil
}

func (r *Resolver) GetSubtitlesByAnimeId(ctx context.Context, args struct{ AnimeID string }) ([]string, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var results []map[string]interface{}
	err := r.DB.DB.From("anime_subtitles").
		Select("subtitle_language").
		Eq("anime_id", args.AnimeID).
		ExecuteWithContext(ctx, &results)

	if err != nil {
		r.logger.Error("Falha ao buscar subtitles", zap.String("animeID", args.AnimeID), zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	subtitles := make([]string, 0, len(results))
	for _, result := range results {
		if language, ok := result["subtitle_language"].(string); ok {
			subtitles = append(subtitles, language)
		}
	}

	r.metrics.dbQueries++
	return subtitles, nil
}

func (r *Resolver) GetSeasonsByAnimeId(ctx context.Context, args struct{ AnimeID string }) ([]*models.AnimeSeason, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	// Buscar dados brutos primeiro para evitar problemas de parsing
	var rawSeasons []map[string]interface{}
	err := r.DB.DB.From("anime_seasons").
		Select("*").
		Eq("anime_id", args.AnimeID).
		ExecuteWithContext(ctx, &rawSeasons)

	if err != nil {
		r.logger.Error("Falha ao buscar temporadas", zap.String("animeID", args.AnimeID), zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	// Converter dados brutos para struct AnimeSeason manualmente
	seasons := make([]*models.AnimeSeason, 0, len(rawSeasons))
	for _, rawSeason := range rawSeasons {
		season := &models.AnimeSeason{
			ID:           rawSeason["id"].(string),
			AnimeID:      rawSeason["anime_id"].(string),
			SeasonNumber: int(rawSeason["season_number"].(float64)),
		}

		// Converter campos opcionais com verificação de tipo
		if name, ok := rawSeason["season_name"].(string); ok {
			season.SeasonName = &name
		}

		if seasonType, ok := rawSeason["season"].(string); ok {
			seasonEnum := enums.SeasonEnum(seasonType)
			season.Season = &seasonEnum
		}

		// Parse created_at e updated_at com o formato correto
		if createdAtStr, ok := rawSeason["created_at"].(string); ok {
			createdAt, err := time.Parse("2006-01-02T15:04:05.999999", createdAtStr)
			if err == nil {
				season.CreatedAt = createdAt
			} else {
				season.CreatedAt = time.Now()
			}
		}

		if updatedAtStr, ok := rawSeason["updated_at"].(string); ok {
			updatedAt, err := time.Parse("2006-01-02T15:04:05.999999", updatedAtStr)
			if err == nil {
				season.UpdatedAt = updatedAt
			} else {
				season.UpdatedAt = time.Now()
			}
		}

		// Contar episódios para esta temporada
		var countResult []map[string]interface{}
		err := r.DB.DB.From("episodes").
			Select("count").
			Eq("season_id", season.ID).
			ExecuteWithContext(ctx, &countResult)

		if err != nil {
			r.logger.Error("Falha ao contar episódios da temporada", zap.String("seasonID", season.ID), zap.Error(err))
		} else if len(countResult) > 0 {
			if count, ok := countResult[0]["count"].(float64); ok {
				episodeCount := int(count)
				season.TotalEpisodes = &episodeCount
			}
		}

		seasons = append(seasons, season)
	}

	r.metrics.dbQueries++
	return seasons, nil
}

func (r *Resolver) GetContentSourcesByAnimeId(ctx context.Context, args struct{ AnimeID string }) ([]*models.ContentSource, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var rawResults []map[string]interface{}
	err := r.DB.DB.From("content_sources").
		Select("*").
		Eq("anime_id", args.AnimeID).
		ExecuteWithContext(ctx, &rawResults)

	if err != nil {
		r.logger.Error("Falha ao buscar fontes de conteúdo", zap.String("animeID", args.AnimeID), zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	contentSources := make([]*models.ContentSource, 0, len(rawResults))
	for _, raw := range rawResults {
		cs := &models.ContentSource{
			ID: raw["id"].(string),
		}

		if animeID, ok := raw["anime_id"].(string); ok {
			cs.AnimeID = &animeID
		}
		if movieID, ok := raw["movie_id"].(string); ok {
			cs.MovieID = &movieID
		}
		if sourceType, ok := raw["source_type"].(string); ok {
			cs.SourceType = enums.SourceType(sourceType)
		}
		if title, ok := raw["title"].(string); ok {
			cs.Title = &title
		}
		if authors, ok := raw["authors"].(string); ok {
			cs.Authors = &authors
		}
		if copyright, ok := raw["copyright"].(string); ok {
			cs.Copyright = &copyright
		}

		// Parse created_at
		if createdAt, ok := raw["created_at"].(string); ok {
			t, err := time.Parse("2006-01-02T15:04:05.999999", createdAt)
			if err == nil {
				cs.CreatedAt = t
			} else {
				cs.CreatedAt = time.Now() // Fallback para data atual
			}
		}

		// Parse updated_at
		if updatedAt, ok := raw["updated_at"].(string); ok {
			t, err := time.Parse("2006-01-02T15:04:05.999999", updatedAt)
			if err == nil {
				cs.UpdatedAt = t
			} else {
				cs.UpdatedAt = time.Now() // Fallback para data atual
			}
		}

		contentSources = append(contentSources, cs)
	}

	r.metrics.dbQueries++
	return contentSources, nil
}

func (r *Resolver) Animes(ctx context.Context) ([]*models.Anime, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var animes []*models.Anime
	err := r.DB.DB.From("animes").
		Select("*").
		ExecuteWithContext(ctx, &animes)

	if err != nil {
		r.logger.Error("Falha ao buscar animes", zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	// For each anime, fetch its audio languages, subtitles, and seasons
	for _, anime := range animes {
		// Fetch audio languages
		audioLanguages, err := r.GetAudioLanguagesByAnimeId(ctx, struct{ AnimeID string }{AnimeID: anime.ID})
		if err != nil {
			r.logger.Error("Falha ao buscar audio languages", zap.String("animeID", anime.ID), zap.Error(err))
			continue
		}
		anime.AudioLanguages = audioLanguages

		// Fetch subtitles
		subtitles, err := r.GetSubtitlesByAnimeId(ctx, struct{ AnimeID string }{AnimeID: anime.ID})
		if err != nil {
			r.logger.Error("Falha ao buscar subtitles", zap.String("animeID", anime.ID), zap.Error(err))
			continue
		}
		anime.Subtitles = subtitles

		// Fetch seasons
		seasons, err := r.GetSeasonsByAnimeId(ctx, struct{ AnimeID string }{AnimeID: anime.ID})
		if err != nil {
			r.logger.Error("Falha ao buscar seasons", zap.String("animeID", anime.ID), zap.Error(err))
			continue
		}
		// Converter slice de ponteiros para slice de valores
		seasonsValues := make([]models.AnimeSeason, len(seasons))
		for i, s := range seasons {
			seasonsValues[i] = *s
		}
		anime.Seasons = seasonsValues
	}

	r.metrics.dbQueries++
	return animes, nil
}

func (r *Resolver) GetEpisodeByPublicCode(ctx context.Context, args struct{ PublicCode string }) (*models.Episode, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var results []*models.Episode
	err := r.DB.DB.From("episodes").
		Select("*").
		Eq("public_code", args.PublicCode).
		ExecuteWithContext(ctx, &results)

	if err != nil {
		r.logger.Error("Falha ao buscar episódio", zap.String("publicCode", args.PublicCode), zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	if len(results) == 0 {
		return nil, nil
	}

	episode := results[0]

	// Fetch episode versions
	var versions []map[string]interface{}
	err = r.DB.DB.From("episode_versions").
		Select("*").
		Eq("episode_id", episode.ID).
		ExecuteWithContext(ctx, &versions)

	if err != nil {
		r.logger.Error("Falha ao buscar versões do episódio", zap.String("episodeID", episode.ID), zap.Error(err))
		return episode, nil // Retorna o episódio mesmo sem as versões
	}

	episode.Versions = make([]models.EpisodeVersion, 0, len(versions))
	for _, v := range versions {
		version := models.EpisodeVersion{
			ID:        v["id"].(string),
			EpisodeID: v["episode_id"].(string),
			VideoURL:  v["video_url"].(string),
		}

		if languageType, ok := v["language_type"].(string); ok {
			version.LanguageType = enums.EpisodeLanguageType(languageType)
		}

		// Parse created_at
		if createdAt, ok := v["created_at"].(string); ok {
			t, err := time.Parse("2006-01-02T15:04:05.999999", createdAt)
			if err == nil {
				version.CreatedAt = t
			} else {
				version.CreatedAt = time.Now()
			}
		}

		// Parse updated_at
		if updatedAt, ok := v["updated_at"].(string); ok {
			t, err := time.Parse("2006-01-02T15:04:05.999999", updatedAt)
			if err == nil {
				version.UpdatedAt = t
			} else {
				version.UpdatedAt = time.Now()
			}
		}

		episode.Versions = append(episode.Versions, version)
	}

	r.metrics.dbQueries++
	return episode, nil
}

// VoteAnime permite que um usuário autenticado vote em um anime (1-5 estrelas)
func (r *Resolver) VoteAnime(p graphql.ResolveParams) (interface{}, error) {
	req, ok := p.Context.Value("httpRequest").(*http.Request)
	if !ok {
		return false, errors.New("request context missing")
	}
	userID, err := auth.GetUserIDFromRequest(req)
	if err != nil {
		return false, errors.New("unauthorized: " + err.Error())
	}
	animeID, _ := p.Args["animeId"].(string)
	score, _ := p.Args["score"].(int)
	if score < 1 || score > 5 {
		return false, errors.New("score must be between 1 and 5")
	}
	// Upsert voto
	vote := map[string]interface{}{
		"anime_id":   animeID,
		"user_id":    userID,
		"score":      score,
		"updated_at": time.Now(),
	}
	// Tenta atualizar, se não existir, insere
	err = r.DB.DB.From("anime_votes").Upsert(vote).Execute(nil)
	if err != nil {
		return false, errors.New("failed to upsert vote: " + err.Error())
	}
	// Recalcula score
	var result []map[string]interface{}
	err = r.DB.DB.From("anime_votes").Select("avg(score) as avg_score").Eq("anime_id", animeID).Execute(&result)
	if err == nil && len(result) > 0 {
		if avg, ok := result[0]["avg_score"].(float64); ok {
			_ = r.DB.DB.From("animes").Update(map[string]interface{}{"score": avg, "updated_at": time.Now()}).Eq("id", animeID).Execute(nil)
		}
	}
	// Limpa cache após votar
	r.InvalidateCache()
	return true, nil
}

// VoteEpisode permite que um usuário autenticado vote em um episódio (like/dislike)
func (r *Resolver) VoteEpisode(p graphql.ResolveParams) (interface{}, error) {
	req, ok := p.Context.Value("httpRequest").(*http.Request)
	if !ok {
		return false, errors.New("request context missing")
	}
	userID, err := auth.GetUserIDFromRequest(req)
	if err != nil {
		return false, errors.New("unauthorized: " + err.Error())
	}
	episodeID, _ := p.Args["episodeId"].(string)
	voteType, _ := p.Args["voteType"].(string)
	if voteType != "like" && voteType != "dislike" {
		return false, errors.New("voteType must be 'like' or 'dislike'")
	}
	vote := map[string]interface{}{
		"episode_id": episodeID,
		"user_id":    userID,
		"vote_type":  voteType,
		"updated_at": time.Now(),
	}
	err = r.DB.DB.From("episode_votes").Upsert(vote).Execute(nil)
	if err != nil {
		return false, errors.New("failed to upsert vote: " + err.Error())
	}
	// Atualiza contadores de likes/dislikes
	var counts []map[string]interface{}
	err = r.DB.DB.From("episode_votes").Select("vote_type, count(*) as count").Eq("episode_id", episodeID).Execute(&counts)
	if err == nil {
		likes := 0
		dislikes := 0
		for _, c := range counts {
			switch c["vote_type"] {
			case "like":
				if v, ok := c["count"].(float64); ok {
					likes = int(v)
				}
			case "dislike":
				if v, ok := c["count"].(float64); ok {
					dislikes = int(v)
				}
			}
		}
		_ = r.DB.DB.From("episodes").Update(map[string]interface{}{"likes_count": likes, "dislikes_count": dislikes, "updated_at": time.Now()}).Eq("id", episodeID).Execute(nil)
	}
	// Limpa cache após votar
	r.InvalidateCache()
	return true, nil
}

// Funções auxiliares para criar ponteiros
func intPtr(i int) *int {
	return &i
}

func float64Ptr(f float64) *float64 {
	return &f
}

// Buscar legendas de um episódio
func (r *Resolver) GetEpisodeSubtitles(ctx context.Context, episodeID string) ([]*models.EpisodeSubtitle, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var results []*models.EpisodeSubtitle
	err := r.DB.DB.From("episode_subtitles").
		Select("*").
		Eq("episode_id", episodeID).
		ExecuteWithContext(ctx, &results)

	if err != nil {
		r.logger.Error("Falha ao buscar legendas do episódio", zap.String("episodeID", episodeID), zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	return results, nil
}

// Buscar thumbnails de um episódio
func (r *Resolver) GetEpisodeThumbnail(ctx context.Context, episodeID string) (*models.EpisodeThumbnail, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var results []*models.EpisodeThumbnail
	err := r.DB.DB.From("episode_thumbnails").
		Select("*").
		Eq("episode_id", episodeID).
		ExecuteWithContext(ctx, &results)

	if err != nil {
		r.logger.Error("Falha ao buscar thumbnails do episódio", zap.String("episodeID", episodeID), zap.Error(err))
		return nil, errors.New("erro interno do servidor")
	}

	if len(results) == 0 {
		return nil, nil
	}

	return results[0], nil
}
