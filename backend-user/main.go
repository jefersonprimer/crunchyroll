package main

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"backend-user/internal/auth"
	"backend-user/internal/database"
	"backend-user/internal/handlers"
)

func main() {
	// Initialize database connection
	database.Init()

	r := gin.Default()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3001", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Auth routes
	r.POST("/api/register", handlers.Register)
	r.POST("/api/login", handlers.Login)
	r.POST("/api/request-password-reset", handlers.RequestPasswordReset)
	r.POST("/api/reset-password", handlers.ResetPassword)

	// Profile routes
	r.GET("/api/profile-images", handlers.GetProfileImages)
	r.GET("/api/background-images", handlers.GetBackgroundImages)
	r.GET("/api/profile", auth.AuthenticateToken(), handlers.GetUserProfile)
	r.PUT("/api/profile", auth.AuthenticateToken(), handlers.UpdateUserProfile)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	r.Run(":" + port)
}
