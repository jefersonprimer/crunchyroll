package services

import (
	"backend-blog/backend/domain/entities"
	"errors"
	"regexp"
	"strings"
)

type PostServiceImpl struct{}

func NewPostServiceImpl() *PostServiceImpl {
	return &PostServiceImpl{}
}

func (s *PostServiceImpl) ValidatePost(post *entities.Post) error {
	if post.Title == "" {
		return errors.New("title is required")
	}
	if post.Content == "" {
		return errors.New("content is required")
	}
	if post.Category == "" {
		return errors.New("category is required")
	}
	return nil
}

func (s *PostServiceImpl) CalculateReadTime(content string) int {
	words := strings.Fields(content)
	wordsPerMinute := 200
	readTime := len(words) / wordsPerMinute
	if readTime < 1 {
		readTime = 1
	}
	return readTime
}

func (s *PostServiceImpl) GenerateSlug(title string) string {
	lowercase := strings.ToLower(title)
	reg := regexp.MustCompile("[^a-z0-9]+")
	slug := reg.ReplaceAllString(lowercase, "-")
	slug = strings.Trim(slug, "-")
	return slug
}
