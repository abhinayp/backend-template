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
start: build install
	${DOCKER_COMPOSE} up -d
stop:
	${DOCKER_COMPOSE} down
restart:
	${DOCKER_COMPOSE} restart
reload: stop start
	echo "reloaded"
migrate:
	${DOCKER_COMPOSE} run --rm base migrations:run
migrate_revert:
	${DOCKER_COMPOSE} run --rm base migrations:revert
