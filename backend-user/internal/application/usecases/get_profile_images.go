package usecases

import (
	"backend-user/internal/application/dto"
	"backend-user/internal/domain/repositories"
)

// GetProfileImagesUseCase implementa o caso de uso de obtenção de imagens de perfil
type GetProfileImagesUseCase struct {
	imageRepo repositories.ImageRepository
}

// NewGetProfileImagesUseCase cria uma nova instância do use case
func NewGetProfileImagesUseCase(imageRepo repositories.ImageRepository) *GetProfileImagesUseCase {
	return &GetProfileImagesUseCase{
		imageRepo: imageRepo,
	}
}

// Execute executa o caso de uso de obtenção de imagens de perfil
func (uc *GetProfileImagesUseCase) Execute() ([]*dto.ProfileImageResponse, error) {
	// Buscar imagens de perfil
	images, err := uc.imageRepo.GetProfileImages()
	if err != nil {
		return nil, err
	}

	// Converter para DTO
	var responses []*dto.ProfileImageResponse
	for _, image := range images {
		responses = append(responses, &dto.ProfileImageResponse{
			ID:        image.ID,
			AnimeName: image.AnimeName,
			ImageURL:  image.ImageURL,
		})
	}

	return responses, nil
}
