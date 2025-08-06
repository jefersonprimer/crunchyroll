package repositories

import "backend-blog/backend/domain/entities"

type PostRepository interface {
	GetAll() ([]entities.Post, error)
	GetByID(id string) (*entities.Post, error)
	GetBySlug(category, year, month, day, slug string) (*entities.Post, error)
	Create(post *entities.Post) error
	Update(post *entities.Post) error
	Delete(id string) error
}
