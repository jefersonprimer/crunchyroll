package config

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

var (
	SupabaseURL = "https://ipcmmsuhlmttnqvlsefw.supabase.co"
	SupabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwY21tc3VobG10dG5xdmxzZWZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NjQxNzUsImV4cCI6MjA1OTM0MDE3NX0.-AHXXn_Dkrep8_Oig7teqd3PCgLdodEO5s8_cAT5VSc"
)

func MakeRequest(method, path string, body interface{}) (*http.Response, error) {
	url := SupabaseURL + "/rest/v1" + path
	var reqBody []byte
	var err error

	if body != nil {
		reqBody, err = json.Marshal(body)
		if err != nil {
			return nil, err
		}
		log.Printf("Request body: %s", string(reqBody))
	}

	req, err := http.NewRequest(method, url, bytes.NewBuffer(reqBody))
	if err != nil {
		return nil, err
	}

	req.Header.Set("apikey", SupabaseKey)
	req.Header.Set("Authorization", "Bearer "+SupabaseKey)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Prefer", "return=representation")

	log.Printf("Making request to: %s", url)
	log.Printf("Request headers: %v", req.Header)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	// Read the response body
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Error reading response body: %v", err)
		return resp, err
	}

	// Create a new reader with the body content
	resp.Body = io.NopCloser(bytes.NewBuffer(respBody))

	if resp.StatusCode >= 400 {
		log.Printf("Supabase error response (Status %d): %s", resp.StatusCode, string(respBody))
		return resp, fmt.Errorf("Supabase error: %s", string(respBody))
	}

	log.Printf("Response body: %s", string(respBody))
	return resp, nil
}

func InitSupabase() {
	// Test the connection
	resp, err := MakeRequest("GET", "/posts", nil)
	if err != nil {
		log.Fatal("Erro ao conectar ao Supabase:", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Fatal("Erro ao conectar ao Supabase: Status", resp.StatusCode)
	}

	log.Println("Conectado ao Supabase com sucesso!")
}
