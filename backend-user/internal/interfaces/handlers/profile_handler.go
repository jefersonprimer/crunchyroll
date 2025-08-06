package handlers

import (
	"net/http"

	"backend-user/internal/application/dto"
	"backend-user/internal/application/usecases"

	"github.com/gin-gonic/gin"
)

type ProfileHandler struct {
	getProfileUseCase          *usecases.GetUserProfileUseCase
	updateProfileUseCase       *usecases.UpdateUserProfileUseCase
	getProfileImagesUseCase    *usecases.GetProfileImagesUseCase
	getBackgroundImagesUseCase *usecases.GetBackgroundImagesUseCase
}

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

func (h *ProfileHandler) GetProfileImages(c *gin.Context) {
	response, err := h.getProfileImagesUseCase.Execute()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}

func (h *ProfileHandler) GetBackgroundImages(c *gin.Context) {
	response, err := h.getBackgroundImagesUseCase.Execute()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}
