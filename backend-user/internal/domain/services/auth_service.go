package services

import "backend-user/internal/domain/entities"

// AuthService define as operações de autenticação
type AuthService interface {
	// HashPassword gera o hash de uma senha
	HashPassword(password string) (string, error)

	// ComparePassword compara uma senha com seu hash
	ComparePassword(password, hash string) error

	// GenerateToken gera um token JWT para um usuário
	GenerateToken(user *entities.User) (string, error)

	// ValidateToken valida um token JWT e retorna o ID do usuário
	ValidateToken(token string) (string, error)

	// GenerateResetToken gera um token de reset de senha
	GenerateResetToken(userID, email string) (string, error)

	// ValidateResetToken valida um token de reset e retorna o ID do usuário
	ValidateResetToken(token string) (string, error)
}
