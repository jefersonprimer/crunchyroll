package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

	"backend-user/internal/auth"
	"backend-user/internal/database"
	"backend-user/internal/models"
)

func RequestPasswordReset(c *gin.Context) {
	var input struct {
		Email string `json:"email" binding:"required,email"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if user exists
	var user models.User
	data, _, err := database.Client.From("users").Select("*", "", false).Eq("email", input.Email).Single().Execute()
	if err != nil {
		// Don't reveal if email exists or not for security
		c.JSON(http.StatusOK, gin.H{"message": "If your email is registered, you will receive a password reset link"})
		return
	}

	if err := json.Unmarshal(data, &user); err != nil {
		log.Printf("Error parsing user data: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error processing request"})
		return
	}

	// Generate reset token
	resetToken, err := auth.GenerateResetToken(user.ID, user.Email)
	if err != nil {
		log.Printf("Error generating reset token: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating reset token"})
		return
	}

	// TODO: Send email with reset token
	// For now, we'll just return the token in the response
	// In production, you should send this via email
	c.JSON(http.StatusOK, gin.H{
		"message": "If your email is registered, you will receive a password reset link",
		"token":   resetToken, // Remove this in production
	})
}

func ResetPassword(c *gin.Context) {
	var input struct {
		Token    string `json:"token" binding:"required"`
		Password string `json:"password" binding:"required,min=6"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verify reset token
	claims, err := auth.VerifyResetToken(input.Token)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or expired reset token"})
		return
	}

	// Hash new password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Error hashing password: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
		return
	}

	// Update user's password
	update := map[string]interface{}{
		"password_hash": string(hashedPassword),
	}

	_, _, err = database.Client.From("users").Update(update, "", "").Eq("id", claims.UserID).Execute()
	if err != nil {
		log.Printf("Error updating password: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password successfully reset"})
}
