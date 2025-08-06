package usecases

import (
	"backend-user/internal/domain/repositories"
	"backend-user/internal/domain/services"
)

type RequestPasswordResetUseCase struct {
	userRepo     repositories.UserRepository
	emailService services.EmailService
	authService  services.AuthService
}

func NewRequestPasswordResetUseCase(
	userRepo repositories.UserRepository,
	emailService services.EmailService,
	authService services.AuthService,
) *RequestPasswordResetUseCase {
	return &RequestPasswordResetUseCase{
		userRepo:     userRepo,
		emailService: emailService,
		authService:  authService,
	}
}

func (uc *RequestPasswordResetUseCase) Execute(email string) error {

	user, err := uc.userRepo.GetByEmail(email)
	if err != nil {

		return nil
	}

	resetToken, err := uc.authService.GenerateResetToken(user.ID, user.Email)
	if err != nil {
		return err
	}

	err = uc.emailService.SendPasswordResetEmail(user.Email, resetToken)
	if err != nil {
		return err
	}

	return nil
}
