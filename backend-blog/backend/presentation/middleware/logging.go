package middleware

import (
	"log"
	"net/http"
	"time"
)

type responseWriter struct {
	http.ResponseWriter
	statusCode int
}

func (rw *responseWriter) WriteHeader(code int) {
	rw.statusCode = code
	rw.ResponseWriter.WriteHeader(code)
}

// LoggingMiddleware registra informações sobre as requisições HTTP
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		// Wrapper para capturar o status code
		rw := &responseWriter{
			ResponseWriter: w,
			statusCode:     http.StatusOK,
		}

		// Executar o próximo handler
		next.ServeHTTP(rw, r)

		// Calcular duração
		duration := time.Since(start)

		// Log da requisição
		log.Printf(
			"%s %s %d %v %s",
			r.Method,
			r.RequestURI,
			rw.statusCode,
			duration,
			r.RemoteAddr,
		)
	})
}


