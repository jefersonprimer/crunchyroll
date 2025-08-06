package usecases

import (
	"backend-blog/backend/domain/repositories"
)

type DeletePostUseCase struct {
	postRepository repositories.PostRepository
}

func NewDeletePostUseCase(postRepository repositories.PostRepository) *DeletePostUseCase {
	return &DeletePostUseCase{
		postRepository: postRepository,
	}
}

func (uc *DeletePostUseCase) Execute(id string) error {
	return uc.postRepository.Delete(id)
}
