package supabase

import (
	"os"

	supa "github.com/supabase-community/supabase-go"
)

type Client struct {
	*supa.Client
}

func NewClient() (*Client, error) {
	supabaseURL := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_ANON_KEY")

	if supabaseURL == "" || supabaseKey == "" {
		return nil, ErrMissingSupabaseConfig
	}

	client, err := supa.NewClient(supabaseURL, supabaseKey, nil)
	if err != nil {
		return nil, err
	}

	return &Client{Client: client}, nil
}
