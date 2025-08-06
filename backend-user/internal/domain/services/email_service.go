package services

type EmailService interface {
	SendPasswordResetEmail(email, resetToken string) error
}
