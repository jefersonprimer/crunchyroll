package services

import (
	"fmt"
	"os"
)

// EmailService implementa a interface do serviço de email
type EmailService struct {
	// Aqui você pode adicionar configurações de email como SMTP, etc.
}

// NewEmailService cria uma nova instância do serviço de email
func NewEmailService() *EmailService {
	return &EmailService{}
}

// SendPasswordResetEmail envia email de reset de senha
func (s *EmailService) SendPasswordResetEmail(email, resetToken string) error {
	// Implementação básica - em produção você usaria um serviço de email real
	// como SendGrid, AWS SES, etc.

	resetURL := fmt.Sprintf("%s/reset-password?token=%s",
		os.Getenv("FRONTEND_URL"),
		resetToken)

	// Log para demonstração - em produção isso seria enviado por email
	fmt.Printf("Password reset email sent to %s with token: %s\n", email, resetToken)
	fmt.Printf("Reset URL: %s\n", resetURL)

	return nil
}
