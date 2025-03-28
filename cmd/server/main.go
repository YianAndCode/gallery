package main

import (
	"fmt"
	"gallery/internal/service/tinyhttp"
	"gallery/ui"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

func main() {
	var err error

	port := os.Getenv("PORT")
	if port == "" {
		port = "9394"
	}

	imgDir := os.Getenv("IMG_DIR")
	if imgDir == "" {
		panic("please specify images path through IMG_DIR environment variable")
	}
	imgDir, err = filepath.Abs(imgDir)
	if err != nil {
		panic("invalid IMG_DIR: " + err.Error())
	}

	listenAddr := fmt.Sprintf(":%s", port)

	server := http.Server{
		Addr:         listenAddr,
		Handler:      tinyhttp.NewServer(ui.UIFS, imgDir),
		ReadTimeout:  time.Second * 30,
		WriteTimeout: time.Second * 30,
	}

	fmt.Printf("Server is listening at %s\n", listenAddr)
	fmt.Printf("Images dir: %s\n", imgDir)

	err = server.ListenAndServe()
	if err != nil {
		panic(err)
	}
}
