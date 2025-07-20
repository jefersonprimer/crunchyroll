package cache

import (
	"sync"
	"time"
)

// CacheItem representa um item no cache com TTL
type CacheItem struct {
	Value      interface{}
	Expiration time.Time
}

// Cache implementa um cache em memória thread-safe com TTL
type Cache struct {
	items map[string]CacheItem
	mu    sync.RWMutex
}

// New cria uma nova instância do cache
func New() *Cache {
	cache := &Cache{
		items: make(map[string]CacheItem),
	}
	go cache.startCleanup()
	return cache
}

// Set adiciona um item ao cache com TTL
func (c *Cache) Set(key string, value interface{}, ttl time.Duration) {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.items[key] = CacheItem{
		Value:      value,
		Expiration: time.Now().Add(ttl),
	}
}

// Get recupera um item do cache
func (c *Cache) Get(key string) (interface{}, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	item, exists := c.items[key]
	if !exists {
		return nil, false
	}

	if time.Now().After(item.Expiration) {
		delete(c.items, key)
		return nil, false
	}

	return item.Value, true
}

// Delete remove um item do cache
func (c *Cache) Delete(key string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	delete(c.items, key)
}

// Clear remove todos os itens do cache
func (c *Cache) Clear() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.items = make(map[string]CacheItem)
}

// startCleanup inicia uma goroutine para limpar itens expirados
func (c *Cache) startCleanup() {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		c.cleanup()
	}
}

// cleanup remove itens expirados do cache
func (c *Cache) cleanup() {
	c.mu.Lock()
	defer c.mu.Unlock()

	now := time.Now()
	for key, item := range c.items {
		if now.After(item.Expiration) {
			delete(c.items, key)
		}
	}
}
