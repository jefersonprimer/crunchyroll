package dto

// RegisterRequest representa a requisição de registro
type RegisterRequest struct {
	Email       string `json:"email" binding:"required,email"`
	Username    string `json:"username" binding:"required,min=3,max=20"`
	DisplayName string `json:"display_name" binding:"required,min=1,max=50"`
	Password    string `json:"password" binding:"required,min=6"`
}

// RegisterResponse representa a resposta do registro
type RegisterResponse struct {
	User  *UserResponse `json:"user"`
	Token string        `json:"token"`
}

// LoginRequest representa a requisição de login
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// LoginResponse representa a resposta do login
type LoginResponse struct {
	User  *UserResponse `json:"user"`
	Token string        `json:"token"`
}

// RequestPasswordResetRequest representa a requisição de reset de senha
type RequestPasswordResetRequest struct {
	Email string `json:"email" binding:"required,email"`
}

// ResetPasswordRequest representa a requisição de reset de senha com token
type ResetPasswordRequest struct {
	Token    string `json:"token" binding:"required"`
	Password string `json:"password" binding:"required,min=6"`
}

// UserResponse representa a resposta de usuário
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
