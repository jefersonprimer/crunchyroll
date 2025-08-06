package repositories

import (
	"encoding/json"

	"backend-user/internal/domain/entities"
	"backend-user/internal/infra/supabase"
)

type ImageRepository struct {
	client *supabase.Client
}

func NewImageRepository(client *supabase.Client) *ImageRepository {
	return &ImageRepository{
		client: client,
	}
}

func (r *ImageRepository) GetProfileImages() ([]*entities.ProfileImage, error) {
	var images []*entities.ProfileImage

	data, _, err := r.client.From("profile_images").Select("*", "", false).Execute()
	if err != nil {
		return nil, err
	}

	if err := json.Unmarshal(data, &images); err != nil {
		return nil, err
	}

	return images, nil
}

func (r *ImageRepository) GetBackgroundImages() ([]*entities.BackgroundImage, error) {
	var images []*entities.BackgroundImage

	data, _, err := r.client.From("background_images").Select("*", "", false).Execute()
	if err != nil {
		return nil, err
	}

	if err := json.Unmarshal(data, &images); err != nil {
		return nil, err
	}

	return images, nil
}
