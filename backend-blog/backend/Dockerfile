# Multi-stage build para otimizar o tamanho da imagem
FROM golang:1.24-alpine AS builder

# Instalar dependências necessárias para compilação
RUN apk add --no-cache git ca-certificates tzdata

WORKDIR /app

# Copiar arquivos de dependências
COPY go.mod go.sum ./
RUN go mod download

# Copiar código fonte
COPY . .

# Compilar a aplicação
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Imagem final
FROM alpine:latest

# Instalar ca-certificates para HTTPS
RUN apk --no-cache add ca-certificates tzdata

WORKDIR /root/

# Copiar o binário compilado
COPY --from=builder /app/main .

# Expor porta
EXPOSE 8080

# Comando para executar a aplicação
CMD ["./main"]
