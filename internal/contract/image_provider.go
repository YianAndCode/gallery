package contract

import "context"

type Collection struct {
	Id     string   `json:"id"`     // collection id
	Title  string   `json:"title"`  // collection title
	Images []string `json:"images"` // picture urls
}

type ImageProvider interface {
	Collections(ctx context.Context) ([]Collection, error)
}
