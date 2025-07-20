package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"backend-user/internal/auth"
	"backend-user/internal/database"
	"backend-user/internal/models"
)

func GetProfileImages(c *gin.Context) {
	var images []models.ProfileImage
	query := database.Client.From("profile_images").Select("*", "", false)

	// Add filter if anime_name is provided
	if animeName := c.Query("anime_name"); animeName != "" {
		query = query.Eq("anime_name", animeName)
	}

	data, _, err := query.Execute()
	if err != nil {
		log.Printf("Error fetching profile images: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching profile images"})
		return
	}

	if len(data) == 0 {
		c.JSON(http.StatusOK, []models.ProfileImage{})
		return
	}

	if err := json.Unmarshal(data, &images); err != nil {
		log.Printf("Error parsing profile images: %v, data: %s", err, string(data))
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error parsing profile images"})
		return
	}
	c.JSON(http.StatusOK, images)
}

func GetBackgroundImages(c *gin.Context) {
	var images []models.BackgroundImage
	data, _, err := database.Client.From("background_images").Select("*", "", false).Execute()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching background images"})
		return
	}
	if err := json.Unmarshal(data, &images); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error parsing background images"})
		return
	}
	c.JSON(http.StatusOK, images)
}

func GetUserProfile(c *gin.Context) {
	claims := c.MustGet("user").(*auth.Claims)
	var user models.User
	data, _, err := database.Client.From("users").Select("*", "", false).Eq("id", claims.UserID).Single().Execute()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching user profile"})
		return
	}
	if err := json.Unmarshal(data, &user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error parsing user profile"})
		return
	}
	c.JSON(http.StatusOK, user)
}

func UpdateUserProfile(c *gin.Context) {
	claims := c.MustGet("user").(*auth.Claims)
	var input struct {
		DisplayName        string  `json:"display_name"`
		ProfileImageURL    *string `json:"profile_image_url"`
		BackgroundImageURL *string `json:"background_image_url"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	data, _, err := database.Client.From("users").Update(input, "", "").Eq("id", claims.UserID).Single().Execute()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating profile"})
		return
	}
	if err := json.Unmarshal(data, &user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error parsing updated profile"})
		return
	}

	c.JSON(http.StatusOK, user)
}
