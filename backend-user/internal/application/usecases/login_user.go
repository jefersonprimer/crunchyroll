package usecases

import (
	"errors"

	"backend-user/internal/application/dto"
	"backend-user/internal/domain/entities"
	"backend-user/internal/domain/repositories"
	"backend-user/internal/domain/services"
)

type LoginUserUseCase struct {
	userRepo    repositories.UserRepository
	authService services.AuthService
}

func NewLoginUserUseCase(
	userRepo repositories.UserRepository,
	authService services.AuthService,
) *LoginUserUseCase {
	return &LoginUserUseCase{
		userRepo:    userRepo,
		authService: authService,
	}
}

func (uc *LoginUserUseCase) Execute(req *dto.LoginRequest) (*dto.LoginResponse, error) {

	user, err := uc.userRepo.GetByEmail(req.Email)
	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	if err := uc.authService.ComparePassword(req.Password, user.PasswordHash); err != nil {
		return nil, errors.New("invalid credentials")
	}

	user.UpdateLastLogin()
	if err := uc.userRepo.Update(user); err != nil {
		return nil, err
	}

	token, err := uc.authService.GenerateToken(user)
	if err != nil {
		return nil, err
	}

	return &dto.LoginResponse{
		User:  uc.toUserResponse(user),
		Token: token,
	}, nil
}

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
