package supabase

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"backend-crunchyroll/cache"
)

var (
	globalCache = cache.New()
)

// CacheConfig configurações do cache
type CacheConfig struct {
	Enabled bool
	TTL     time.Duration
}

// DefaultCacheConfig configuração padrão do cache
var DefaultCacheConfig = CacheConfig{
	Enabled: true,
	TTL:     5 * time.Minute,
}

// QueryWithCache executa uma query com cache
func QueryWithCache[T any](ctx context.Context, query func() ([]T, error), cacheKey string, cfg CacheConfig) ([]T, error) {
	if cfg.Enabled {
		// Tentar obter do cache
		if cached, found := globalCache.Get(cacheKey); found {
			if result, ok := cached.([]T); ok {
				return result, nil
			}
		}
	}

	// Executar query com retry
	var result []T
	err := ExecuteWithRetry(ctx, func() error {
		var err error
		result, err = query()
		return err
	})

	if err != nil {
		return nil, fmt.Errorf("falha ao executar query: %w", err)
	}

	// Armazenar no cache se habilitado
	if cfg.Enabled {
		globalCache.Set(cacheKey, result, cfg.TTL)
	}

	return result, nil
}

// InvalidateCache invalida um item do cache
func InvalidateCache(cacheKey string) {
	globalCache.Delete(cacheKey)
}

// InvalidateAllCache limpa todo o cache
func InvalidateAllCache() {
	globalCache.Clear()
}

// GenerateCacheKey gera uma chave de cache única baseada nos parâmetros
func GenerateCacheKey(prefix string, params map[string]interface{}) string {
	jsonBytes, _ := json.Marshal(params)
	return fmt.Sprintf("%s:%s", prefix, string(jsonBytes))
}
