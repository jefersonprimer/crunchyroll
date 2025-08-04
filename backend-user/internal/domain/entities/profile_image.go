package entities

// ProfileImage representa uma imagem de perfil disponível
type ProfileImage struct {
	ID        string `json:"id"`
	AnimeName string `json:"anime_name"`
	ImageURL  string `json:"image_url"`
}

// NewProfileImage cria uma nova instância de ProfileImage
func NewProfileImage(id, animeName, imageURL string) *ProfileImage {
	return &ProfileImage{
		ID:        id,
		AnimeName: animeName,
		ImageURL:  imageURL,
	}
}
