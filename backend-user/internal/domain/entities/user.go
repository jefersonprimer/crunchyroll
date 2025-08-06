package entities

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

func NewUser(email, username, displayName, passwordHash string) *User {
	return &User{
		Email:        email,
		Username:     username,
		DisplayName:  displayName,
		PasswordHash: passwordHash,
		CreatedAt:    time.Now(),
	}
}

func (u *User) UpdateLastLogin() {
	u.LastLoginAt = time.Now()
}

func (u *User) UpdateProfileImage(imageURL string) {
	u.ProfileImageURL = &imageURL
}

func (u *User) UpdateBackgroundImage(imageURL string) {
	u.BackgroundImageURL = &imageURL
}

func (u *User) UpdateDisplayName(displayName string) {
	u.DisplayName = displayName
}

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

	if aux.CreatedAt != "" {
		parsedTime, err := time.Parse("2006-01-02T15:04:05.999999", aux.CreatedAt)
		if err != nil {
			return err
		}
		u.CreatedAt = parsedTime
	}

	if aux.LastLoginAt != "" && aux.LastLoginAt != "0001-01-01T00:00:00" {
		parsedTime, err := time.Parse("2006-01-02T15:04:05.999999", aux.LastLoginAt)
		if err != nil {
			return err
		}
		u.LastLoginAt = parsedTime
	}

	return nil
}
