# Backend Blog - Clean Architecture

Backend do sistema de blog construído em Go seguindo os princípios da Clean Architecture.

## 🚀 Melhorias Implementadas

### ✅ Correções Realizadas
- **Remoção de pasta não utilizada**: Pasta `infra/services` vazia foi removida
- **Eliminação de duplicação**: Validação duplicada na entidade Post foi otimizada
- **Middleware CORS otimizado**: Removida duplicação de CORS entre middleware e main.go
- **Tratamento de erros centralizado**: Implementado middleware de tratamento de erros padronizado
- **Respostas de erro estruturadas**: Todas as respostas de erro agora seguem um padrão consistente

### 🆕 Novas Funcionalidades
- **Documentação da API**: Criado arquivo `API.md` com documentação completa dos endpoints
- **Middleware de recuperação de panics**: Sistema robusto de tratamento de erros
- **Logs estruturados**: Melhor rastreamento de requisições e erros
- **Validação melhorada**: Sistema de validação mais robusto e consistente

## Estrutura do Projeto

```
backend/
├── domain/           # Entidades e regras de negócio
│   ├── entities/     # Entidades do domínio
│   ├── repositories/ # Interfaces dos repositórios
│   └── services/     # Serviços do domínio
├── application/      # Casos de uso
│   ├── usecases/     # Implementação dos casos de uso
│   └── dto/          # Data Transfer Objects
├── presentation/     # Camada de apresentação
│   ├── handlers/     # Handlers HTTP
│   └── middleware/   # Middlewares (Logging, Error Handling)
├── infra/           # Infraestrutura
│   ├── config/      # Configurações
│   ├── database/    # Configuração do banco
│   ├── repositories/# Implementações dos repositórios
│   └── container/   # Container de dependências
├── validation/      # Validações
├── API.md          # Documentação da API
└── README.md       # Este arquivo
```

## Configuração

1. **Instale as dependências:**
```bash
go mod tidy
```

2. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:
```env
# Configurações do Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key

# Configurações da aplicação
PORT=8080
ENV=development
LOG_LEVEL=info
```

3. **Execute o projeto:**
```bash
go run main.go
```

O servidor estará disponível em `http://localhost:8080`

## Endpoints da API

### Posts
- `GET /api/posts` - Lista todos os posts
- `POST /api/posts` - Cria um novo post
- `GET /api/posts/{id}` - Busca post por ID
- `PATCH /api/posts/{id}` - Atualiza um post
- `DELETE /api/posts/{id}` - Remove um post
- `GET /api/posts/{category}/{year}/{month}/{day}/{slug}` - Busca post por slug

> 📖 **Documentação Completa**: Consulte o arquivo [API.md](./API.md) para documentação detalhada com exemplos de requisição e resposta.

## Princípios da Clean Architecture

Este projeto segue os princípios da Clean Architecture:

1. **Independência de Frameworks**: O código não depende de frameworks externos
2. **Testabilidade**: As regras de negócio podem ser testadas sem dependências externas
3. **Independência de UI**: A interface pode mudar facilmente sem afetar o resto do sistema
4. **Independência de Banco de Dados**: As regras de negócio não dependem do banco de dados
5. **Independência de Agentes Externos**: As regras de negócio não conhecem o mundo exterior

## Tecnologias Utilizadas

- **Go 1.24+** - Linguagem principal
- **Gorilla Mux** - Router HTTP
- **Supabase** - Banco de dados e autenticação
- **Validator** - Validação de dados
- **CORS** - Cross-Origin Resource Sharing
- **UUID** - Geração de identificadores únicos

## Desenvolvimento

### Adicionando novos endpoints

1. Crie o caso de uso em `application/usecases/`
2. Implemente o handler em `presentation/handlers/`
3. Adicione a rota no `main.go`
4. Configure a injeção de dependência no container
5. Atualize a documentação em `API.md`

### Tratamento de Erros

O projeto utiliza um sistema centralizado de tratamento de erros:

- **Middleware de Erro**: Captura panics e erros não tratados
- **Respostas Padronizadas**: Todas as respostas de erro seguem o mesmo formato
- **Logs Estruturados**: Rastreamento completo de requisições e erros

### Validação

- **Campos Obrigatórios**: Validados automaticamente via tags `validate`
- **Validação de Domínio**: Regras de negócio validadas nos serviços
- **Respostas Consistentes**: Erros de validação retornam formato padronizado

### Estrutura de um caso de uso

```go
type CreatePostUseCase struct {
    repository domain.PostRepository
    service    domain.PostService
}

func (uc *CreatePostUseCase) Execute(input *dto.CreatePostInput) (*dto.CreatePostOutput, error) {
    // Implementação do caso de uso
}
```

## Testes

Para executar os testes:
```bash
go test ./...
```

### Cobertura de Testes
```bash
go test -cover ./...
```

### Testes de Integração
```bash
# Execute o servidor em modo de teste
ENV=test go run main.go
```

## Deploy

O projeto inclui um Dockerfile para containerização:

```bash
docker build -t backend-blog .
docker run -p 8080:8080 backend-blog
```

### Docker Compose

Para desenvolvimento com Docker Compose:

```bash
docker-compose up -d
```

### Variáveis de Ambiente para Produção

```env
ENV=production
LOG_LEVEL=warn
PORT=8080
SUPABASE_URL=https://your-production-project.supabase.co
SUPABASE_KEY=your-production-supabase-key
```

## 📋 Checklist de Qualidade

### ✅ Implementado
- [x] Clean Architecture bem estruturada
- [x] Tratamento centralizado de erros
- [x] Validação robusta de dados
- [x] Documentação completa da API
- [x] Logs estruturados
- [x] Middleware de recuperação de panics
- [x] Respostas de erro padronizadas
- [x] Configuração flexível via variáveis de ambiente
- [x] Containerização com Docker
- [x] CORS configurado adequadamente

### 🔄 Próximas Melhorias Sugeridas
- [ ] Implementar autenticação JWT
- [ ] Adicionar rate limiting
- [ ] Implementar cache com Redis
- [ ] Adicionar métricas e monitoramento
- [ ] Implementar testes de integração
- [ ] Adicionar documentação Swagger/OpenAPI
- [ ] Implementar versionamento da API
- [ ] Adicionar health checks

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 