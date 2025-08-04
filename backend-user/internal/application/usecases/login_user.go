package usecases

import (
	"errors"

	"backend-user/internal/application/dto"
	"backend-user/internal/domain/entities"
	"backend-user/internal/domain/repositories"
	"backend-user/internal/domain/services"
)

// LoginUserUseCase implementa o caso de uso de login de usuário
type LoginUserUseCase struct {
	userRepo    repositories.UserRepository
	authService services.AuthService
}

// NewLoginUserUseCase cria uma nova instância do use case
func NewLoginUserUseCase(
	userRepo repositories.UserRepository,
	authService services.AuthService,
) *LoginUserUseCase {
	return &LoginUserUseCase{
		userRepo:    userRepo,
		authService: authService,
	}
}

// Execute executa o caso de uso de login
func (uc *LoginUserUseCase) Execute(req *dto.LoginRequest) (*dto.LoginResponse, error) {
	// Buscar usuário pelo email
	user, err := uc.userRepo.GetByEmail(req.Email)
	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	// Verificar senha
	if err := uc.authService.ComparePassword(req.Password, user.PasswordHash); err != nil {
		return nil, errors.New("invalid credentials")
	}

	// Atualizar último login
	user.UpdateLastLogin()
	if err := uc.userRepo.Update(user); err != nil {
		return nil, err
	}

	// Gerar token
	token, err := uc.authService.GenerateToken(user)
	if err != nil {
		return nil, err
	}

	// Retornar resposta
	return &dto.LoginResponse{
		User:  uc.toUserResponse(user),
		Token: token,
	}, nil
}

// toUserResponse converte a entidade User para UserResponse
func (uc *LoginUserUseCase) toUserResponse(user *entities.User) *dto.UserResponse {
	return &dto.UserResponse{
		ID:                 user.ID,
		Email:              user.Email,
		Username:           user.Username,
		DisplayName:        user.DisplayName,
		ProfileImageURL:    user.ProfileImageURL,
		BackgroundImageURL: user.BackgroundImageURL,
		CreatedAt:          user.CreatedAt.Format("2006-01-02T15:04:05.999999"),
		LastLoginAt:        user.LastLoginAt.Format("2006-01-02T15:04:05.999999"),
	}
}
