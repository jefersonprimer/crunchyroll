package supabase

import (
	"context"
	"log"
	"os"
	"sync"
	"time"

	"github.com/nedpals/supabase-go"
)

var (
	instance *supabase.Client
	once     sync.Once
)

// ClientConfig configurações avançadas
type ClientConfig struct {
	Timeout       time.Duration
	MaxRetries    int
	EnableMetrics bool
	RetryDelay    time.Duration
}

// DefaultConfig configuração padrão otimizada
var DefaultConfig = ClientConfig{
	Timeout:       30 * time.Second,
	MaxRetries:    5,
	EnableMetrics: true,
	RetryDelay:    1 * time.Second,
}

// GetClient retorna uma instância singleton thread-safe do cliente Supabase
func GetClient() *supabase.Client {
	once.Do(func() {
		cfg := DefaultConfig

		url := mustGetEnv("SUPABASE_URL")
		key := mustGetEnv("SUPABASE_KEY")

		// Criação do cliente com timeout
		client := supabase.CreateClient(url, key)

		// Teste de conexão robusto
		if err := testConnection(client, cfg); err != nil {
			log.Fatalf("Supabase connection failed: %v", err)
		}

		instance = client
	})

	return instance
}

// testConnection verifica a conexão com tratamento de retry
func testConnection(client *supabase.Client, cfg ClientConfig) error {
	var lastErr error

	for i := 0; i < cfg.MaxRetries; i++ {
		ctx, cancel := context.WithTimeout(context.Background(), cfg.Timeout)
		defer cancel()

		var result []map[string]interface{}
		err := client.DB.From("animes").Select("*").Limit(1).ExecuteWithContext(ctx, &result)

		if err == nil {
			return nil
		}

		lastErr = err
		// Backoff exponencial com jitter
		delay := time.Duration(i+1) * cfg.RetryDelay
		jitter := time.Duration(float64(delay) * 0.1) // 10% de jitter
		time.Sleep(delay + jitter)
	}

	return lastErr
}

// mustGetEnv obtém variável de ambiente ou falha
func mustGetEnv(key string) string {
	value := os.Getenv(key)
	if value == "" {
		log.Fatalf("Variável de ambiente %s não definida", key)
	}
	return value
}

// WithContext adiciona timeout padrão às operações
func WithContext(ctx context.Context) (context.Context, context.CancelFunc) {
	return context.WithTimeout(ctx, DefaultConfig.Timeout)
}

// ExecuteWithRetry executa uma operação com retry automático
func ExecuteWithRetry(ctx context.Context, operation func() error) error {
	var lastErr error
	cfg := DefaultConfig

	for i := 0; i < cfg.MaxRetries; i++ {
		err := operation()
		if err == nil {
			return nil
		}

		lastErr = err
		// Backoff exponencial com jitter
		delay := time.Duration(i+1) * cfg.RetryDelay
		jitter := time.Duration(float64(delay) * 0.1)
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-time.After(delay + jitter):
			continue
		}
	}

	return lastErr
}
