package handlers

import (
	"net/http"

	"backend-user/internal/application/dto"
	"backend-user/internal/application/usecases"

	"github.com/gin-gonic/gin"
)

// PasswordResetHandler gerencia as requisições relacionadas ao reset de senha
type PasswordResetHandler struct {
	requestPasswordResetUseCase *usecases.RequestPasswordResetUseCase
	resetPasswordUseCase        *usecases.ResetPasswordUseCase
}

// NewPasswordResetHandler cria uma nova instância do handler
func NewPasswordResetHandler(
	requestPasswordResetUseCase *usecases.RequestPasswordResetUseCase,
	resetPasswordUseCase *usecases.ResetPasswordUseCase,
) *PasswordResetHandler {
	return &PasswordResetHandler{
		requestPasswordResetUseCase: requestPasswordResetUseCase,
		resetPasswordUseCase:        resetPasswordUseCase,
	}
}

// RequestPasswordReset processa a requisição de reset de senha
func (h *PasswordResetHandler) RequestPasswordReset(c *gin.Context) {
	var req dto.RequestPasswordResetRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.requestPasswordResetUseCase.Execute(req.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error processing request"})
		return
	}

	// Por segurança, sempre retornamos a mesma mensagem
	c.JSON(http.StatusOK, gin.H{
		"message": "If your email is registered, you will receive a password reset link",
	})
}

// ResetPassword processa o reset de senha com token
func (h *PasswordResetHandler) ResetPassword(c *gin.Context) {
	var req dto.ResetPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.resetPasswordUseCase.Execute(req.Token, req.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or expired reset token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Password successfully reset",
	})
}
