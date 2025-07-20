# Blog CMS

Um CMS simples para gerenciamento de posts de blog, construído com Go (backend) e Vue.js (frontend).

## Requisitos

- Go 1.21+
- Node.js 18+
- MongoDB

## Configuração

### Backend

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
go mod tidy
```

3. Inicie o servidor:
```bash
go run main.go
```

O servidor estará rodando em `http://localhost:8080`

### Frontend

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173/admin`

## Como Usar

### Criar um Post

1. Acesse `http://localhost:5173/admin/posts`
2. Clique no botão "New Post"
3. Preencha os campos:
   - Título
   - Resumo
   - URL da imagem de capa
   - Conteúdo
   - Tags (pressione Enter para adicionar cada tag)
4. Use a barra de ferramentas para inserir:
   - Imagens
   - Imagens do Unsplash
   - Vídeos
   - Embeds
   - Blocos de código
   - Novas seções
5. Clique em "Save Post"

### Editar um Post

1. Acesse `http://localhost:5173/admin/posts`
2. Encontre o post desejado
3. Clique no botão "Edit"
4. Modifique os campos necessários
5. Clique em "Save Post"

### Apagar um Post

1. Acesse `http://localhost:5173/admin/posts`
2. Encontre o post desejado
3. Clique no botão "Delete"
4. Confirme a exclusão

## Recursos

- Editor rico com suporte a:
  - Imagens (URL direta ou Unsplash)
  - Vídeos
  - Embeds
  - Blocos de código
  - Tags
- Cálculo automático de tempo de leitura
- Preview de imagens
- Interface responsiva
- Gerenciamento de tags
- Informações do autor 