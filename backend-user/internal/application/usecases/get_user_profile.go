package usecases

import (
	"errors"

	"backend-user/internal/application/dto"
	"backend-user/internal/domain/entities"
	"backend-user/internal/domain/repositories"
)

// GetUserProfileUseCase implementa o caso de uso de obtenção de perfil
type GetUserProfileUseCase struct {
	userRepo repositories.UserRepository
}

// NewGetUserProfileUseCase cria uma nova instância do use case
func NewGetUserProfileUseCase(userRepo repositories.UserRepository) *GetUserProfileUseCase {
	return &GetUserProfileUseCase{
		userRepo: userRepo,
	}
}

// Execute executa o caso de uso de obtenção de perfil
func (uc *GetUserProfileUseCase) Execute(userID string) (*dto.UserResponse, error) {
	// Buscar usuário pelo ID
	user, err := uc.userRepo.GetByID(userID)
	if err != nil {
		return nil, errors.New("user not found")
	}

	// Retornar resposta
	return uc.toUserResponse(user), nil
}

// toUserResponse converte a entidade User para UserResponse
func (uc *GetUserProfileUseCase) toUserResponse(user *entities.User) *dto.UserResponse {
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
