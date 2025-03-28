# Build

# build frontend
FROM node:22 AS frontendBuilder

WORKDIR /app

COPY . .

RUN make frontend

# build backend
FROM golang:1.23 AS backendBuilder

WORKDIR /app

COPY . .
COPY --from=frontendBuilder /app/ui/dist /app/ui/dist

RUN --mount=type=cache,target=/go/pkg/mod \
    make backend

# Final image

FROM ubuntu:24.04

WORKDIR /app

COPY --from=backendBuilder /app/bin/gallery .

ENTRYPOINT [ "/app/gallery" ]