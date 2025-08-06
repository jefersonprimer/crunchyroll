package entities

type ProfileImage struct {
	ID        string `json:"id"`
	AnimeName string `json:"anime_name"`
	ImageURL  string `json:"image_url"`
}

func NewProfileImage(id, animeName, imageURL string) *ProfileImage {
	return &ProfileImage{
		ID:        id,
		AnimeName: animeName,
		ImageURL:  imageURL,
	}
}
