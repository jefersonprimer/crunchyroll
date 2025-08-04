package handlers

import (
	"net/http"

	"backend-user/internal/application/dto"
	"backend-user/internal/application/usecases"

	"github.com/gin-gonic/gin"
)

// ProfileHandler gerencia as requisições de perfil
type ProfileHandler struct {
	getProfileUseCase          *usecases.GetUserProfileUseCase
	updateProfileUseCase       *usecases.UpdateUserProfileUseCase
	getProfileImagesUseCase    *usecases.GetProfileImagesUseCase
	getBackgroundImagesUseCase *usecases.GetBackgroundImagesUseCase
}

// NewProfileHandler cria uma nova instância do handler
func NewProfileHandler(
	getProfileUseCase *usecases.GetUserProfileUseCase,
	updateProfileUseCase *usecases.UpdateUserProfileUseCase,
	getProfileImagesUseCase *usecases.GetProfileImagesUseCase,
	getBackgroundImagesUseCase *usecases.GetBackgroundImagesUseCase,
) *ProfileHandler {
	return &ProfileHandler{
		getProfileUseCase:          getProfileUseCase,
		updateProfileUseCase:       updateProfileUseCase,
		getProfileImagesUseCase:    getProfileImagesUseCase,
		getBackgroundImagesUseCase: getBackgroundImagesUseCase,
	}
}

// GetUserProfile lida com a requisição de obtenção de perfil
func (h *ProfileHandler) GetUserProfile(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user not authenticated"})
		return
	}

	response, err := h.getProfileUseCase.Execute(userID.(string))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}

// UpdateUserProfile lida com a requisição de atualização de perfil
func (h *ProfileHandler) UpdateUserProfile(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user not authenticated"})
		return
	}

	var req dto.UpdateProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := h.updateProfileUseCase.Execute(userID.(string), &req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}

// GetProfileImages lida com a requisição de obtenção de imagens de perfil
func (h *ProfileHandler) GetProfileImages(c *gin.Context) {
	response, err := h.getProfileImagesUseCase.Execute()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}

// GetBackgroundImages lida com a requisição de obtenção de imagens de fundo
func (h *ProfileHandler) GetBackgroundImages(c *gin.Context) {
	response, err := h.getBackgroundImagesUseCase.Execute()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}
