package usecases

import (
	"backend-user/internal/domain/repositories"
	"backend-user/internal/domain/services"
)

// RequestPasswordResetUseCase implementa o caso de uso para solicitar reset de senha
type RequestPasswordResetUseCase struct {
	userRepo     repositories.UserRepository
	emailService services.EmailService
	authService  services.AuthService
}

// NewRequestPasswordResetUseCase cria uma nova instância do caso de uso
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

// Execute executa o caso de uso de solicitação de reset de senha
func (uc *RequestPasswordResetUseCase) Execute(email string) error {
	// Buscar usuário pelo email
	user, err := uc.userRepo.GetByEmail(email)
	if err != nil {
		// Por segurança, não revelamos se o email existe ou não
		return nil
	}

	// Gerar token de reset
	resetToken, err := uc.authService.GenerateResetToken(user.ID, user.Email)
	if err != nil {
		return err
	}

	// Enviar email com token de reset
	err = uc.emailService.SendPasswordResetEmail(user.Email, resetToken)
	if err != nil {
		return err
	}

	return nil
}
