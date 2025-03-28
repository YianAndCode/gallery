package tinyhttp

import (
	"embed"
	"gallery/internal/contract"
	"gallery/internal/service/image"
	"io/fs"
	"net/http"
)

type Server struct {
	mux *http.ServeMux

	uiFS         embed.FS
	imgDir       string
	imageService contract.ImageProvider
}

func NewServer(
	uiFS embed.FS,
	imgDir string,
) *Server {
	server := &Server{
		mux:          http.NewServeMux(),
		uiFS:         uiFS,
		imgDir:       imgDir,
		imageService: image.NewLocal(imgDir),
	}
	server.routes()
	return server
}

func (s *Server) routes() {
	ui, _ := fs.Sub(s.uiFS, "dist")
	s.mux.Handle("/", http.FileServer(http.FS(ui)))

	s.mux.Handle("/api/list", s.corsMiddleware(collectionList(s.imageService)))

	s.mux.Handle("/images/", http.StripPrefix("/images", http.FileServer(http.Dir(s.imgDir))))
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.mux.ServeHTTP(w, r)
}

func (s *Server) corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			return
		}
		next.ServeHTTP(w, r)
	})
}
