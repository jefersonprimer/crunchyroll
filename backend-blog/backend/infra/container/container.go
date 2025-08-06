package container

import (
	"backend-blog/backend/application/usecases"
	"backend-blog/backend/domain/services"
	"backend-blog/backend/infra/database"
	infraRepositories "backend-blog/backend/infra/repositories"
	"backend-blog/backend/presentation/handlers"
	"backend-blog/backend/validation"
)

type Container struct {
	PostHandler *handlers.PostHandler
}

func NewContainer() *Container {
	// Initialize infrastructure
	database.InitSupabase()

	// Initialize repositories
	postRepository := infraRepositories.NewSupabasePostRepository()

	// Initialize services
	postService := services.NewPostServiceImpl()

	// Initialize validator
	validator := validation.NewValidatorImpl()

	// Initialize use cases
	createPostUseCase := usecases.NewCreatePostUseCase(postRepository, postService)
	getPostUseCase := usecases.NewGetPostUseCase(postRepository)
	getPostsUseCase := usecases.NewGetPostsUseCase(postRepository)
	updatePostUseCase := usecases.NewUpdatePostUseCase(postRepository, postService)
	deletePostUseCase := usecases.NewDeletePostUseCase(postRepository)

	// Initialize handlers
	postHandler := handlers.NewPostHandler(
		createPostUseCase,
		getPostUseCase,
		getPostsUseCase,
		updatePostUseCase,
		deletePostUseCase,
		validator,
	)

	return &Container{
		PostHandler: postHandler,
	}
}
