package dto

type UpdateProfileRequest struct {
	DisplayName        string  `json:"display_name" binding:"required,min=1,max=50"`
	ProfileImageURL    *string `json:"profile_image_url,omitempty"`
	BackgroundImageURL *string `json:"background_image_url,omitempty"`
}

type ProfileImageResponse struct {
	ID        string `json:"id"`
	AnimeName string `json:"anime_name"`
	ImageURL  string `json:"image_url"`
}

type BackgroundImageResponse struct {
	ID        string `json:"id"`
	AnimeName string `json:"anime_name"`
	ImageURL  string `json:"image_url"`
}
