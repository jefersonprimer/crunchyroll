package middleware

import (
	"net/http"
	"strings"

	"backend-user/internal/domain/services"

	"github.com/gin-gonic/gin"
)

// AuthMiddleware gerencia a autenticação via JWT
type AuthMiddleware struct {
	authService services.AuthService
}

// NewAuthMiddleware cria uma nova instância do middleware
func NewAuthMiddleware(authService services.AuthService) *AuthMiddleware {
	return &AuthMiddleware{
		authService: authService,
	}
}

// AuthenticateToken middleware para autenticar tokens JWT
func (m *AuthMiddleware) AuthenticateToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "authorization header required"})
			c.Abort()
			return
		}

		// Verificar se o header começa com "Bearer "
		if !strings.HasPrefix(authHeader, "Bearer ") {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization header format"})
			c.Abort()
			return
		}

		// Extrair o token
		token := strings.TrimPrefix(authHeader, "Bearer ")

		// Validar o token
		userID, err := m.authService.ValidateToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			c.Abort()
			return
		}

		// Adicionar o user_id ao contexto
		c.Set("user_id", userID)
		c.Next()
	}
}
