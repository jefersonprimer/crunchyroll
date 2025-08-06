# User Authentication and Profile Management API (Go)

This is a backend API for user authentication and profile management using Go with the Gin framework and Supabase.

## Prerequisites

- Go 1.21 or later
- Supabase account and project
- Git

## Dependencies

- Gin Web Framework
- Supabase Go Client (v0.0.4)
- JWT for authentication
- Bcrypt for password hashing

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd backend-user
```

2. Install dependencies:
```bash
go mod download
```

3. Create a `.env` file in the root directory with the following variables:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Set up your Supabase database with the following tables:

### Users Table
```sql
create table users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  username text unique not null,
  display_name text not null,
  password_hash text not null,
  profile_image_url text,
  background_image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_login_at timestamp with time zone
);
```

### Profile Images Table
```sql
create table profile_images (
  id uuid default uuid_generate_v4() primary key,
  anime_name text not null,
  image_url text not null
);
```

### Background Images Table
```sql
create table background_images (
  id uuid default uuid_generate_v4() primary key,
  anime_name text not null,
  image_url text not null
);
```

5. Run the server:
```bash
go run cmd/main.go
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "username": "username",
    "display_name": "Display Name"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "username",
      "display_name": "Display Name",
      "profile_image_url": null,
      "background_image_url": null,
      "created_at": "timestamp"
    }
  }
  ```

#### Login
- **POST** `/api/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "username",
      "display_name": "Display Name",
      "profile_image_url": "url",
      "background_image_url": "url",
      "created_at": "timestamp",
      "last_login_at": "timestamp"
    }
  }
  ```

### Profile Management

#### Get Profile Images
- **GET** `/api/profile-images`
- **Headers:** None required
- **Response:**
  ```json
  [
    {
      "id": "uuid",
      "anime_name": "Naruto",
      "image_url": "https://example.com/image.jpg"
    }
  ]
  ```

#### Get Background Images
- **GET** `/api/background-images`
- **Headers:** None required
- **Response:**
  ```json
  [
    {
      "id": "uuid",
      "anime_name": "Naruto",
      "image_url": "https://example.com/image.jpg"
    }
  ]
  ```

#### Get User Profile
- **GET** `/api/profile`
- **Headers:**
  ```
  Authorization: Bearer jwt_token
  ```
- **Response:**
  ```json
  {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "display_name": "Display Name",
    "profile_image_url": "url",
    "background_image_url": "url",
    "created_at": "timestamp",
    "last_login_at": "timestamp"
  }
  ```

#### Update User Profile
- **PUT** `/api/profile`
- **Headers:**
  ```
  Authorization: Bearer jwt_token
  ```
- **Body:**
  ```json
  {
    "display_name": "New Display Name",
    "profile_image_url": "new_profile_image_url",
    "background_image_url": "new_background_image_url"
  }
  ```
- **Response:**
  ```json
  {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "display_name": "New Display Name",
    "profile_image_url": "new_profile_image_url",
    "background_image_url": "new_background_image_url",
    "created_at": "timestamp",
    "last_login_at": "timestamp"
  }
  ```

## Error Responses

All endpoints may return the following error responses:

- **400 Bad Request**
  ```json
  {
    "error": "Error message"
  }
  ```

- **401 Unauthorized**
  ```json
  {
    "error": "Access token required"
  }
  ```

- **403 Forbidden**
  ```json
  {
    "error": "Invalid token"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "error": "Error message"
  }
  ```

## Development

### Project Structure
```
.
├── cmd/
│   └── main.go                    # Application entry point
├── internal/
│   ├── application/               # Use Cases and DTOs
│   │   ├── dto/                   # Data Transfer Objects
│   │   └── usecases/              # Business use cases
│   ├── domain/                    # Business logic and entities
│   │   ├── entities/              # Domain entities
│   │   ├── repositories/          # Repository interfaces
│   │   └── services/              # Service interfaces
│   ├── infra/                     # Infrastructure implementations
│   │   ├── repositories/          # Repository implementations
│   │   ├── services/              # Service implementations
│   │   └── supabase/              # Supabase client
│   ├── interfaces/                # Controllers and adapters
│   │   ├── handlers/              # HTTP request handlers
│   │   └── middleware/            # HTTP middlewares
│   └── validation/                # Input validation
├── go.mod                         # Go module file
├── go.sum                         # Go module checksum
└── .env                          # Environment variables
```

### Running Tests
```bash
go test ./...
```

### Building
```bash
go build -o backend-user
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. 