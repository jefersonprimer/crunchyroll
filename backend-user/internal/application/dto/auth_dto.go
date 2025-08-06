package dto

type RegisterRequest struct {
	Email       string `json:"email" binding:"required,email"`
	Username    string `json:"username" binding:"required,min=3,max=20"`
	DisplayName string `json:"display_name" binding:"required,min=1,max=50"`
	Password    string `json:"password" binding:"required,min=6"`
}

type RegisterResponse struct {
	User  *UserResponse `json:"user"`
	Token string        `json:"token"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type LoginResponse struct {
	User  *UserResponse `json:"user"`
	Token string        `json:"token"`
}

type RequestPasswordResetRequest struct {
	Email string `json:"email" binding:"required,email"`
}

type ResetPasswordRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Code     string `json:"code" binding:"required,len=6"`
	Password string `json:"password" binding:"required,min=6"`
}

type UserResponse struct {
	ID                 string  `json:"id"`
	Email              string  `json:"email"`
	Username           string  `json:"username"`
	DisplayName        string  `json:"display_name"`
	ProfileImageURL    *string `json:"profile_image_url,omitempty"`
	BackgroundImageURL *string `json:"background_image_url,omitempty"`
	CreatedAt          string  `json:"created_at"`
	LastLoginAt        string  `json:"last_login_at,omitempty"`
}
