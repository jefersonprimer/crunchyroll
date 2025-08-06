package main

import (
	"log"
	"net/http"

	"backend-blog/backend/infra/config"
	containerPkg "backend-blog/backend/infra/container"
	"backend-blog/backend/presentation/middleware"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	// Carregar variáveis de ambiente do arquivo .env
	if err := godotenv.Load(); err != nil {
		log.Printf("Aviso: Não foi possível carregar o arquivo .env: %v", err)
	}

	// Initialize dependency container
	container := containerPkg.NewContainer()

	// Configurar rotas
	r := mux.NewRouter()

	// Aplicar middlewares
	r.Use(middleware.ErrorHandlerMiddleware)
	r.Use(middleware.LoggingMiddleware)

	// Rotas para posts
	r.HandleFunc("/api/posts", container.PostHandler.GetPosts).Methods("GET")
	r.HandleFunc("/api/posts", container.PostHandler.CreatePost).Methods("POST")
	r.HandleFunc("/api/posts/{id}", container.PostHandler.GetPost).Methods("GET")
	r.HandleFunc("/api/posts/{id}", container.PostHandler.UpdatePost).Methods("PATCH")
	r.HandleFunc("/api/posts/{id}", container.PostHandler.DeletePost).Methods("DELETE")
	r.HandleFunc("/api/posts/{category}/{year}/{month}/{day}/{slug}", container.PostHandler.GetPostBySlug).Methods("GET")

	// Configurar CORS
	corsOptions := cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:3001", "http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Content-Type", "Content-Length", "Accept-Encoding", "Authorization", "X-Requested-With"},
		AllowCredentials: true,
	}

	// Habilitar debug apenas em desenvolvimento
	if config.IsDevelopment() {
		corsOptions.Debug = true
	}

	c := cors.New(corsOptions)

	// Iniciar servidor
	handler := c.Handler(r)
	appConfig := config.GetAppConfig()
	log.Printf("Servidor rodando na porta %s...", appConfig.Port)
	log.Fatal(http.ListenAndServe(":"+appConfig.Port, handler))
}
