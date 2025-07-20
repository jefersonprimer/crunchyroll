package config

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDB() {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Configuração do cliente MongoDB
	clientOptions := options.Client().
		ApplyURI("mongodb+srv://gabriell:%40Jki%21P3RH%40AVP785@blog-db.iln7ttc.mongodb.net/?retryWrites=true&w=majority&appName=blog-db").
		SetServerSelectionTimeout(10 * time.Second).
		SetConnectTimeout(10 * time.Second).
		SetMaxPoolSize(10).
		SetMinPoolSize(5)

	// Tentar conectar ao MongoDB
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("Erro ao conectar ao MongoDB:", err)
	}

	// Verificar a conexão
	pingCtx, pingCancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer pingCancel()

	if err := client.Ping(pingCtx, nil); err != nil {
		log.Fatal("Erro ao fazer ping no MongoDB:", err)
	}

	DB = client.Database("blog")
	log.Println("Conectado ao MongoDB com sucesso!")

	// Criar índices para a coleção posts
	postsCollection := DB.Collection("posts")
	indexModels := []mongo.IndexModel{
		{
			Keys: map[string]interface{}{
				"title": 1,
			},
			Options: options.Index().SetUnique(true),
		},
		{
			Keys: map[string]interface{}{
				"createdAt": -1,
			},
		},
		{
			Keys: map[string]interface{}{
				"tags": 1,
			},
		},
	}

	_, err = postsCollection.Indexes().CreateMany(ctx, indexModels)
	if err != nil {
		log.Printf("Aviso: Erro ao criar índices: %v", err)
	}
}
