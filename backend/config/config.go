package config

import "os"

func GetPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		return "8081" // Porta padrão
	}
	return port
}
