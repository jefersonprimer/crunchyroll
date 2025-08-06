package usecases

import (
	"backend-user/internal/application/dto"
	"backend-user/internal/domain/repositories"
)

type GetProfileImagesUseCase struct {
	imageRepo repositories.ImageRepository
}

func NewGetProfileImagesUseCase(imageRepo repositories.ImageRepository) *GetProfileImagesUseCase {
	return &GetProfileImagesUseCase{
		imageRepo: imageRepo,
	}
}

func (uc *GetProfileImagesUseCase) Execute() ([]*dto.ProfileImageResponse, error) {

	images, err := uc.imageRepo.GetProfileImages()
	if err != nil {
		return nil, err
	}

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
