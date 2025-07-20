package models

import (
	"backend-crunchyroll/enums"
	"errors"
	"time"
)

type Episode struct {
	ID            string     `json:"id" graphql:"id"`
	PublicCode    string     `json:"public_code" graphql:"publicCode"`
	AnimeID       string     `json:"anime_id" graphql:"animeId"`
	SeasonID      string     `json:"season_id" graphql:"seasonId"`
	Season        int        `json:"season" graphql:"season"`
	Title         string     `json:"title" graphql:"title"`
	Slug          string     `json:"slug" graphql:"slug"`
	EpisodeNumber int        `json:"episode_number" graphql:"episodeNumber"`
	Duration      *string    `json:"duration,omitempty" graphql:"duration"`
	Synopsis      *string    `json:"synopsis,omitempty" graphql:"synopsis"`
	Image         *string    `json:"image,omitempty" graphql:"image"`
	ReleaseDate   *time.Time `json:"release_date,omitempty" graphql:"releaseDate"`
	IsPremiere    bool       `json:"is_premiere" graphql:"isPremiere"`
	CreatedAt     time.Time  `json:"created_at" graphql:"createdAt"`
	UpdatedAt     time.Time  `json:"updated_at" graphql:"updatedAt"`

	// Relacionamentos que podem ser carregados posteriormente
	Versions []EpisodeVersion `json:"versions,omitempty" graphql:"versions"`

	LikesCount    int `json:"likes_count" graphql:"likes_count"`
	DislikesCount int `json:"dislikes_count" graphql:"dislikes_count"`
}

type EpisodeVersion struct {
	ID           string                    `json:"id" graphql:"id"`
	EpisodeID    string                    `json:"episode_id" graphql:"episodeId"`
	LanguageType enums.EpisodeLanguageType `json:"language_type" graphql:"languageType"`
	VideoURL     string                    `json:"video_url" graphql:"videoUrl"`
	CreatedAt    time.Time                 `json:"created_at" graphql:"createdAt"`
	UpdatedAt    time.Time                 `json:"updated_at" graphql:"updatedAt"`
}

// Validação básica
func (e *Episode) Validate() error {
	if e.PublicCode == "" || e.AnimeID == "" || e.SeasonID == "" || e.Title == "" || e.Slug == "" {
		return errors.New("public_code, anime_id, season_id, title e slug são obrigatórios")
	}
	return nil
}

// Validação para EpisodeVersion
func (ev *EpisodeVersion) Validate() error {
	if ev.EpisodeID == "" || ev.VideoURL == "" || !ev.LanguageType.IsValid() {
		return errors.New("episode_id, video_url e language_type válido são obrigatórios")
	}
	return nil
}

// Representa um voto em um episódio (like/dislike)
type EpisodeVote struct {
	ID        string    `json:"id"`
	EpisodeID string    `json:"episode_id"`
	UserID    string    `json:"user_id"`
	VoteType  string    `json:"vote_type"` // "like" ou "dislike"
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// EpisodeSubtitle representa uma legenda de episódio
type EpisodeSubtitle struct {
	EpisodeID   string `json:"episode_id"`
	Language    string `json:"language"`
	SubtitleURL string `json:"subtitle_url"`
}

// EpisodeThumbnail representa as thumbnails de um episódio
type EpisodeThumbnail struct {
	EpisodeID        string  `json:"episode_id"`
	PreviewSpriteURL *string `json:"preview_sprite_url,omitempty"`
	MainThumbnailURL *string `json:"main_thumbnail_url,omitempty"`
}
