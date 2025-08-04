# Clean Architecture + DDD - Backend User Service

Este projeto foi reestruturado seguindo os princípios de Clean Architecture e Domain-Driven Design (DDD) para garantir desacoplamento, testabilidade e manutenibilidade.

## Estrutura de Pastas

```
backend-user/
├── cmd/
│   └── main.go                 # Ponto de entrada da aplicação
├── internal/
│   ├── domain/                 # Camada de domínio (regras de negócio)
│   │   ├── entities/           # Entidades do domínio
│   │   │   ├── user.go
│   │   │   ├── profile_image.go
│   │   │   └── background_image.go
│   │   ├── repositories/       # Interfaces dos repositórios
│   │   │   ├── user_repository.go
│   │   │   └── image_repository.go
│   │   └── services/           # Interfaces dos serviços
│   │       ├── auth_service.go
│   │       └── email_service.go
│   ├── application/            # Camada de aplicação (use cases)
│   │   ├── dto/                # Data Transfer Objects
│   │   │   ├── auth_dto.go
│   │   │   └── profile_dto.go
│   │   └── usecases/           # Casos de uso
│   │       ├── register_user.go
│   │       ├── login_user.go
│   │       ├── get_user_profile.go
│   │       ├── update_user_profile.go
│   │       ├── get_profile_images.go
│   │       └── get_background_images.go
│   ├── infra/                  # Camada de infraestrutura
│   │   ├── supabase/           # Cliente Supabase
│   │   │   ├── client.go
│   │   │   └── errors.go
│   │   ├── repositories/       # Implementações dos repositórios
│   │   │   ├── user_repository.go
│   │   │   └── image_repository.go
│   │   └── services/           # Implementações dos serviços
│   │       ├── auth_service.go
│   │       └── email_service.go
│   ├── interfaces/             # Camada de interfaces
│   │   ├── handlers/           # Handlers REST
│   │   │   ├── auth_handler.go
│   │   │   └── profile_handler.go
│   │   └── middleware/         # Middlewares
│   │       └── auth_middleware.go
│   ├── validation/             # Validações isoladas
│   │   ├── validator.go
│   │   └── validator_impl.go
│   └── config/                 # Configurações
│       └── config.go
├── go.mod
├── go.sum
├── Dockerfile
└── README.md
```

## Princípios Aplicados

### 1. Clean Architecture
- **Independência de Frameworks**: O domínio não depende de frameworks externos
- **Testabilidade**: Cada camada pode ser testada independentemente
- **Independência de UI**: A lógica de negócio não depende da interface
- **Independência de Banco**: O domínio não conhece detalhes de persistência

### 2. Domain-Driven Design (DDD)
- **Entidades**: Representam objetos com identidade e ciclo de vida
- **Repositórios**: Abstraem a persistência de entidades
- **Serviços de Domínio**: Operações que não pertencem a uma entidade específica
- **Use Cases**: Orquestram as operações de negócio

### 3. Injeção de Dependência
- Todas as dependências são injetadas via construtores
- Facilita testes unitários e mock objects
- Reduz acoplamento entre componentes

## Camadas

### Domain (Domínio)
- **Entidades**: `User`, `ProfileImage`, `BackgroundImage`
- **Interfaces**: `UserRepository`, `ImageRepository`, `AuthService`, `EmailService`
- **Regras de Negócio**: Validações e comportamentos das entidades

### Application (Aplicação)
- **DTOs**: Objetos de transferência de dados
- **Use Cases**: Orquestração das operações de negócio
- **Validações**: Regras de validação isoladas

### Infrastructure (Infraestrutura)
- **Supabase Client**: Cliente para comunicação com Supabase
- **Repositórios**: Implementações concretas dos repositórios
- **Serviços**: Implementações concretas dos serviços

### Interfaces (Interfaces)
- **Handlers**: Controllers REST usando Gin
- **Middleware**: Middlewares de autenticação e autorização

## Fluxo de Dados

1. **Request** → Handler
2. **Handler** → Use Case
3. **Use Case** → Domain Services + Repositories
4. **Repository** → Infrastructure (Supabase)
5. **Response** ← Use Case ← Handler

## Benefícios

### Desacoplamento
- Cada camada depende apenas de interfaces
- Mudanças em uma camada não afetam outras
- Fácil substituição de implementações

### Testabilidade
- Use cases podem ser testados sem infraestrutura
- Repositórios podem ser mockados
- Testes unitários isolados

### Manutenibilidade
- Código organizado e previsível
- Responsabilidades bem definidas
- Fácil localização de funcionalidades

### Escalabilidade
- Novos use cases podem ser adicionados facilmente
- Novas interfaces (GraphQL, gRPC) podem ser implementadas
- Novos repositórios podem ser criados

## Como Executar

1. Configure as variáveis de ambiente:
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
JWT_SECRET=your_jwt_secret
PORT=3000
```

2. Execute a aplicação:
```bash
go run cmd/main.go
```

## Testes

Para executar os testes:
```bash
go test ./...
```

## Próximos Passos

1. Implementar testes unitários para use cases
2. Adicionar testes de integração
3. Implementar logging estruturado
4. Adicionar métricas e monitoramento
5. Implementar cache para melhorar performance
6. Adicionar documentação da API (Swagger) 