package handlers

import (
	"encoding/json"
	"net/http"

	"backend-blog/backend/application/dto"
	"backend-blog/backend/application/usecases"
	"backend-blog/backend/presentation/middleware"
	"backend-blog/backend/validation"

	"github.com/gorilla/mux"
)

type PostHandler struct {
	createPostUseCase *usecases.CreatePostUseCase
	getPostUseCase    *usecases.GetPostUseCase
	getPostsUseCase   *usecases.GetPostsUseCase
	updatePostUseCase *usecases.UpdatePostUseCase
	deletePostUseCase *usecases.DeletePostUseCase
	validator         validation.Validator
}

func NewPostHandler(
	createPostUseCase *usecases.CreatePostUseCase,
	getPostUseCase *usecases.GetPostUseCase,
	getPostsUseCase *usecases.GetPostsUseCase,
	updatePostUseCase *usecases.UpdatePostUseCase,
	deletePostUseCase *usecases.DeletePostUseCase,
	validator validation.Validator,
) *PostHandler {
	return &PostHandler{
		createPostUseCase: createPostUseCase,
		getPostUseCase:    getPostUseCase,
		getPostsUseCase:   getPostsUseCase,
		updatePostUseCase: updatePostUseCase,
		deletePostUseCase: deletePostUseCase,
		validator:         validator,
	}
}

func (h *PostHandler) GetPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := h.getPostsUseCase.Execute()
	if err != nil {
		middleware.RespondWithError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

func (h *PostHandler) GetPost(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	post, err := h.getPostUseCase.ExecuteByID(id)
	if err != nil {
		middleware.RespondWithError(w, err.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
}

func (h *PostHandler) CreatePost(w http.ResponseWriter, r *http.Request) {
	var request dto.CreatePostRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		middleware.RespondWithError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validate request
	if err := h.validator.Validate(request); err != nil {
		middleware.RespondWithError(w, err.Error(), http.StatusBadRequest)
		return
	}

	post, err := h.createPostUseCase.Execute(request)
	if err != nil {
		middleware.RespondWithError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(post)
}

func (h *PostHandler) UpdatePost(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var request dto.UpdatePostRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		middleware.RespondWithError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	post, err := h.updatePostUseCase.Execute(id, request)
	if err != nil {
		middleware.RespondWithError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
}

func (h *PostHandler) DeletePost(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	err := h.deletePostUseCase.Execute(id)
	if err != nil {
		middleware.RespondWithError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *PostHandler) GetPostBySlug(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	category := params["category"]
	year := params["year"]
	month := params["month"]
	day := params["day"]
	slug := params["slug"]

	post, err := h.getPostUseCase.ExecuteBySlug(category, year, month, day, slug)
	if err != nil {
		middleware.RespondWithError(w, err.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
}
