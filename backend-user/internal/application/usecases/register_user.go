package usecases

import (
	"errors"

	"backend-user/internal/application/dto"
	"backend-user/internal/domain/entities"
	"backend-user/internal/domain/repositories"
	"backend-user/internal/domain/services"
	"backend-user/internal/validation"
)

// RegisterUserUseCase implementa o caso de uso de registro de usuário
type RegisterUserUseCase struct {
	userRepo    repositories.UserRepository
	authService services.AuthService
	validator   validation.Validator
}

// NewRegisterUserUseCase cria uma nova instância do use case
func NewRegisterUserUseCase(
	userRepo repositories.UserRepository,
	authService services.AuthService,
	validator validation.Validator,
) *RegisterUserUseCase {
	return &RegisterUserUseCase{
		userRepo:    userRepo,
		authService: authService,
		validator:   validator,
	}
}

// Execute executa o caso de uso de registro
func (uc *RegisterUserUseCase) Execute(req *dto.RegisterRequest) (*dto.RegisterResponse, error) {
	// Validar dados de entrada
	if err := uc.validator.ValidateEmail(req.Email); err != nil {
		return nil, err
	}
	if err := uc.validator.ValidatePassword(req.Password); err != nil {
		return nil, err
	}
	if err := uc.validator.ValidateUsername(req.Username); err != nil {
		return nil, err
	}

	// Verificar se o email já existe
	exists, err := uc.userRepo.ExistsByEmail(req.Email)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, errors.New("email already exists")
	}

	// Verificar se o username já existe
	exists, err = uc.userRepo.ExistsByUsername(req.Username)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, errors.New("username already exists")
	}

	// Gerar hash da senha
	passwordHash, err := uc.authService.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}

	// Criar usuário
	user := entities.NewUser(req.Email, req.Username, req.DisplayName, passwordHash)

	// Salvar no repositório
	if err := uc.userRepo.Create(user); err != nil {
		return nil, err
	}

	// Gerar token
	token, err := uc.authService.GenerateToken(user)
	if err != nil {
		return nil, err
	}

	// Retornar resposta
	return &dto.RegisterResponse{
		User:  uc.toUserResponse(user),
		Token: token,
	}, nil
}

// toUserResponse converte a entidade User para UserResponse
func (uc *RegisterUserUseCase) toUserResponse(user *entities.User) *dto.UserResponse {
	return &dto.UserResponse{
		ID:                 user.ID,
		Email:              user.Email,
		Username:           user.Username,
		DisplayName:        user.DisplayName,
		ProfileImageURL:    user.ProfileImageURL,
		BackgroundImageURL: user.BackgroundImageURL,
		CreatedAt:          user.CreatedAt.Format("2006-01-02T15:04:05.999999"),
		LastLoginAt:        user.LastLoginAt.Format("2006-01-02T15:04:05.999999"),
	}
}
