package supabase

import (
	"context"
	"fmt"
	"time"

	"github.com/nedpals/supabase-go"
)

// Anime representa um anime no banco de dados
type Anime struct {
	ID              int       `json:"id"`
	Title           string    `json:"title"`
	Description     string    `json:"description"`
	ThumbnailURL    string    `json:"thumbnail_url"`
	HasThumbnail    bool      `json:"has_thumbnail"`
	AiringDay       string    `json:"airing_day"`
	IsReleasing     bool      `json:"is_releasing"`
	IsPopular       bool      `json:"is_popular"`
	HasNextSeason   bool      `json:"has_next_season"`
	IsSeasonPopular bool      `json:"is_season_popular"`
	AudioType       string    `json:"audio_type"`
	IsMovie         bool      `json:"is_movie"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

// GetAnimesWithThumbnails busca animes com thumbnails
func GetAnimesWithThumbnails(ctx context.Context, client *supabase.Client) ([]Anime, error) {
	cacheKey := GenerateCacheKey("animes_with_thumbnails", nil)

	return QueryWithCache(ctx, func() ([]Anime, error) {
		var result []Anime
		err := client.DB.From("animes").
			Select("*").
			Eq("has_thumbnail", "true").
			ExecuteWithContext(ctx, &result)
		return result, err
	}, cacheKey, DefaultCacheConfig)
}

// GetAnimesByAiringDay busca animes por dia de exibição
func GetAnimesByAiringDay(ctx context.Context, client *supabase.Client, day string) ([]Anime, error) {
	cacheKey := GenerateCacheKey("animes_by_day", map[string]interface{}{"day": day})

	return QueryWithCache(ctx, func() ([]Anime, error) {
		var result []Anime
		err := client.DB.From("animes").
			Select("*").
			Eq("airing_day", day).
			ExecuteWithContext(ctx, &result)
		return result, err
	}, cacheKey, DefaultCacheConfig)
}

// GetReleasingAnimes busca animes em lançamento
func GetReleasingAnimes(ctx context.Context, client *supabase.Client) ([]Anime, error) {
	cacheKey := GenerateCacheKey("releasing_animes", nil)

	return QueryWithCache(ctx, func() ([]Anime, error) {
		var result []Anime
		err := client.DB.From("animes").
			Select("*").
			Eq("is_releasing", "true").
			ExecuteWithContext(ctx, &result)
		return result, err
	}, cacheKey, DefaultCacheConfig)
}

// GetPopularAnimes busca animes populares
func GetPopularAnimes(ctx context.Context, client *supabase.Client) ([]Anime, error) {
	cacheKey := GenerateCacheKey("popular_animes", nil)

	return QueryWithCache(ctx, func() ([]Anime, error) {
		var result []Anime
		err := client.DB.From("animes").
			Select("*").
			Eq("is_popular", "true").
			ExecuteWithContext(ctx, &result)
		return result, err
	}, cacheKey, DefaultCacheConfig)
}

// GetNextSeasonAnimes busca animes com próxima temporada
func GetNextSeasonAnimes(ctx context.Context, client *supabase.Client) ([]Anime, error) {
	cacheKey := GenerateCacheKey("next_season_animes", nil)

	return QueryWithCache(ctx, func() ([]Anime, error) {
		var result []Anime
		err := client.DB.From("animes").
			Select("*").
			Eq("has_next_season", "true").
			ExecuteWithContext(ctx, &result)
		return result, err
	}, cacheKey, DefaultCacheConfig)
}

// GetSeasonPopularAnimes busca animes populares da temporada
func GetSeasonPopularAnimes(ctx context.Context, client *supabase.Client) ([]Anime, error) {
	cacheKey := GenerateCacheKey("season_popular_animes", nil)

	return QueryWithCache(ctx, func() ([]Anime, error) {
		var result []Anime
		err := client.DB.From("animes").
			Select("*").
			Eq("is_season_popular", "true").
			ExecuteWithContext(ctx, &result)
		return result, err
	}, cacheKey, DefaultCacheConfig)
}

// GetDubbedAnimes busca animes dublados
func GetDubbedAnimes(ctx context.Context, client *supabase.Client) ([]Anime, error) {
	cacheKey := GenerateCacheKey("dubbed_animes", nil)

	return QueryWithCache(ctx, func() ([]Anime, error) {
		var result []Anime
		err := client.DB.From("animes").
			Select("*").
			In("audio_type", []string{"Dubbed"}).
			ExecuteWithContext(ctx, &result)
		return result, err
	}, cacheKey, DefaultCacheConfig)
}

// GetMovies busca filmes
func GetMovies(ctx context.Context, client *supabase.Client) ([]Anime, error) {
	cacheKey := GenerateCacheKey("movies", nil)

	return QueryWithCache(ctx, func() ([]Anime, error) {
		var result []Anime
		err := client.DB.From("animes").
			Select("*").
			Eq("is_movie", "true").
			ExecuteWithContext(ctx, &result)
		return result, err
	}, cacheKey, DefaultCacheConfig)
}

// GetAnimeByID busca um anime específico por ID
func GetAnimeByID(ctx context.Context, client *supabase.Client, id int) (*Anime, error) {
	cacheKey := GenerateCacheKey("anime_by_id", map[string]interface{}{"id": id})

	result, err := QueryWithCache(ctx, func() ([]Anime, error) {
		var result []Anime
		err := client.DB.From("animes").
			Select("*").
			Eq("id", fmt.Sprintf("%d", id)).
			ExecuteWithContext(ctx, &result)
		return result, err
	}, cacheKey, DefaultCacheConfig)

	if err != nil {
		return nil, err
	}

	if len(result) == 0 {
		return nil, fmt.Errorf("anime não encontrado")
	}

	return &result[0], nil
}
