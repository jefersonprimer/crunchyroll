package usecases

import (
	"backend-user/internal/application/dto"
	"backend-user/internal/domain/repositories"
)

// GetBackgroundImagesUseCase implementa o caso de uso de obtenção de imagens de fundo
type GetBackgroundImagesUseCase struct {
	imageRepo repositories.ImageRepository
}

// NewGetBackgroundImagesUseCase cria uma nova instância do use case
func NewGetBackgroundImagesUseCase(imageRepo repositories.ImageRepository) *GetBackgroundImagesUseCase {
	return &GetBackgroundImagesUseCase{
		imageRepo: imageRepo,
	}
}

// Execute executa o caso de uso de obtenção de imagens de fundo
func (uc *GetBackgroundImagesUseCase) Execute() ([]*dto.BackgroundImageResponse, error) {
	// Buscar imagens de fundo
	images, err := uc.imageRepo.GetBackgroundImages()
	if err != nil {
		return nil, err
	}

	// Converter para DTO
	var responses []*dto.BackgroundImageResponse
	for _, image := range images {
		responses = append(responses, &dto.BackgroundImageResponse{
			ID:        image.ID,
			AnimeName: image.AnimeName,
			ImageURL:  image.ImageURL,
		})
	}

	return responses, nil
}
