package handlers

import (
	"net/http"

	"backend-user/internal/application/dto"
	"backend-user/internal/application/usecases"

	"github.com/gin-gonic/gin"
)

type PasswordResetHandler struct {
	requestPasswordResetUseCase *usecases.RequestPasswordResetUseCase
	resetPasswordUseCase        *usecases.ResetPasswordUseCase
}

func NewPasswordResetHandler(
	requestPasswordResetUseCase *usecases.RequestPasswordResetUseCase,
	resetPasswordUseCase *usecases.ResetPasswordUseCase,
) *PasswordResetHandler {
	return &PasswordResetHandler{
		requestPasswordResetUseCase: requestPasswordResetUseCase,
		resetPasswordUseCase:        resetPasswordUseCase,
	}
}

func (h *PasswordResetHandler) RequestPasswordReset(c *gin.Context) {
	var req dto.RequestPasswordResetRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.requestPasswordResetUseCase.Execute(req.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao processar solicitação"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Se seu email estiver registrado, você receberá um código de redefinição",
	})
}

func (h *PasswordResetHandler) ResetPassword(c *gin.Context) {
	var req dto.ResetPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.resetPasswordUseCase.Execute(req.Email, req.Code, req.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Código inválido ou expirado"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Senha redefinida com sucesso",
	})
}
