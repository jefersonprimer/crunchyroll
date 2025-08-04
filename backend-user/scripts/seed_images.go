package main

import (
	"log"

	"backend-user/internal/infra/supabase"

	"github.com/joho/godotenv"
)

func main() {
	// Carregar variáveis de ambiente
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Inicializar cliente Supabase
	client, err := supabase.NewClient()
	if err != nil {
		log.Fatal("Failed to initialize Supabase client:", err)
	}

	// Dados de teste para imagens de perfil
	profileImages := []map[string]interface{}{
		{
			"id":         "1",
			"anime_name": "Naruto",
			"image_url":  "https://example.com/naruto-profile.jpg",
		},
		{
			"id":         "2",
			"anime_name": "Dragon Ball",
			"image_url":  "https://example.com/dragonball-profile.jpg",
		},
		{
			"id":         "3",
			"anime_name": "One Piece",
			"image_url":  "https://example.com/onepiece-profile.jpg",
		},
	}

	// Dados de teste para imagens de fundo
	backgroundImages := []map[string]interface{}{
		{
			"id":         "1",
			"anime_name": "Naruto",
			"image_url":  "https://example.com/naruto-background.jpg",
		},
		{
			"id":         "2",
			"anime_name": "Dragon Ball",
			"image_url":  "https://example.com/dragonball-background.jpg",
		},
		{
			"id":         "3",
			"anime_name": "One Piece",
			"image_url":  "https://example.com/onepiece-background.jpg",
		},
	}

	// Inserir imagens de perfil
	log.Println("Inserindo imagens de perfil...")
	for _, image := range profileImages {
		_, _, err := client.From("profile_images").Insert(image, false, "", "", "").Execute()
		if err != nil {
			log.Printf("Erro ao inserir imagem de perfil %s: %v", image["id"], err)
		} else {
			log.Printf("Imagem de perfil %s inserida com sucesso", image["id"])
		}
	}

	// Inserir imagens de fundo
	log.Println("Inserindo imagens de fundo...")
	for _, image := range backgroundImages {
		_, _, err := client.From("background_images").Insert(image, false, "", "", "").Execute()
		if err != nil {
			log.Printf("Erro ao inserir imagem de fundo %s: %v", image["id"], err)
		} else {
			log.Printf("Imagem de fundo %s inserida com sucesso", image["id"])
		}
	}

	log.Println("Script de seed concluído!")
}
