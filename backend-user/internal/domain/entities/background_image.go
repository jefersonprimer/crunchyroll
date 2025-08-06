package entities

type BackgroundImage struct {
	ID        string `json:"id"`
	AnimeName string `json:"anime_name"`
	ImageURL  string `json:"image_url"`
}

func NewBackgroundImage(id, animeName, imageURL string) *BackgroundImage {
	return &BackgroundImage{
		ID:        id,
		AnimeName: animeName,
		ImageURL:  imageURL,
	}
}
