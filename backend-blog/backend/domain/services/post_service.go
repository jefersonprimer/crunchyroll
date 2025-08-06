package services

import "backend-blog/backend/domain/entities"

type PostService interface {
	ValidatePost(post *entities.Post) error
	CalculateReadTime(content string) int
	GenerateSlug(title string) string
}
