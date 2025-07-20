package models

import (
	"time"
)

type Post struct {
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
	ReadTime   int       `json:"read_time"` // in minutes
}

type Author struct {
	Name  string `json:"name"`
	Image string `json:"image"`
	Role  string `json:"role"`
}
