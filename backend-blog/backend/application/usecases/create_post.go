package usecases

import (
	"backend-blog/backend/application/dto"
	"backend-blog/backend/domain/entities"
	"backend-blog/backend/domain/repositories"
	"backend-blog/backend/domain/services"
	"time"

	"github.com/google/uuid"
)

type CreatePostUseCase struct {
	postRepository repositories.PostRepository
	postService    services.PostService
}

func NewCreatePostUseCase(postRepository repositories.PostRepository, postService services.PostService) *CreatePostUseCase {
	return &CreatePostUseCase{
		postRepository: postRepository,
		postService:    postService,
	}
}

func (uc *CreatePostUseCase) Execute(request dto.CreatePostRequest) (*dto.PostResponse, error) {
	post := &entities.Post{
		ID:         uuid.New().String(),
		Title:      request.Title,
		Summary:    request.Summary,
		Content:    request.Content,
		CoverImage: request.CoverImage,
		Tags:       request.Tags,
		Category:   request.Category,
		Slug:       uc.postService.GenerateSlug(request.Title),
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
		Author: entities.Author{
			Name:  request.Author.Name,
			Image: request.Author.Image,
			Role:  request.Author.Role,
		},
		ReadTime: uc.postService.CalculateReadTime(request.Content),
	}

	if err := uc.postService.ValidatePost(post); err != nil {
		return nil, err
	}

	if err := uc.postRepository.Create(post); err != nil {
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
