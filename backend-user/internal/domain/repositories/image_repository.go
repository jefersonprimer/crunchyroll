package repositories

import "backend-user/internal/domain/entities"

type ImageRepository interface {
	GetProfileImages() ([]*entities.ProfileImage, error)
	GetBackgroundImages() ([]*entities.BackgroundImage, error)
}
