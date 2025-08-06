package usecases

import (
	"backend-blog/backend/application/dto"
	"backend-blog/backend/domain/repositories"
	"backend-blog/backend/domain/services"
	"time"
)

type UpdatePostUseCase struct {
	postRepository repositories.PostRepository
	postService    services.PostService
}

func NewUpdatePostUseCase(postRepository repositories.PostRepository, postService services.PostService) *UpdatePostUseCase {
	return &UpdatePostUseCase{
		postRepository: postRepository,
		postService:    postService,
	}
}

func (uc *UpdatePostUseCase) Execute(id string, request dto.UpdatePostRequest) (*dto.PostResponse, error) {
	existingPost, err := uc.postRepository.GetByID(id)
	if err != nil {
		return nil, err
	}

	if request.Title != "" {
		existingPost.Title = request.Title
		existingPost.Slug = uc.postService.GenerateSlug(request.Title)
	}
	if request.Summary != "" {
		existingPost.Summary = request.Summary
	}
	if request.Content != "" {
		existingPost.Content = request.Content
		existingPost.ReadTime = uc.postService.CalculateReadTime(request.Content)
	}
	if request.CoverImage != "" {
		existingPost.CoverImage = request.CoverImage
	}
	if request.Tags != nil {
		existingPost.Tags = request.Tags
	}
	if request.Category != "" {
		existingPost.Category = request.Category
	}
	if request.Author.Name != "" {
		existingPost.Author.Name = request.Author.Name
	}
	if request.Author.Image != "" {
		existingPost.Author.Image = request.Author.Image
	}
	if request.Author.Role != "" {
		existingPost.Author.Role = request.Author.Role
	}

	existingPost.UpdatedAt = time.Now()

	if err := uc.postService.ValidatePost(existingPost); err != nil {
		return nil, err
	}

	if err := uc.postRepository.Update(existingPost); err != nil {
		return nil, err
	}

	return &dto.PostResponse{
		ID:         existingPost.ID,
		Title:      existingPost.Title,
		Summary:    existingPost.Summary,
		Content:    existingPost.Content,
		CoverImage: existingPost.CoverImage,
		Tags:       existingPost.Tags,
		Category:   existingPost.Category,
		Slug:       existingPost.Slug,
		CreatedAt:  existingPost.CreatedAt,
		UpdatedAt:  existingPost.UpdatedAt,
		Author: dto.Author{
			Name:  existingPost.Author.Name,
			Image: existingPost.Author.Image,
			Role:  existingPost.Author.Role,
		},
		ReadTime: existingPost.ReadTime,
	}, nil
}
