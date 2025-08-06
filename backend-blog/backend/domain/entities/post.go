package entities

import (
	"errors"
	"strings"
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
	ReadTime   int       `json:"read_time"`
}

type Author struct {
	Name  string `json:"name"`
	Image string `json:"image"`
	Role  string `json:"role"`
}

// IsValid valida se o post está com dados válidos
func (p *Post) IsValid() error {
	if strings.TrimSpace(p.Title) == "" {
		return errors.New("title is required")
	}
	if strings.TrimSpace(p.Content) == "" {
		return errors.New("content is required")
	}
	if strings.TrimSpace(p.Category) == "" {
		return errors.New("category is required")
	}
	return nil
}

// CalculateReadTime calcula o tempo de leitura baseado no conteúdo
func (p *Post) CalculateReadTime() int {
	words := strings.Fields(p.Content)
	// Média de 200 palavras por minuto
	readTime := len(words) / 200
	if readTime < 1 {
		readTime = 1
	}
	return readTime
}
