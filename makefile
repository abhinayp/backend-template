export SHELL := /bin/bash
export UID=$(shell id -u)
export GID=$(shell id -g)
export USER_NAME=app_user

ifneq ($(shell docker compose version 2>/dev/null),)
  DOCKER_COMPOSE=docker compose
else
  DOCKER_COMPOSE=docker-compose
endif

.PHONY: build install start stop restart reload migrate migrate_revert

create-required-folders:
	mkdir -p node_modules || true
	mkdir -p .npm-cache || true

ifeq ($(build),false)
build: create-required-folders
else
build: create-required-folders
	${DOCKER_COMPOSE} build
endif
install: build
	${DOCKER_COMPOSE} run --rm --entrypoint npm app install
start: build install
	${DOCKER_COMPOSE} up -d
stop:
	${DOCKER_COMPOSE} down
restart:
	${DOCKER_COMPOSE} restart
reload: stop start
	@echo "reloaded"
migrate: build
	${DOCKER_COMPOSE} run --rm app migrations:run
migrate_revert: build
	${DOCKER_COMPOSE} run --rm app migrations:revert
test: build
	${DOCKER_COMPOSE} -f docker-compose.base.yml -f docker-compose.tests.yml run --rm test-app
	${DOCKER_COMPOSE} -f docker-compose.base.yml -f docker-compose.tests.yml down
format: build
	${DOCKER_COMPOSE} run --rm --entrypoint npm app run format
npm: build
	${DOCKER_COMPOSE} run --rm --entrypoint npm app $(filter-out $@,$(MAKECMDGOALS))
