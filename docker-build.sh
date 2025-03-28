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