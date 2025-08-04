package repositories

import "backend-user/internal/domain/entities"

// UserRepository define as operações que podem ser realizadas com usuários
type UserRepository interface {
	// Create cria um novo usuário
	Create(user *entities.User) error

	// GetByID busca um usuário pelo ID
	GetByID(id string) (*entities.User, error)

	// GetByEmail busca um usuário pelo email
	GetByEmail(email string) (*entities.User, error)

	// GetByUsername busca um usuário pelo username
	GetByUsername(username string) (*entities.User, error)

	// Update atualiza um usuário existente
	Update(user *entities.User) error

	// Delete remove um usuário
	Delete(id string) error

	// ExistsByEmail verifica se existe um usuário com o email fornecido
	ExistsByEmail(email string) (bool, error)

	// ExistsByUsername verifica se existe um usuário com o username fornecido
	ExistsByUsername(username string) (bool, error)
}
