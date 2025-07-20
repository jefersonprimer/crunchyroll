package models

import (
	"encoding/json"
	"time"
)

type User struct {
	ID                 string    `json:"id"`
	Email              string    `json:"email"`
	Username           string    `json:"username"`
	DisplayName        string    `json:"display_name"`
	PasswordHash       string    `json:"password_hash"`
	ProfileImageURL    *string   `json:"profile_image_url,omitempty"`
	BackgroundImageURL *string   `json:"background_image_url,omitempty"`
	CreatedAt          time.Time `json:"created_at,omitempty"`
	LastLoginAt        time.Time `json:"last_login_at,omitempty"`
}

// UnmarshalJSON implements custom JSON unmarshaling for User
func (u *User) UnmarshalJSON(data []byte) error {
	type Alias User
	aux := &struct {
		CreatedAt   string `json:"created_at"`
		LastLoginAt string `json:"last_login_at"`
		*Alias
	}{
		Alias: (*Alias)(u),
	}
	if err := json.Unmarshal(data, &aux); err != nil {
		return err
	}

	// Parse CreatedAt
	if aux.CreatedAt != "" {
		parsedTime, err := time.Parse("2006-01-02T15:04:05.999999", aux.CreatedAt)
		if err != nil {
			return err
		}
		u.CreatedAt = parsedTime
	}

	// Parse LastLoginAt
	if aux.LastLoginAt != "" && aux.LastLoginAt != "0001-01-01T00:00:00" {
		parsedTime, err := time.Parse("2006-01-02T15:04:05.999999", aux.LastLoginAt)
		if err != nil {
			return err
		}
		u.LastLoginAt = parsedTime
	}

	return nil
}

type ProfileImage struct {
	ID        string `json:"id"`
	AnimeName string `json:"anime_name"`
	ImageURL  string `json:"image_url"`
}

type BackgroundImage struct {
	ID        string `json:"id"`
	AnimeName string `json:"anime_name"`
	ImageURL  string `json:"image_url"`
}
