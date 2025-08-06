package infraRepositories

import (
	"encoding/json"
	"fmt"
	"net/http"

	"backend-blog/backend/domain/entities"
	"backend-blog/backend/infra/database"
)

type SupabasePostRepository struct{}

func NewSupabasePostRepository() *SupabasePostRepository {
	return &SupabasePostRepository{}
}

func (r *SupabasePostRepository) GetAll() ([]entities.Post, error) {
	resp, err := database.MakeRequest("GET", "/posts", nil)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("erro ao buscar posts: %d", resp.StatusCode)
	}

	var posts []entities.Post
	if err := json.NewDecoder(resp.Body).Decode(&posts); err != nil {
		return nil, err
	}

	return posts, nil
}

func (r *SupabasePostRepository) GetByID(id string) (*entities.Post, error) {
	resp, err := database.MakeRequest("GET", "/posts?id=eq."+id, nil)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("post não encontrado: %d", resp.StatusCode)
	}

	var posts []entities.Post
	if err := json.NewDecoder(resp.Body).Decode(&posts); err != nil {
		return nil, err
	}

	if len(posts) == 0 {
		return nil, fmt.Errorf("post não encontrado")
	}

	return &posts[0], nil
}

func (r *SupabasePostRepository) GetBySlug(category, year, month, day, slug string) (*entities.Post, error) {
	path := fmt.Sprintf("/posts?category=eq.%s&slug=eq.%s", category, slug)
	resp, err := database.MakeRequest("GET", path, nil)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("post não encontrado: %d", resp.StatusCode)
	}

	var posts []entities.Post
	if err := json.NewDecoder(resp.Body).Decode(&posts); err != nil {
		return nil, err
	}

	if len(posts) == 0 {
		return nil, fmt.Errorf("post não encontrado")
	}

	return &posts[0], nil
}

func (r *SupabasePostRepository) Create(post *entities.Post) error {
	resp, err := database.MakeRequest("POST", "/posts", post)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
		return fmt.Errorf("erro ao criar post: %d", resp.StatusCode)
	}

	return nil
}

func (r *SupabasePostRepository) Update(post *entities.Post) error {
	resp, err := database.MakeRequest("PATCH", "/posts?id=eq."+post.ID, post)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("erro ao atualizar post: %d", resp.StatusCode)
	}

	return nil
}

func (r *SupabasePostRepository) Delete(id string) error {
	resp, err := database.MakeRequest("DELETE", "/posts?id=eq."+id, nil)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusNoContent {
		return fmt.Errorf("erro ao deletar post: %d", resp.StatusCode)
	}

	return nil
}
