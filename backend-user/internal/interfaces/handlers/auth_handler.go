package handlers

import (
	"net/http"

	"backend-user/internal/application/dto"
	"backend-user/internal/application/usecases"

	"github.com/gin-gonic/gin"
)

// AuthHandler gerencia as requisições de autenticação
type AuthHandler struct {
	registerUseCase *usecases.RegisterUserUseCase
	loginUseCase    *usecases.LoginUserUseCase
}

// NewAuthHandler cria uma nova instância do handler
func NewAuthHandler(
	registerUseCase *usecases.RegisterUserUseCase,
	loginUseCase *usecases.LoginUserUseCase,
) *AuthHandler {
	return &AuthHandler{
		registerUseCase: registerUseCase,
		loginUseCase:    loginUseCase,
	}
}

// Register lida com a requisição de registro
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

// Login lida com a requisição de login
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
