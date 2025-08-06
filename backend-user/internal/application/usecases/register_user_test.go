package usecases

import (
	"errors"
	"testing"

	"backend-user/internal/application/dto"
	"backend-user/internal/domain/entities"
	"backend-user/internal/validation"
)

// MockUserRepository é um mock do repositório de usuários
type MockUserRepository struct {
	users map[string]*entities.User
}

func NewMockUserRepository() *MockUserRepository {
	return &MockUserRepository{
		users: make(map[string]*entities.User),
	}
}

func (m *MockUserRepository) Create(user *entities.User) error {
	if m.users[user.Email] != nil {
		return errors.New("user already exists")
	}
	m.users[user.Email] = user
	return nil
}

func (m *MockUserRepository) GetByID(id string) (*entities.User, error) {
	for _, user := range m.users {
		if user.ID == id {
			return user, nil
		}
	}
	return nil, errors.New("user not found")
}

func (m *MockUserRepository) GetByEmail(email string) (*entities.User, error) {
	user, exists := m.users[email]
	if !exists {
		return nil, errors.New("user not found")
	}
	return user, nil
}

func (m *MockUserRepository) GetByUsername(username string) (*entities.User, error) {
	for _, user := range m.users {
		if user.Username == username {
			return user, nil
		}
	}
	return nil, errors.New("user not found")
}

func (m *MockUserRepository) Update(user *entities.User) error {
	if m.users[user.Email] == nil {
		return errors.New("user not found")
	}
	m.users[user.Email] = user
	return nil
}

func (m *MockUserRepository) Delete(id string) error {
	for email, user := range m.users {
		if user.ID == id {
			delete(m.users, email)
			return nil
		}
	}
	return errors.New("user not found")
}

func (m *MockUserRepository) ExistsByEmail(email string) (bool, error) {
	_, exists := m.users[email]
	return exists, nil
}

func (m *MockUserRepository) ExistsByUsername(username string) (bool, error) {
	for _, user := range m.users {
		if user.Username == username {
			return true, nil
		}
	}
	return false, nil
}

// MockAuthService é um mock do serviço de autenticação
type MockAuthService struct{}

func (m *MockAuthService) HashPassword(password string) (string, error) {
	return "hashed_" + password, nil
}

func (m *MockAuthService) ComparePassword(password, hash string) error {
	if "hashed_"+password == hash {
		return nil
	}
	return errors.New("invalid password")
}

func (m *MockAuthService) GenerateToken(user *entities.User) (string, error) {
	return "token_" + user.ID, nil
}

func (m *MockAuthService) ValidateToken(token string) (string, error) {
	if len(token) > 6 && token[:6] == "token_" {
		return token[6:], nil
	}
	return "", errors.New("invalid token")
}

func (m *MockAuthService) GenerateResetToken(userID, email string) (string, error) {
	return "reset_token_" + userID + "_" + email, nil
}

func (m *MockAuthService) ValidateResetToken(token string) (string, error) {
	if len(token) > 11 && token[:11] == "reset_token_" {
		return token[11:], nil
	}
	return "", errors.New("invalid reset token")
}

func (m *MockAuthService) ValidateResetCode(userID, email, code string) error {
	if code == "valid_code" {
		return nil
	}
	return errors.New("invalid reset code")
}

func TestRegisterUserUseCase_Execute(t *testing.T) {
	tests := []struct {
		name          string
		request       *dto.RegisterRequest
		setupMocks    func(*MockUserRepository)
		expectedError string
	}{
		{
			name: "successful registration",
			request: &dto.RegisterRequest{
				Email:       "test@example.com",
				Username:    "testuser",
				DisplayName: "Test User",
				Password:    "password123",
			},
			setupMocks: func(repo *MockUserRepository) {
				// Não há setup necessário para sucesso
			},
			expectedError: "",
		},
		{
			name: "email already exists",
			request: &dto.RegisterRequest{
				Email:       "existing@example.com",
				Username:    "newuser",
				DisplayName: "New User",
				Password:    "password123",
			},
			setupMocks: func(repo *MockUserRepository) {
				existingUser := entities.NewUser("existing@example.com", "existinguser", "Existing User", "hash")
				repo.users["existing@example.com"] = existingUser
			},
			expectedError: "email already exists",
		},
		{
			name: "username already exists",
			request: &dto.RegisterRequest{
				Email:       "new@example.com",
				Username:    "existinguser",
				DisplayName: "New User",
				Password:    "password123",
			},
			setupMocks: func(repo *MockUserRepository) {
				existingUser := entities.NewUser("existing@example.com", "existinguser", "Existing User", "hash")
				repo.users["existing@example.com"] = existingUser
			},
			expectedError: "username already exists",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Setup
			userRepo := NewMockUserRepository()
			authService := &MockAuthService{}
			validator := validation.NewValidator()

			tt.setupMocks(userRepo)

			useCase := NewRegisterUserUseCase(userRepo, authService, validator)

			// Execute
			response, err := useCase.Execute(tt.request)

			// Assert
			if tt.expectedError != "" {
				if err == nil {
					t.Errorf("Expected error '%s', but got none", tt.expectedError)
				} else if err.Error() != tt.expectedError {
					t.Errorf("Expected error '%s', but got '%s'", tt.expectedError, err.Error())
				}
			} else {
				if err != nil {
					t.Errorf("Expected no error, but got '%s'", err.Error())
				}
				if response == nil {
					t.Error("Expected response, but got nil")
				}
				if response.User == nil {
					t.Error("Expected user in response, but got nil")
				}
				if response.Token == "" {
					t.Error("Expected token in response, but got empty string")
				}
			}
		})
	}
}
