package tinyhttp

import (
	"encoding/json"
	"gallery/internal/contract"
	"net/http"
)

func collectionList(imageService contract.ImageProvider) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		data, err := imageService.Collections(ctx)
		w.Header().Set("Content-Type", "application/json")
		if err != nil {
			// HTTP 500
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]any{
				"error": err.Error(),
			})
			return
		}
		json.NewEncoder(w).Encode(data)
	}
}
