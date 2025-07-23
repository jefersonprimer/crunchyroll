
# Crunchyroll Streaming Platform

A modern streaming platform built with microservices architecture, featuring video streaming, user management, content management, and blog functionality.

## 🏗️ Architecture Overview

This project follows a microservices architecture with the following components:

- **Main Backend** (Go + GraphQL) - Core streaming API
- **Frontend** (Next.js + React) - User interface
- **User Backend** (Go) - User management service
- **Blog Backend** - Content management and blog functionality
- **CMS** (Vue.js/Vite) - Admin panel
- **Transcoder** - Video processing service

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development)
- Go (for backend development)

### Running the Project

```bash
# Start all services
docker-compose up --build
```

### Service Ports

| Service | Port | Description |
|---------|------|-------------|
| Main Backend | 8000 | GraphQL API |
| User Backend | 8002 | User management |
| Blog Backend | 8001 | Blog/CMS API |
| Frontend | 3000 | Main application |
| CMS | 3001 | Admin panel |

## 📁 Project Structure

```
.
├── backend/           # Main Go backend with GraphQL
│   ├── auth/          # Authentication logic
│   ├── config/        # Configuration management
│   ├── graphql/       # GraphQL schema and resolvers
│   ├── models/        # Data models
│   ├── supabase/      # Supabase integration
│   └── main.go        # Application entry point
├── backend-blog/      # Blog service
├── backend-user/      # User management service
├── frontend/          # Next.js React application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── package.json   # Dependencies
├── transcoder/        # Video processing service
└── docker-compose.yml # Container orchestration
```

## 🛠️ Technology Stack

### Backend
- **Go** - High-performance backend services
- **GraphQL** - Efficient API layer
- **Supabase** - Database and authentication
- **JWT** - Token-based authentication
- **Zap** - Structured logging

### Frontend
- **Next.js 15** - React framework with SSR
- **React 19** - UI library
- **TypeScript** - Type safety
- **Apollo Client** - GraphQL client
- **Tailwind CSS** - Utility-first styling
- **Video.js** - Video player
- **Swiper** - Touch slider

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 🔧 Development

### Backend Development

```bash
# Navigate to backend directory
cd backend

# Install dependencies
go mod tidy

# Run locally
go run main.go
```

### Frontend Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Generate GraphQL types
npm run codegen
```

## 🔐 Environment Setup

Create `.env` files in the backend directories with the following variables:

```env
# Backend .env
JWT_SECRET=your_jwt_secret
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PORT=8000
```

## 📊 Features

### Core Features
- 🎥 Video streaming with multiple quality options
- 👤 User authentication and profiles
- 📱 Responsive design for all devices
- 🌐 Multi-language support
- 🔍 Content search and discovery
- 📝 Blog and content management

### Technical Features
- GraphQL API for efficient data fetching
- Microservices architecture for scalability
- Container-based deployment
- Real-time video transcoding
- JWT-based authentication
- CORS-enabled API

## 🚀 Deployment

### Production Deployment

```bash
# Build and start production containers
docker-compose -f docker-compose.prod.yml up --build -d
```

### Environment Variables

Ensure all required environment variables are set in production:
- Database credentials
- JWT secrets
- API keys
- Service URLs

## 🧪 Testing

```bash
# Run backend tests
cd backend && go test ./...

# Run frontend tests
cd frontend && npm test

# Run linting
cd frontend && npm run lint
```

## 📚 API Documentation

The GraphQL API is self-documenting. Access the GraphQL playground at:
- Development: `http://localhost:8000/graphql`
- Production: `https://your-domain.com/graphql`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check existing issues
2. Create a new issue with detailed description
3. Include logs and environment details

## 🔄 Version History

- **v1.0.0** - Initial release with core streaming functionality
- **v1.1.0** - Added blog and CMS features
- **v1.2.0** - Enhanced user management and authentication
