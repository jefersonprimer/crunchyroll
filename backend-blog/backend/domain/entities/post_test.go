package entities

import (
	"testing"
	"time"
)

func TestPost_IsValid(t *testing.T) {
	tests := []struct {
		name    string
		post    Post
		wantErr bool
	}{
		{
			name: "valid post",
			post: Post{
				ID:        "test-id",
				Title:     "Test Post",
				Summary:   "Test Summary",
				Content:   "Test Content",
				Category:  "tech",
				Slug:      "test-post",
				CreatedAt: time.Now(),
				UpdatedAt: time.Now(),
				ReadTime:  5,
			},
			wantErr: false,
		},
		{
			name: "invalid post - empty title",
			post: Post{
				ID:        "test-id",
				Title:     "",
				Summary:   "Test Summary",
				Content:   "Test Content",
				Category:  "tech",
				Slug:      "test-post",
				CreatedAt: time.Now(),
				UpdatedAt: time.Now(),
				ReadTime:  5,
			},
			wantErr: true,
		},
		{
			name: "invalid post - empty content",
			post: Post{
				ID:        "test-id",
				Title:     "Test Post",
				Summary:   "Test Summary",
				Content:   "",
				Category:  "tech",
				Slug:      "test-post",
				CreatedAt: time.Now(),
				UpdatedAt: time.Now(),
				ReadTime:  5,
			},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.post.IsValid()
			if (err != nil) != tt.wantErr {
				t.Errorf("Post.IsValid() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestPost_CalculateReadTime(t *testing.T) {
	post := Post{
		Content: "This is a test content with multiple words to calculate read time.",
	}

	readTime := post.CalculateReadTime()
	if readTime <= 0 {
		t.Errorf("Expected read time to be greater than 0, got %d", readTime)
	}
}
