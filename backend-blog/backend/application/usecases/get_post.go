package usecases

import (
	"backend-blog/backend/application/dto"
	"backend-blog/backend/domain/repositories"
)

type GetPostUseCase struct {
	postRepository repositories.PostRepository
}

func NewGetPostUseCase(postRepository repositories.PostRepository) *GetPostUseCase {
	return &GetPostUseCase{
		postRepository: postRepository,
	}
}

func (uc *GetPostUseCase) ExecuteByID(id string) (*dto.PostResponse, error) {
	post, err := uc.postRepository.GetByID(id)
	if err != nil {
		return nil, err
	}

	return &dto.PostResponse{
		ID:         post.ID,
		Title:      post.Title,
		Summary:    post.Summary,
		Content:    post.Content,
		CoverImage: post.CoverImage,
		Tags:       post.Tags,
		Category:   post.Category,
		Slug:       post.Slug,
		CreatedAt:  post.CreatedAt,
		UpdatedAt:  post.UpdatedAt,
		Author: dto.Author{
			Name:  post.Author.Name,
			Image: post.Author.Image,
			Role:  post.Author.Role,
		},
		ReadTime: post.ReadTime,
	}, nil
}

func (uc *GetPostUseCase) ExecuteBySlug(category, year, month, day, slug string) (*dto.PostResponse, error) {
	post, err := uc.postRepository.GetBySlug(category, year, month, day, slug)
	if err != nil {
		return nil, err
	}

	return &dto.PostResponse{
		ID:         post.ID,
		Title:      post.Title,
		Summary:    post.Summary,
		Content:    post.Content,
		CoverImage: post.CoverImage,
		Tags:       post.Tags,
		Category:   post.Category,
		Slug:       post.Slug,
		CreatedAt:  post.CreatedAt,
		UpdatedAt:  post.UpdatedAt,
		Author: dto.Author{
			Name:  post.Author.Name,
			Image: post.Author.Image,
			Role:  post.Author.Role,
		},
		ReadTime: post.ReadTime,
	}, nil
}
