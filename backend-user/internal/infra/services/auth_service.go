package services

import (
	"os"
	"time"

	"backend-user/internal/domain/entities"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// AuthService implementa a interface do serviço de autenticação
type AuthService struct {
	jwtSecret []byte
}

// NewAuthService cria uma nova instância do serviço de autenticação
func NewAuthService() *AuthService {
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "default-secret-key"
	}

	return &AuthService{
		jwtSecret: []byte(jwtSecret),
	}
}

// HashPassword gera o hash de uma senha
func (s *AuthService) HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// ComparePassword compara uma senha com seu hash
func (s *AuthService) ComparePassword(password, hash string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}

// GenerateToken gera um token JWT para um usuário
func (s *AuthService) GenerateToken(user *entities.User) (string, error) {
	claims := jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"exp":     time.Now().Add(time.Hour * 24 * 7).Unix(), // 7 dias
		"iat":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(s.jwtSecret)
}

// ValidateToken valida um token JWT e retorna o ID do usuário
func (s *AuthService) ValidateToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return s.jwtSecret, nil
	})

	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userID, ok := claims["user_id"].(string)
		if !ok {
			return "", jwt.ErrSignatureInvalid
		}
		return userID, nil
	}

	return "", jwt.ErrSignatureInvalid
}

// GenerateResetToken gera um token de reset de senha
func (s *AuthService) GenerateResetToken(userID, email string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"email":   email,
		"type":    "reset",
		"exp":     time.Now().Add(24 * time.Hour).Unix(), // Token válido por 24 horas
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(s.jwtSecret)
}

// ValidateResetToken valida um token de reset e retorna o ID do usuário
func (s *AuthService) ValidateResetToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return s.jwtSecret, nil
	})

	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// Verificar se é um token de reset
		if tokenType, ok := claims["type"].(string); !ok || tokenType != "reset" {
			return "", jwt.ErrSignatureInvalid
		}

		userID, ok := claims["user_id"].(string)
		if !ok {
			return "", jwt.ErrSignatureInvalid
		}
		return userID, nil
	}

	return "", jwt.ErrSignatureInvalid
}
