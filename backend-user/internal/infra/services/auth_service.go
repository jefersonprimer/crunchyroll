package services

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"os"
	"time"

	"backend-user/internal/domain/entities"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	jwtSecret []byte
}

func NewAuthService() *AuthService {
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "default-secret-key"
	}

	return &AuthService{
		jwtSecret: []byte(jwtSecret),
	}
}

func (s *AuthService) HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func (s *AuthService) ComparePassword(password, hash string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}

func (s *AuthService) GenerateToken(user *entities.User) (string, error) {
	claims := jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"exp":     time.Now().Add(time.Hour * 24 * 7).Unix(),
		"iat":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(s.jwtSecret)
}

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

func (s *AuthService) GenerateResetToken(userID, email string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"email":   email,
		"type":    "reset",
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(s.jwtSecret)
}

func (s *AuthService) ValidateResetToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return s.jwtSecret, nil
	})

	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
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

func (s *AuthService) ValidateResetCode(userID, email, code string) error {
	expectedCode := s.generateExpectedCode(userID, email)

	fmt.Printf("Validating reset code:\n")
	fmt.Printf("  UserID: %s\n", userID)
	fmt.Printf("  Email: %s\n", email)
	fmt.Printf("  Provided code: %s\n", code)
	fmt.Printf("  Expected code: %s\n", expectedCode)
	fmt.Printf("  Codes match: %t\n", code == expectedCode)

	if code != expectedCode {
		return fmt.Errorf("código inválido")
	}

	return nil
}

func (s *AuthService) generateExpectedCode(userID, email string) string {
	h := hmac.New(sha256.New, s.jwtSecret)
	h.Write([]byte(userID + email + "reset"))
	hash := h.Sum(nil)

	hashHex := hex.EncodeToString(hash)
	return hashHex[:6]
}
