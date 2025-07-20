package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"

	"backend-user/internal/auth"
	"backend-user/internal/database"
	"backend-user/internal/models"
)

func Register(c *gin.Context) {
	var input struct {
		Email       string `json:"email" binding:"required,email"`
		Password    string `json:"password" binding:"required,min=6"`
		Username    string `json:"username" binding:"required"`
		DisplayName string `json:"display_name" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if user exists
	var existingUser models.User
	data, _, err := database.Client.From("users").Select("*", "", false).Eq("email", input.Email).Single().Execute()
	if err == nil {
		if err := json.Unmarshal(data, &existingUser); err == nil {
			log.Printf("User already exists with email: %s", input.Email)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email already registered"})
			return
		}
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Error hashing password: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
		return
	}

	// Create user
	user := models.User{
		ID:           uuid.New().String(),
		Email:        input.Email,
		Username:     input.Username,
		DisplayName:  input.DisplayName,
		PasswordHash: string(hashedPassword),
		CreatedAt:    time.Now(),
	}

	log.Printf("Attempting to create user with email: %s", input.Email)
	data, _, err = database.Client.From("users").Insert(user, false, "", "", "").Single().Execute()
	if err != nil {
		log.Printf("Error creating user in database: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error creating user: %v", err)})
		return
	}
	if err := json.Unmarshal(data, &user); err != nil {
		log.Printf("Error parsing created user: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error parsing created user"})
		return
	}

	// Generate JWT token
	token, err := auth.GenerateToken(user.ID, user.Email)
	if err != nil {
		log.Printf("Error generating token: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"token": token,
		"user":  user,
	})
}

func Login(c *gin.Context) {
	var input struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		log.Printf("Error binding JSON input: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Printf("Attempting login for email: %s", input.Email)

	// Get user
	var user models.User
	data, _, err := database.Client.From("users").Select("*", "", false).Eq("email", input.Email).Single().Execute()
	if err != nil {
		log.Printf("Error fetching user from database: %v", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	log.Printf("Raw user data from database: %s", string(data))

	if err := json.Unmarshal(data, &user); err != nil {
		log.Printf("Error parsing user data: %v, Raw data: %s", err, string(data))
		// Try to parse the time fields manually
		var rawUser map[string]interface{}
		if err := json.Unmarshal(data, &rawUser); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error parsing user data"})
			return
		}

		// Parse created_at
		if createdAt, ok := rawUser["created_at"].(string); ok {
			parsedTime, err := time.Parse("2006-01-02T15:04:05.999999", createdAt)
			if err != nil {
				log.Printf("Error parsing created_at: %v", err)
			} else {
				user.CreatedAt = parsedTime
			}
		}

		// Parse last_login_at
		if lastLoginAt, ok := rawUser["last_login_at"].(string); ok {
			if lastLoginAt != "0001-01-01T00:00:00" {
				parsedTime, err := time.Parse("2006-01-02T15:04:05.999999", lastLoginAt)
				if err != nil {
					log.Printf("Error parsing last_login_at: %v", err)
				} else {
					user.LastLoginAt = parsedTime
				}
			}
		}

		// Set other fields
		if id, ok := rawUser["id"].(string); ok {
			user.ID = id
		}
		if email, ok := rawUser["email"].(string); ok {
			user.Email = email
		}
		if username, ok := rawUser["username"].(string); ok {
			user.Username = username
		}
		if displayName, ok := rawUser["display_name"].(string); ok {
			user.DisplayName = displayName
		}
		if passwordHash, ok := rawUser["password_hash"].(string); ok {
			user.PasswordHash = passwordHash
		}
		if profileImageURL, ok := rawUser["profile_image_url"].(string); ok {
			if profileImageURL != "" {
				user.ProfileImageURL = &profileImageURL
			}
		}
		if backgroundImageURL, ok := rawUser["background_image_url"].(string); ok {
			if backgroundImageURL != "" {
				user.BackgroundImageURL = &backgroundImageURL
			}
		}
	}

	// Verify password
	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Update last login
	user.LastLoginAt = time.Now()
	data, _, err = database.Client.From("users").Update(user, "", "").Eq("id", user.ID).Single().Execute()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating last login"})
		return
	}
	if err := json.Unmarshal(data, &user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error parsing updated user"})
		return
	}

	// Generate JWT token
	token, err := auth.GenerateToken(user.ID, user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user":  user,
	})
}

// RequestPasswordReset and ResetPassword functions have been moved to password_reset.go
