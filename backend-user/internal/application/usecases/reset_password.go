package usecases

import (
	"backend-user/internal/domain/repositories"
	"backend-user/internal/domain/services"
)

type ResetPasswordUseCase struct {
	userRepo    repositories.UserRepository
	authService services.AuthService
}

func NewResetPasswordUseCase(
	userRepo repositories.UserRepository,
	authService services.AuthService,
) *ResetPasswordUseCase {
	return &ResetPasswordUseCase{
		userRepo:    userRepo,
		authService: authService,
	}
}

func (uc *ResetPasswordUseCase) Execute(email, code, newPassword string) error {

	user, err := uc.userRepo.GetByEmail(email)
	if err != nil {
		return err
	}

	err = uc.authService.ValidateResetCode(user.ID, email, code)
	if err != nil {
		return err
	}

	hashedPassword, err := uc.authService.HashPassword(newPassword)
	if err != nil {
		return err
	}

	user.PasswordHash = hashedPassword
	err = uc.userRepo.Update(user)
	if err != nil {
		return err
	}

	return nil
}
