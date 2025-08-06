package services

import "backend-user/internal/domain/entities"

type AuthService interface {
	HashPassword(password string) (string, error)

	ComparePassword(password, hash string) error

	GenerateToken(user *entities.User) (string, error)

	ValidateToken(token string) (string, error)

	GenerateResetToken(userID, email string) (string, error)

	ValidateResetToken(token string) (string, error)

	ValidateResetCode(userID, email, code string) error
}
