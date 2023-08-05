export SHELL := /bin/bash

ifneq ($(shell docker compose version 2>/dev/null),)
  DOCKER_COMPOSE=docker compose
else
  DOCKER_COMPOSE=docker-compose
endif

build:
	${DOCKER_COMPOSE} build
install: build
	${DOCKER_COMPOSE} run --rm base install --profile=base
up: build install
	${DOCKER_COMPOSE} up -d
down:
	${DOCKER_COMPOSE} down
restart:
	${DOCKER_COMPOSE} restart
reload: down up
	echo "reloaded"
