package usecases

import (
	"errors"

	"backend-user/internal/application/dto"
	"backend-user/internal/domain/entities"
	"backend-user/internal/domain/repositories"
)

type UpdateUserProfileUseCase struct {
	userRepo repositories.UserRepository
}

func NewUpdateUserProfileUseCase(userRepo repositories.UserRepository) *UpdateUserProfileUseCase {
	return &UpdateUserProfileUseCase{
		userRepo: userRepo,
	}
}

func (uc *UpdateUserProfileUseCase) Execute(userID string, req *dto.UpdateProfileRequest) (*dto.UserResponse, error) {

	user, err := uc.userRepo.GetByID(userID)
	if err != nil {
		return nil, errors.New("user not found")
	}

	user.UpdateDisplayName(req.DisplayName)
	if req.ProfileImageURL != nil {
		user.UpdateProfileImage(*req.ProfileImageURL)
	}
	if req.BackgroundImageURL != nil {
		user.UpdateBackgroundImage(*req.BackgroundImageURL)
	}

	if err := uc.userRepo.Update(user); err != nil {
		return nil, err
	}

	return uc.toUserResponse(user), nil
}

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
