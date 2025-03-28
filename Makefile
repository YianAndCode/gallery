.PHONY: all backend frontend clean

BIN_DIR = ./bin

SERVER_SRC = ./cmd/server/
SERVER_TGT = gallery

all: backend frontend

backend:
	go build -o ${BIN_DIR}/${SERVER_TGT} ${SERVER_SRC}

frontend:
	cd ui && npm install && npm run build

clean:
	rm -f ${BIN_DIR}/${SERVER_TGT}