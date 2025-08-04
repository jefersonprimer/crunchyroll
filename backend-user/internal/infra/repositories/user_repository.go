package repositories

import (
	"encoding/json"

	"backend-user/internal/domain/entities"
	"backend-user/internal/infra/supabase"
)

// UserRepository implementa a interface do repositório de usuários
type UserRepository struct {
	client *supabase.Client
}

// NewUserRepository cria uma nova instância do repositório
func NewUserRepository(client *supabase.Client) *UserRepository {
	return &UserRepository{
		client: client,
	}
}

// Create cria um novo usuário
func (r *UserRepository) Create(user *entities.User) error {
	// Converter para o formato do Supabase
	userData := map[string]interface{}{
		"email":         user.Email,
		"username":      user.Username,
		"display_name":  user.DisplayName,
		"password_hash": user.PasswordHash,
		"created_at":    user.CreatedAt,
	}

	_, _, err := r.client.From("users").Insert(userData, false, "", "", "").Execute()
	if err != nil {
		return err
	}

	return nil
}

// GetByID busca um usuário pelo ID
func (r *UserRepository) GetByID(id string) (*entities.User, error) {
	var user entities.User

	data, _, err := r.client.From("users").Select("*", "", false).Eq("id", id).Single().Execute()
	if err != nil {
		return nil, supabase.ErrUserNotFound
	}

	if err := json.Unmarshal(data, &user); err != nil {
		return nil, err
	}

	return &user, nil
}

// GetByEmail busca um usuário pelo email
func (r *UserRepository) GetByEmail(email string) (*entities.User, error) {
	var user entities.User

	data, _, err := r.client.From("users").Select("*", "", false).Eq("email", email).Single().Execute()
	if err != nil {
		return nil, supabase.ErrUserNotFound
	}

	if err := json.Unmarshal(data, &user); err != nil {
		return nil, err
	}

	return &user, nil
}

// GetByUsername busca um usuário pelo username
func (r *UserRepository) GetByUsername(username string) (*entities.User, error) {
	var user entities.User

	data, _, err := r.client.From("users").Select("*", "", false).Eq("username", username).Single().Execute()
	if err != nil {
		return nil, supabase.ErrUserNotFound
	}

	if err := json.Unmarshal(data, &user); err != nil {
		return nil, err
	}

	return &user, nil
}

// Update atualiza um usuário existente
func (r *UserRepository) Update(user *entities.User) error {
	userData := map[string]interface{}{
		"display_name":         user.DisplayName,
		"profile_image_url":    user.ProfileImageURL,
		"background_image_url": user.BackgroundImageURL,
		"last_login_at":        user.LastLoginAt,
		"password_hash":        user.PasswordHash,
	}

	_, _, err := r.client.From("users").Update(userData, "", "").Eq("id", user.ID).Execute()
	return err
}

// Delete remove um usuário
func (r *UserRepository) Delete(id string) error {
	_, _, err := r.client.From("users").Delete("", "").Eq("id", id).Execute()
	return err
}

// ExistsByEmail verifica se existe um usuário com o email fornecido
func (r *UserRepository) ExistsByEmail(email string) (bool, error) {
	data, _, err := r.client.From("users").Select("id", "", false).Eq("email", email).Execute()
	if err != nil {
		return false, err
	}

	return len(data) > 0, nil
}

// ExistsByUsername verifica se existe um usuário com o username fornecido
func (r *UserRepository) ExistsByUsername(username string) (bool, error) {
	data, _, err := r.client.From("users").Select("id", "", false).Eq("username", username).Execute()
	if err != nil {
		return false, err
	}

	return len(data) > 0, nil
}
