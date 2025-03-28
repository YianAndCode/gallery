#!/bin/bash

export $(egrep -v '^#' .env | xargs)

DEFAULT_IMG_NAME="gallery"

# 可以在 .env 中指定镜像名称
IMG_NAME=${IMG_NAME:-$DEFAULT_IMG_NAME}

GIT_TAG=$(git describe --tags --abbrev=0 2>/dev/null)

if [ -z "$GIT_TAG" ]; then
  GIT_HASH=$(git rev-parse --short HEAD)
  VERSION=$GIT_HASH
else
  VERSION=$GIT_TAG
fi

DOCKER_BUILDKIT=1 docker build -t $IMG_NAME:latest -t $IMG_NAME:$VERSION .

# 按创建时间保留最近 7 个版本
docker images --filter "reference=$IMG_NAME" --format "{{.ID}} {{.CreatedAt}} {{.Tag}}" \
  | grep -v "latest" \
  | sort -k2 -r \
  | awk 'NR>7 {print $1 " " $3}' \
  | xargs -r -n2 sh -c 'docker rmi $0:$1' 2>/dev/null