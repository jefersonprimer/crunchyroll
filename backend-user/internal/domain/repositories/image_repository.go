package repositories

import "backend-user/internal/domain/entities"

// ImageRepository define as operações que podem ser realizadas com imagens
type ImageRepository interface {
	// GetProfileImages retorna todas as imagens de perfil disponíveis
	GetProfileImages() ([]*entities.ProfileImage, error)

	// GetBackgroundImages retorna todas as imagens de fundo disponíveis
	GetBackgroundImages() ([]*entities.BackgroundImage, error)
}
