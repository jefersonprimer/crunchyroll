package config

import (
	"os"
	"strconv"
)

type AppConfig struct {
	Port     string
	Env      string
	LogLevel string
}

var appConfig *AppConfig

func GetAppConfig() *AppConfig {
	if appConfig == nil {
		appConfig = &AppConfig{
			Port:     getEnv("PORT", "8080"),
			Env:      getEnv("ENV", "development"),
			LogLevel: getEnv("LOG_LEVEL", "info"),
		}
	}
	return appConfig
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}

func IsDevelopment() bool {
	return GetAppConfig().Env == "development"
}

func IsProduction() bool {
	return GetAppConfig().Env == "production"
}
