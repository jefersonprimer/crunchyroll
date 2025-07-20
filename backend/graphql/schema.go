package graphql

import (
	"backend-crunchyroll/models"
	"fmt"
	"time"

	"github.com/graphql-go/graphql"
	"github.com/nedpals/supabase-go"
)

func NewSchema(db *supabase.Client) (graphql.Schema, error) {
	// Use o construtor apropriado para o resolver com cache
	resolver := NewResolver(db)

	// Definição de EpisodeVersion
	episodeVersionType := graphql.NewObject(graphql.ObjectConfig{
		Name: "EpisodeVersion",
		Fields: graphql.Fields{
			"id":           &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"episodeId":    &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"languageType": &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"videoUrl":     &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"createdAt": &graphql.Field{Type: graphql.NewNonNull(graphql.String), Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if version, ok := p.Source.(models.EpisodeVersion); ok {
					return version.CreatedAt.Format(time.RFC3339), nil
				}
				return "", nil
			}},
			"updatedAt": &graphql.Field{Type: graphql.NewNonNull(graphql.String), Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if version, ok := p.Source.(models.EpisodeVersion); ok {
					return version.UpdatedAt.Format(time.RFC3339), nil
				}
				return "", nil
			}},
		},
	})

	// Definição de EpisodeSubtitle
	// Adiciona antes da definição de episodeType
	episodeSubtitleType := graphql.NewObject(graphql.ObjectConfig{
		Name: "EpisodeSubtitle",
		Fields: graphql.Fields{
			"episodeId":   &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"language":    &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"subtitleUrl": &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
		},
	})

	// Definição de EpisodeThumbnail
	episodeThumbnailType := graphql.NewObject(graphql.ObjectConfig{
		Name: "EpisodeThumbnail",
		Fields: graphql.Fields{
			"episodeId":        &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"previewSpriteUrl": &graphql.Field{Type: graphql.String},
			"mainThumbnailUrl": &graphql.Field{Type: graphql.String},
		},
	})

	// Definição de Episode
	episodeType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Episode",
		Fields: graphql.Fields{
			"id":         &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"publicCode": &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"animeId":    &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"seasonId":   &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"season":     &graphql.Field{Type: graphql.NewNonNull(graphql.Int)},
			"title":      &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"slug":       &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"duration":   &graphql.Field{Type: graphql.String},
			"synopsis":   &graphql.Field{Type: graphql.String},
			"image":      &graphql.Field{Type: graphql.String},
			"videoUrl": &graphql.Field{Type: graphql.String, Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if episode, ok := p.Source.(*models.Episode); ok && len(episode.Versions) > 0 {
					// Return the first version's video URL
					return episode.Versions[0].VideoURL, nil
				}
				return nil, nil
			}},
			"versions": &graphql.Field{Type: graphql.NewList(graphql.NewNonNull(episodeVersionType))},
			"releaseDate": &graphql.Field{Type: graphql.String, Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if episode, ok := p.Source.(*models.Episode); ok && episode.ReleaseDate != nil {
					return episode.ReleaseDate.Format(time.RFC3339), nil
				}
				return nil, nil
			}},
			"isLancamento": &graphql.Field{Type: graphql.NewNonNull(graphql.Boolean)},
			"createdAt": &graphql.Field{Type: graphql.NewNonNull(graphql.String), Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if episode, ok := p.Source.(*models.Episode); ok {
					return episode.CreatedAt.Format(time.RFC3339), nil
				}
				return "", nil
			}},
			"updatedAt": &graphql.Field{Type: graphql.NewNonNull(graphql.String), Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if episode, ok := p.Source.(*models.Episode); ok {
					return episode.UpdatedAt.Format(time.RFC3339), nil
				}
				return "", nil
			}},
			"likes_count": &graphql.Field{
				Type: graphql.NewNonNull(graphql.Int),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					if episode, ok := p.Source.(*models.Episode); ok {
						return episode.LikesCount, nil
					}
					return 0, nil
				},
			},
			"dislikes_count": &graphql.Field{
				Type: graphql.NewNonNull(graphql.Int),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					if episode, ok := p.Source.(*models.Episode); ok {
						return episode.DislikesCount, nil
					}
					return 0, nil
				},
			},
			"subtitles": &graphql.Field{
				Type: graphql.NewList(graphql.NewNonNull(episodeSubtitleType)),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					if episode, ok := p.Source.(*models.Episode); ok {
						return resolver.GetEpisodeSubtitles(p.Context, episode.ID)
					}
					return nil, nil
				},
			},
			"thumbnail": &graphql.Field{
				Type: episodeThumbnailType,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					if episode, ok := p.Source.(*models.Episode); ok {
						return resolver.GetEpisodeThumbnail(p.Context, episode.ID)
					}
					return nil, nil
				},
			},
		},
	})

	// Definição de Genre
	genreType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Genre",
		Fields: graphql.Fields{
			"id":        &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"name":      &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"createdAt": &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"updatedAt": &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
		},
	})

	// Definição de AnimeSeason
	seasonType := graphql.NewObject(graphql.ObjectConfig{
		Name: "AnimeSeason",
		Fields: graphql.Fields{
			"id":               &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"animeId":          &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"seasonNumber":     &graphql.Field{Type: graphql.NewNonNull(graphql.Int)},
			"seasonName":       &graphql.Field{Type: graphql.String},
			"totalEpisodes":    &graphql.Field{Type: graphql.Int},
			"firstEpisodeDate": &graphql.Field{Type: graphql.String},
			"lastEpisodeDate":  &graphql.Field{Type: graphql.String},
			"season": &graphql.Field{
				Type: graphql.String,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					if season, ok := p.Source.(*models.AnimeSeason); ok && season.Season != nil {
						return string(*season.Season), nil
					}
					return nil, nil
				},
			},
			"createdAt": &graphql.Field{Type: graphql.NewNonNull(graphql.String), Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if season, ok := p.Source.(*models.AnimeSeason); ok {
					return season.CreatedAt.Format(time.RFC3339), nil
				}
				return "", nil
			}},
			"updatedAt": &graphql.Field{Type: graphql.NewNonNull(graphql.String), Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if season, ok := p.Source.(*models.AnimeSeason); ok {
					return season.UpdatedAt.Format(time.RFC3339), nil
				}
				return "", nil
			}},
		},
	})

	// Definição de ContentSource
	contentType := graphql.NewObject(graphql.ObjectConfig{
		Name: "ContentSource",
		Fields: graphql.Fields{
			"id":         &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"animeId":    &graphql.Field{Type: graphql.String},
			"movieId":    &graphql.Field{Type: graphql.String},
			"sourceType": &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"title":      &graphql.Field{Type: graphql.String},
			"authors":    &graphql.Field{Type: graphql.String},
			"copyright":  &graphql.Field{Type: graphql.String},
			"createdAt": &graphql.Field{Type: graphql.NewNonNull(graphql.String), Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if contentSource, ok := p.Source.(*models.ContentSource); ok {
					return contentSource.CreatedAt.Format(time.RFC3339), nil
				}
				return "", nil
			}},
			"updatedAt": &graphql.Field{Type: graphql.NewNonNull(graphql.String), Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if contentSource, ok := p.Source.(*models.ContentSource); ok {
					return contentSource.UpdatedAt.Format(time.RFC3339), nil
				}
				return "", nil
			}},
		},
	})

	// Definição de Anime
	animeType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Anime",
		Fields: graphql.Fields{
			"id":          &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"slug":        &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"name":        &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"releaseYear": &graphql.Field{Type: graphql.Int},
			"releaseDate": &graphql.Field{Type: graphql.String, Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if anime, ok := p.Source.(*models.Anime); ok && anime.ReleaseDate != nil {
					return anime.ReleaseDate.Format(time.RFC3339), nil
				}
				return nil, nil
			}},
			"imageBannerMobile":  &graphql.Field{Type: graphql.String},
			"imageCardCompact":   &graphql.Field{Type: graphql.String},
			"imagePoster":        &graphql.Field{Type: graphql.String},
			"imageBannerDesktop": &graphql.Field{Type: graphql.String},
			"synopsis":           &graphql.Field{Type: graphql.String},
			"rating":             &graphql.Field{Type: graphql.Int},
			"score":              &graphql.Field{Type: graphql.Float},
			"airingDay": &graphql.Field{
				Type: graphql.String,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					if anime, ok := p.Source.(*models.Anime); ok && anime.AiringDay != nil {
						return string(*anime.AiringDay), nil
					}
					return nil, nil
				},
			},
			"totalEpisodes": &graphql.Field{Type: graphql.Int},
			"audioType": &graphql.Field{
				Type: graphql.String,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					if anime, ok := p.Source.(*models.Anime); ok && anime.AudioType != nil {
						return string(*anime.AudioType), nil
					}
					return nil, nil
				},
			},
			"imageLogo":       &graphql.Field{Type: graphql.String},
			"imageThumbnail":  &graphql.Field{Type: graphql.String},
			"contentAdvisory": &graphql.Field{Type: graphql.String},
			"publicCode":      &graphql.Field{Type: graphql.String},
			"genres": &graphql.Field{
				Type: graphql.NewList(graphql.NewNonNull(genreType)),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					anime, ok := p.Source.(*models.Anime)
					if !ok {
						return nil, nil
					}
					return resolver.GetGenresByAnimeId(p.Context, struct{ AnimeID string }{AnimeID: anime.ID})
				},
			},
			"audioLanguages": &graphql.Field{
				Type: graphql.NewList(graphql.NewNonNull(graphql.String)),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					anime, ok := p.Source.(*models.Anime)
					if !ok {
						return nil, nil
					}
					return resolver.GetAudioLanguagesByAnimeId(p.Context, struct{ AnimeID string }{AnimeID: anime.ID})
				},
			},
			"subtitles": &graphql.Field{
				Type: graphql.NewList(graphql.NewNonNull(graphql.String)),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					anime, ok := p.Source.(*models.Anime)
					if !ok {
						return nil, nil
					}
					return resolver.GetSubtitlesByAnimeId(p.Context, struct{ AnimeID string }{AnimeID: anime.ID})
				},
			},
			"seasons": &graphql.Field{
				Type: graphql.NewList(graphql.NewNonNull(seasonType)),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					anime, ok := p.Source.(*models.Anime)
					if !ok {
						return nil, nil
					}
					return resolver.GetSeasonsByAnimeId(p.Context, struct{ AnimeID string }{AnimeID: anime.ID})
				},
			},
			"contentSources": &graphql.Field{
				Type: graphql.NewList(graphql.NewNonNull(contentType)),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					anime, ok := p.Source.(*models.Anime)
					if !ok {
						return nil, nil
					}
					return resolver.GetContentSourcesByAnimeId(p.Context, struct{ AnimeID string }{AnimeID: anime.ID})
				},
			},
			"isReleasing":     &graphql.Field{Type: graphql.NewNonNull(graphql.Boolean)},
			"isSeasonPopular": &graphql.Field{Type: graphql.NewNonNull(graphql.Boolean)},
			"isNewRelease":    &graphql.Field{Type: graphql.NewNonNull(graphql.Boolean)},
			"isPopular":       &graphql.Field{Type: graphql.NewNonNull(graphql.Boolean)},
			"hasNextSeason":   &graphql.Field{Type: graphql.NewNonNull(graphql.Boolean)},
			"hasThumbnail":    &graphql.Field{Type: graphql.NewNonNull(graphql.Boolean)},
			"createdAt": &graphql.Field{Type: graphql.NewNonNull(graphql.String), Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if anime, ok := p.Source.(*models.Anime); ok {
					return anime.CreatedAt.Format(time.RFC3339), nil
				}
				return "", nil
			}},
			"updatedAt": &graphql.Field{Type: graphql.NewNonNull(graphql.String), Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if anime, ok := p.Source.(*models.Anime); ok {
					return anime.UpdatedAt.Format(time.RFC3339), nil
				}
				return "", nil
			}},
			"episodes": &graphql.Field{
				Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(episodeType))),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					anime := p.Source.(*models.Anime)
					return resolver.GetEpisodesByAnime(p.Context, struct{ AnimeID string }{AnimeID: anime.ID})
				},
			},
		},
	})

	// Definição de AnimeVote
	animeVoteType := graphql.NewObject(graphql.ObjectConfig{
		Name: "AnimeVote",
		Fields: graphql.Fields{
			"id":         &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"anime_id":   &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"user_id":    &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"score":      &graphql.Field{Type: graphql.NewNonNull(graphql.Int)},
			"created_at": &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"updated_at": &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
		},
	})

	// Definição de EpisodeVote
	episodeVoteType := graphql.NewObject(graphql.ObjectConfig{
		Name: "EpisodeVote",
		Fields: graphql.Fields{
			"id":         &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"episode_id": &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"user_id":    &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"vote_type":  &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"created_at": &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"updated_at": &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
		},
	})

	// Tipo para estatísticas de cache
	statsType := graphql.NewObject(graphql.ObjectConfig{
		Name: "CacheStats",
		Fields: graphql.Fields{
			"hits":    &graphql.Field{Type: graphql.Int},
			"misses":  &graphql.Field{Type: graphql.Int},
			"queries": &graphql.Field{Type: graphql.Int},
		},
	})

	// Query root
	rootQuery := graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"animes": &graphql.Field{
				Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(animeType))),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					var animes []*models.Anime
					err := resolver.DB.DB.From("animes").Select("*").Execute(&animes)
					if err != nil {
						return nil, err
					}
					// Cache de cada anime
					for _, anime := range animes {
						resolver.cacheAnime(anime)
					}
					resolver.metrics.dbQueries++
					return animes, nil
				},
			},
			"animeBySlug": &graphql.Field{
				Type: animeType,
				Args: graphql.FieldConfigArgument{
					"slug": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					slug := p.Args["slug"].(string)
					return resolver.GetAnimeBySlug(p.Context, struct{ Slug string }{Slug: slug})
				},
			},
			"episodesByAnime": &graphql.Field{
				Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(episodeType))),
				Args: graphql.FieldConfigArgument{
					"animeId": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.ID)},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					animeID := p.Args["animeId"].(string)
					return resolver.GetEpisodesByAnime(p.Context, struct{ AnimeID string }{AnimeID: animeID})
				},
			},
			"latestReleases": &graphql.Field{
				Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(animeType))),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return resolver.GetLatestReleases(p.Context)
				},
			},
			"popularAnimes": &graphql.Field{
				Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(animeType))),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return resolver.GetPopularAnimes(p.Context)
				},
			},
			"releasingAnimes": &graphql.Field{
				Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(animeType))),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return resolver.GetReleasingAnimes(p.Context)
				},
			},
			"seasonPopularAnimes": &graphql.Field{
				Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(animeType))),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return resolver.GetSeasonPopularAnimes(p.Context)
				},
			},
			"nextSeasonAnimes": &graphql.Field{
				Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(animeType))),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return resolver.GetNextSeasonAnimes(p.Context)
				},
			},
			"hasThumbnail": &graphql.Field{
				Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(animeType))),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return resolver.GetHasThumbnail(p.Context)
				},
			},
			"movie": &graphql.Field{
				Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(animeType))),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return resolver.GetMovie(p.Context)
				},
			},
			"dubbedAnimes": &graphql.Field{
				Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(animeType))),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return resolver.GetDubbedAnimes(p.Context)
				},
			},
			"cacheStats": &graphql.Field{
				Type: statsType,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return resolver.GetCacheStats(), nil
				},
			},
			"animeOfTheDay": &graphql.Field{
				Type: animeType,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return resolver.GetAnimeOfTheDay(p.Context)
				}},
			"episodeByPublicCode": &graphql.Field{
				Type: episodeType,
				Args: graphql.FieldConfigArgument{
					"publicCode": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					publicCode := p.Args["publicCode"].(string)
					return resolver.GetEpisodeByPublicCode(p.Context, struct{ PublicCode string }{PublicCode: publicCode})
				},
			},
			"userAnimeVote": &graphql.Field{
				Type: animeVoteType,
				Args: graphql.FieldConfigArgument{
					"animeId": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.ID)},
					"userId":  &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.ID)},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					animeId, _ := p.Args["animeId"].(string)
					userId, _ := p.Args["userId"].(string)
					if animeId == "" || userId == "" {
						return nil, nil
					}
					var votes []map[string]interface{}
					err := resolver.DB.DB.From("anime_votes").
						Select("*").
						Eq("anime_id", animeId).
						Eq("user_id", userId).
						Execute(&votes)
					fmt.Printf("votes: %+v, err: %v\n", votes, err)
					if err != nil || len(votes) == 0 {
						return nil, nil
					}
					return votes[0], nil
				},
			},
			"userEpisodeVote": &graphql.Field{
				Type: episodeVoteType,
				Args: graphql.FieldConfigArgument{
					"episodeId": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.ID)},
					"userId":    &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.ID)},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					episodeId, _ := p.Args["episodeId"].(string)
					userId, _ := p.Args["userId"].(string)
					if episodeId == "" || userId == "" {
						return nil, nil
					}
					var votes []map[string]interface{}
					err := resolver.DB.DB.From("episode_votes").
						Select("*").
						Eq("episode_id", episodeId).
						Eq("user_id", userId).
						Execute(&votes)
					if err != nil || len(votes) == 0 {
						return nil, nil
					}
					return votes[0], nil
				},
			},
		},
	})

	// Mutation root
	rootMutation := graphql.NewObject(graphql.ObjectConfig{
		Name: "Mutation",
		Fields: graphql.Fields{
			"invalidateCache": &graphql.Field{
				Type: graphql.Boolean,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					resolver.InvalidateCache()
					return true, nil
				},
			},
			"voteAnime": &graphql.Field{
				Type: graphql.NewNonNull(graphql.Boolean),
				Args: graphql.FieldConfigArgument{
					"animeId": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.ID)},
					"score":   &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.Int)},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return resolver.VoteAnime(p)
				},
			},
			"voteEpisode": &graphql.Field{
				Type: graphql.NewNonNull(graphql.Boolean),
				Args: graphql.FieldConfigArgument{
					"episodeId": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.ID)},
					"voteType":  &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return resolver.VoteEpisode(p)
				},
			},
		},
	})

	return graphql.NewSchema(graphql.SchemaConfig{
		Query:    rootQuery,
		Mutation: rootMutation,
	})
}
