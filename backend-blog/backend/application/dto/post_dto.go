package dto

import "time"

type CreatePostRequest struct {
	Title      string   `json:"title" validate:"required"`
	Summary    string   `json:"summary"`
	Content    string   `json:"content" validate:"required"`
	CoverImage string   `json:"cover_image"`
	Tags       []string `json:"tags"`
	Category   string   `json:"category" validate:"required"`
	Author     Author   `json:"author"`
}

type UpdatePostRequest struct {
	Title      string   `json:"title"`
	Summary    string   `json:"summary"`
	Content    string   `json:"content"`
	CoverImage string   `json:"cover_image"`
	Tags       []string `json:"tags"`
	Category   string   `json:"category"`
	Author     Author   `json:"author"`
}

type PostResponse struct {
	ID         string    `json:"id"`
	Title      string    `json:"title"`
	Summary    string    `json:"summary"`
	Content    string    `json:"content"`
	CoverImage string    `json:"cover_image"`
	Tags       []string  `json:"tags"`
	Category   string    `json:"category"`
	Slug       string    `json:"slug"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
	Author     Author    `json:"author"`
	ReadTime   int       `json:"read_time"`
}

type Author struct {
	Name  string `json:"name"`
	Image string `json:"image"`
	Role  string `json:"role"`
}
