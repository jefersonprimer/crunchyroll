package supabase

import "errors"

var (
	// ErrMissingSupabaseConfig é retornado quando as configurações do Supabase estão faltando
	ErrMissingSupabaseConfig = errors.New("missing Supabase configuration")

	// ErrUserNotFound é retornado quando um usuário não é encontrado
	ErrUserNotFound = errors.New("user not found")

	// ErrUserAlreadyExists é retornado quando um usuário já existe
	ErrUserAlreadyExists = errors.New("user already exists")
)
