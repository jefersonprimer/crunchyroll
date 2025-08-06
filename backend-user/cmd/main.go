package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"backend-user/internal/application/usecases"
	"backend-user/internal/infra/repositories"
	infraServices "backend-user/internal/infra/services"
	"backend-user/internal/infra/supabase"
	"backend-user/internal/interfaces/handlers"
	"backend-user/internal/interfaces/middleware"
	"backend-user/internal/validation"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	supabaseClient, err := supabase.NewClient()
	if err != nil {
		log.Fatal("Failed to initialize Supabase client:", err)
	}

	authService := infraServices.NewAuthService()
	emailService := infraServices.NewEmailService()

	userRepo := repositories.NewUserRepository(supabaseClient)
	imageRepo := repositories.NewImageRepository(supabaseClient)

	validator := validation.NewValidator()

	registerUseCase := usecases.NewRegisterUserUseCase(userRepo, authService, validator)
	loginUseCase := usecases.NewLoginUserUseCase(userRepo, authService)
	getProfileUseCase := usecases.NewGetUserProfileUseCase(userRepo)
	updateProfileUseCase := usecases.NewUpdateUserProfileUseCase(userRepo)
	getProfileImagesUseCase := usecases.NewGetProfileImagesUseCase(imageRepo)
	getBackgroundImagesUseCase := usecases.NewGetBackgroundImagesUseCase(imageRepo)
	requestPasswordResetUseCase := usecases.NewRequestPasswordResetUseCase(userRepo, emailService, authService)
	resetPasswordUseCase := usecases.NewResetPasswordUseCase(userRepo, authService)

	authHandler := handlers.NewAuthHandler(registerUseCase, loginUseCase)
	profileHandler := handlers.NewProfileHandler(
		getProfileUseCase,
		updateProfileUseCase,
		getProfileImagesUseCase,
		getBackgroundImagesUseCase,
	)
	passwordResetHandler := handlers.NewPasswordResetHandler(
		requestPasswordResetUseCase,
		resetPasswordUseCase,
	)

	authMiddleware := middleware.NewAuthMiddleware(authService)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3001", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	setupRoutes(r, authHandler, profileHandler, passwordResetHandler, authMiddleware)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	log.Printf("Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

func setupRoutes(
	r *gin.Engine,
	authHandler *handlers.AuthHandler,
	profileHandler *handlers.ProfileHandler,
	passwordResetHandler *handlers.PasswordResetHandler,
	authMiddleware *middleware.AuthMiddleware,
) {

	r.POST("/api/register", authHandler.Register)
	r.POST("/api/login", authHandler.Login)

	r.POST("/api/request-password-reset", passwordResetHandler.RequestPasswordReset)
	r.POST("/api/reset-password", passwordResetHandler.ResetPassword)

	r.GET("/api/profile-images", profileHandler.GetProfileImages)
	r.GET("/api/background-images", profileHandler.GetBackgroundImages)

	protected := r.Group("/api")
	protected.Use(authMiddleware.AuthenticateToken())
	{
		protected.GET("/profile", profileHandler.GetUserProfile)
		protected.PUT("/profile", profileHandler.UpdateUserProfile)
	}
}
