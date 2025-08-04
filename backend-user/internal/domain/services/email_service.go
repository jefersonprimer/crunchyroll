package services

// EmailService define as operações de envio de email
type EmailService interface {
	// SendPasswordResetEmail envia email de reset de senha
	SendPasswordResetEmail(email, resetToken string) error
}
