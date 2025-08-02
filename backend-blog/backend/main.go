package main

import (
	"log"
	"net/http"

	"backend-blog/backend/config"
	"backend-blog/backend/handlers"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	// Carregar variáveis de ambiente do arquivo .env
	if err := godotenv.Load(); err != nil {
		log.Printf("Aviso: Não foi possível carregar o arquivo .env: %v", err)
	}

	// Inicializar Supabase
	config.InitSupabase()

	// Configurar rotas
	r := mux.NewRouter()

	// Rotas para posts
	r.HandleFunc("/api/posts", handlers.GetPosts).Methods("GET")
	r.HandleFunc("/api/posts", handlers.CreatePost).Methods("POST")
	r.HandleFunc("/api/posts/{id}", handlers.GetPost).Methods("GET")
	r.HandleFunc("/api/posts/{id}", handlers.UpdatePost).Methods("PATCH")
	r.HandleFunc("/api/posts/{id}", handlers.DeletePost).Methods("DELETE")
	r.HandleFunc("/api/posts/{category}/{year}/{month}/{day}/{slug}", handlers.GetPostBySlug).Methods("GET")

	// Configurar CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:3001", "http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Content-Type", "Content-Length", "Accept-Encoding", "Authorization", "X-Requested-With"},
		AllowCredentials: true,
		Debug:            true,
	})

	// Iniciar servidor
	handler := c.Handler(r)
	log.Println("Servidor rodando na porta 8080...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
