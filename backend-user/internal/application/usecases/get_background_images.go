package usecases

import (
	"backend-user/internal/application/dto"
	"backend-user/internal/domain/repositories"
)

type GetBackgroundImagesUseCase struct {
	imageRepo repositories.ImageRepository
}

func NewGetBackgroundImagesUseCase(imageRepo repositories.ImageRepository) *GetBackgroundImagesUseCase {
	return &GetBackgroundImagesUseCase{
		imageRepo: imageRepo,
	}
}

func (uc *GetBackgroundImagesUseCase) Execute() ([]*dto.BackgroundImageResponse, error) {

	images, err := uc.imageRepo.GetBackgroundImages()
	if err != nil {
		return nil, err
	}

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
