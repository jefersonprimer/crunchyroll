package supabase

import "errors"

var (
	ErrMissingSupabaseConfig = errors.New("missing Supabase configuration")

	ErrUserNotFound = errors.New("user not found")

	ErrUserAlreadyExists = errors.New("user already exists")
)
