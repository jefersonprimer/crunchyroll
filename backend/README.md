# Crunchyroll Fullstack

Este é um projeto fullstack que replica algumas funcionalidades do Crunchyroll, utilizando tecnologias modernas tanto no frontend quanto no backend.

## 🚀 Tecnologias Utilizadas

### Backend
- Go (Golang)
- GraphQL
- Supabase
- PostgreSQL

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- GraphQL Code Generator

## 📋 Pré-requisitos

- Go 1.21 ou superior
- Node.js 18 ou superior
- npm ou yarn
- Conta no Supabase

## 🔧 Instalação

### Backend

1. Entre na pasta do backend:
```bash
cd backend-crunchyroll
```

2. Instale as dependências do Go:
```bash
go mod download
```

3. Configure as variáveis de ambiente necessárias (crie um arquivo .env baseado no .env.example)

4. Execute o servidor:
```bash
go run main.go
```

### Frontend

1. Entre na pasta do frontend:
```bash
cd crunchyroll
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente necessárias

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## 🌐 Estrutura do Projeto

```
.
├── backend-crunchyroll/     # Backend em Go
│   ├── config/             # Configurações
│   ├── graphql/            # Schema e resolvers GraphQL
│   ├── models/             # Modelos de dados
│   └── supabase/           # Configuração do Supabase
│
└── crunchyroll/            # Frontend em Next.js
    ├── src/                # Código fonte
    ├── public/             # Arquivos estáticos
    └── ...
```

## 🔑 Funcionalidades

- Autenticação de usuários
- Listagem de animes
- Sistema de favoritos
- Interface responsiva
- Integração com Supabase

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Seu nome - Desenvolvimento inicial

## 🙏 Agradecimentos

- Crunchyroll pela inspiração
- Comunidade open source 