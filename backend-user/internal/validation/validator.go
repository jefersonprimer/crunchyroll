package validation

// Validator define as operações de validação
type Validator interface {
	// ValidateEmail valida um endereço de email
	ValidateEmail(email string) error

	// ValidatePassword valida uma senha
	ValidatePassword(password string) error

	// ValidateUsername valida um nome de usuário
	ValidateUsername(username string) error
}
