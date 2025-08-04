package config

import (
	"os"
)

// Config representa a configuração da aplicação
type Config struct {
	SupabaseURL string
	SupabaseKey string
	JWTSecret   string
	FrontendURL string
	Port        string
	Environment string
}

// Load carrega a configuração das variáveis de ambiente
func Load() *Config {
	return &Config{
		SupabaseURL: getEnv("SUPABASE_URL", ""),
		SupabaseKey: getEnv("SUPABASE_ANON_KEY", ""),
		JWTSecret:   getEnv("JWT_SECRET", "default-secret-key"),
		FrontendURL: getEnv("FRONTEND_URL", "http://localhost:3000"),
		Port:        getEnv("PORT", "3000"),
		Environment: getEnv("ENVIRONMENT", "development"),
	}
}

// getEnv obtém uma variável de ambiente com valor padrão
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

// IsDevelopment verifica se está em ambiente de desenvolvimento
func (c *Config) IsDevelopment() bool {
	return c.Environment == "development"
}

// IsProduction verifica se está em ambiente de produção
func (c *Config) IsProduction() bool {
	return c.Environment == "production"
}
