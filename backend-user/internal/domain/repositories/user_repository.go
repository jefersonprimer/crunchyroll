package repositories

import "backend-user/internal/domain/entities"

type UserRepository interface {
	Create(user *entities.User) error

	GetByID(id string) (*entities.User, error)

	GetByEmail(email string) (*entities.User, error)

	GetByUsername(username string) (*entities.User, error)

	Update(user *entities.User) error

	Delete(id string) error

	ExistsByEmail(email string) (bool, error)

	ExistsByUsername(username string) (bool, error)
}
