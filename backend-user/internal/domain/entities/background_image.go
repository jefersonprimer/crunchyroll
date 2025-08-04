package entities

// BackgroundImage representa uma imagem de fundo disponível
type BackgroundImage struct {
	ID        string `json:"id"`
	AnimeName string `json:"anime_name"`
	ImageURL  string `json:"image_url"`
}

// NewBackgroundImage cria uma nova instância de BackgroundImage
func NewBackgroundImage(id, animeName, imageURL string) *BackgroundImage {
	return &BackgroundImage{
		ID:        id,
		AnimeName: animeName,
		ImageURL:  imageURL,
	}
}
