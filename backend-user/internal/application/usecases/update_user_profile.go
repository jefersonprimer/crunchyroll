package usecases

import (
	"errors"

	"backend-user/internal/application/dto"
	"backend-user/internal/domain/entities"
	"backend-user/internal/domain/repositories"
)

// UpdateUserProfileUseCase implementa o caso de uso de atualização de perfil
type UpdateUserProfileUseCase struct {
	userRepo repositories.UserRepository
}

// NewUpdateUserProfileUseCase cria uma nova instância do use case
func NewUpdateUserProfileUseCase(userRepo repositories.UserRepository) *UpdateUserProfileUseCase {
	return &UpdateUserProfileUseCase{
		userRepo: userRepo,
	}
}

// Execute executa o caso de uso de atualização de perfil
func (uc *UpdateUserProfileUseCase) Execute(userID string, req *dto.UpdateProfileRequest) (*dto.UserResponse, error) {
	// Buscar usuário pelo ID
	user, err := uc.userRepo.GetByID(userID)
	if err != nil {
		return nil, errors.New("user not found")
	}

	// Atualizar dados do usuário
	user.UpdateDisplayName(req.DisplayName)
	if req.ProfileImageURL != nil {
		user.UpdateProfileImage(*req.ProfileImageURL)
	}
	if req.BackgroundImageURL != nil {
		user.UpdateBackgroundImage(*req.BackgroundImageURL)
	}

	// Salvar no repositório
	if err := uc.userRepo.Update(user); err != nil {
		return nil, err
	}

	// Retornar resposta
	return uc.toUserResponse(user), nil
}

// toUserResponse converte a entidade User para UserResponse
func (uc *UpdateUserProfileUseCase) toUserResponse(user *entities.User) *dto.UserResponse {
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
