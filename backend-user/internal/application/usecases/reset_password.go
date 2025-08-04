package usecases

import (
	"backend-user/internal/domain/repositories"
	"backend-user/internal/domain/services"
)

// ResetPasswordUseCase implementa o caso de uso para resetar senha
type ResetPasswordUseCase struct {
	userRepo    repositories.UserRepository
	authService services.AuthService
}

// NewResetPasswordUseCase cria uma nova instância do caso de uso
func NewResetPasswordUseCase(
	userRepo repositories.UserRepository,
	authService services.AuthService,
) *ResetPasswordUseCase {
	return &ResetPasswordUseCase{
		userRepo:    userRepo,
		authService: authService,
	}
}

// Execute executa o caso de uso de reset de senha
func (uc *ResetPasswordUseCase) Execute(token, newPassword string) error {
	// Verificar token de reset
	userID, err := uc.authService.ValidateResetToken(token)
	if err != nil {
		return err
	}

	// Buscar usuário
	user, err := uc.userRepo.GetByID(userID)
	if err != nil {
		return err
	}

	// Gerar hash da nova senha
	hashedPassword, err := uc.authService.HashPassword(newPassword)
	if err != nil {
		return err
	}

	// Atualizar senha do usuário
	user.PasswordHash = hashedPassword
	err = uc.userRepo.Update(user)
	if err != nil {
		return err
	}

	return nil
}
