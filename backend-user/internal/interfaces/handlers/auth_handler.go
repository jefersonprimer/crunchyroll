package handlers

import (
	"net/http"

	"backend-user/internal/application/dto"
	"backend-user/internal/application/usecases"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	registerUseCase *usecases.RegisterUserUseCase
	loginUseCase    *usecases.LoginUserUseCase
}

func NewAuthHandler(
	registerUseCase *usecases.RegisterUserUseCase,
	loginUseCase *usecases.LoginUserUseCase,
) *AuthHandler {
	return &AuthHandler{
		registerUseCase: registerUseCase,
		loginUseCase:    loginUseCase,
	}
}

func (h *AuthHandler) Register(c *gin.Context) {
	var req dto.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := h.registerUseCase.Execute(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, response)
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req dto.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := h.loginUseCase.Execute(&req)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}
