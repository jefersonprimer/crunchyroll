package repositories

import (
	"encoding/json"

	"backend-user/internal/domain/entities"
	"backend-user/internal/infra/supabase"
)

// ImageRepository implementa a interface do repositório de imagens
type ImageRepository struct {
	client *supabase.Client
}

// NewImageRepository cria uma nova instância do repositório
func NewImageRepository(client *supabase.Client) *ImageRepository {
	return &ImageRepository{
		client: client,
	}
}

// GetProfileImages retorna todas as imagens de perfil disponíveis
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

// GetBackgroundImages retorna todas as imagens de fundo disponíveis
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
