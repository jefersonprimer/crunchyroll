package validation

import (
	"errors"
	"regexp"
	"strings"
)

// ValidatorImpl implementa a interface Validator
type ValidatorImpl struct{}

// NewValidator cria uma nova instância do validador
func NewValidator() Validator {
	return &ValidatorImpl{}
}

// ValidateEmail valida um endereço de email
func (v *ValidatorImpl) ValidateEmail(email string) error {
	if email == "" {
		return errors.New("email is required")
	}

	// Regex básico para validação de email
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	if !emailRegex.MatchString(email) {
		return errors.New("invalid email format")
	}

	return nil
}

// ValidatePassword valida uma senha
func (v *ValidatorImpl) ValidatePassword(password string) error {
	if password == "" {
		return errors.New("password is required")
	}

	if len(password) < 6 {
		return errors.New("password must be at least 6 characters long")
	}

	// Verificar se contém pelo menos uma letra e um número
	hasLetter := regexp.MustCompile(`[a-zA-Z]`).MatchString(password)
	hasNumber := regexp.MustCompile(`[0-9]`).MatchString(password)

	if !hasLetter || !hasNumber {
		return errors.New("password must contain at least one letter and one number")
	}

	return nil
}

// ValidateUsername valida um nome de usuário
func (v *ValidatorImpl) ValidateUsername(username string) error {
	if username == "" {
		return errors.New("username is required")
	}

	if len(username) < 3 {
		return errors.New("username must be at least 3 characters long")
	}

	if len(username) > 20 {
		return errors.New("username must be at most 20 characters long")
	}

	// Verificar se contém apenas caracteres válidos
	usernameRegex := regexp.MustCompile(`^[a-zA-Z0-9_-]+$`)
	if !usernameRegex.MatchString(username) {
		return errors.New("username can only contain letters, numbers, underscores and hyphens")
	}

	// Verificar se não começa ou termina com hífen ou underscore
	if strings.HasPrefix(username, "-") || strings.HasPrefix(username, "_") {
		return errors.New("username cannot start with hyphen or underscore")
	}

	if strings.HasSuffix(username, "-") || strings.HasSuffix(username, "_") {
		return errors.New("username cannot end with hyphen or underscore")
	}

	return nil
}
