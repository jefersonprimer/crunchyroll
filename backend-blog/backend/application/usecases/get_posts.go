package usecases

import (
	"backend-blog/backend/application/dto"
	"backend-blog/backend/domain/repositories"
)

type GetPostsUseCase struct {
	postRepository repositories.PostRepository
}

func NewGetPostsUseCase(postRepository repositories.PostRepository) *GetPostsUseCase {
	return &GetPostsUseCase{
		postRepository: postRepository,
	}
}

func (uc *GetPostsUseCase) Execute() ([]dto.PostResponse, error) {
	posts, err := uc.postRepository.GetAll()
	if err != nil {
		return nil, err
	}

	var responses []dto.PostResponse
	for _, post := range posts {
		responses = append(responses, dto.PostResponse{
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
		})
	}

	return responses, nil
}
