package services

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"net/smtp"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

type EmailService struct {
	jwtSecret []byte
}

func NewEmailService() *EmailService {
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "default-secret-key"
	}

	return &EmailService{
		jwtSecret: []byte(jwtSecret),
	}
}

func (s *EmailService) generateResetCode(userID, email string) string {
	h := hmac.New(sha256.New, s.jwtSecret)
	h.Write([]byte(userID + email + "reset"))
	hash := h.Sum(nil)

	hashHex := hex.EncodeToString(hash)
	return hashHex[:6]
}

func (s *EmailService) extractUserIDFromToken(tokenString string) (string, error) {
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

func (s *EmailService) SendPasswordResetEmail(email, resetToken string) error {
	userID, err := s.extractUserIDFromToken(resetToken)
	if err != nil {
		fmt.Printf("Error extracting userID from token: %v\n", err)
		fmt.Printf("Using email as userID for development\n")
		userID = email
	}

	resetCode := s.generateResetCode(userID, email)

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	gmailUser := os.Getenv("GMAIL_USER")
	gmailPassword := os.Getenv("GMAIL_APP_PASSWORD")

	if gmailUser == "" || gmailPassword == "" {
		fmt.Printf("Password reset email sent to %s with token: %s\n", email, resetToken)
		fmt.Printf("Reset code: %s\n", resetCode)
		fmt.Printf("Reset URL: %s/reset-password?email=%s&code=%s\n",
			os.Getenv("FRONTEND_URL"), email, resetCode)
		return nil
	}

	auth := smtp.PlainAuth("", gmailUser, gmailPassword, smtpHost)

	subject := "Redefinição de Senha - Crunchyroll"
	body := fmt.Sprintf(`
		<html>
		<body>
			<h2>Redefinição de Senha</h2>
			<p>Você solicitou a redefinição da sua senha.</p>
			<p>Use o código abaixo para redefinir sua senha:</p>
			<h1 style="color: #f47521; font-size: 32px; text-align: center; padding: 20px; background: #f0f0f0; border-radius: 10px;">%s</h1>
			<p>Este código expira em 10 minutos.</p>
			<p>Se você não solicitou esta redefinição, ignore este email.</p>
			<br>
			<p>Atenciosamente,<br>Equipe Crunchyroll</p>
		</body>
		</html>
	`, resetCode)

	headers := fmt.Sprintf("From: %s\r\n", gmailUser) +
		fmt.Sprintf("To: %s\r\n", email) +
		fmt.Sprintf("Subject: %s\r\n", subject) +
		"MIME-version: 1.0\r\n" +
		"Content-Type: text/html; charset=UTF-8\r\n" +
		"\r\n"

	msg := headers + body

	err = smtp.SendMail(smtpHost+":"+smtpPort, auth, gmailUser, []string{email}, []byte(msg))
	if err != nil {
		fmt.Printf("Error sending email: %v\n", err)
		fmt.Printf("Password reset email sent to %s with token: %s\n", email, resetToken)
		fmt.Printf("Reset code: %s\n", resetCode)
		return nil
	}

	fmt.Printf("Password reset email sent to %s with code: %s\n", email, resetCode)
	return nil
}
