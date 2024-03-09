FROM node:20.10.0-bookworm-slim as base

ARG USER_NAME=node
ARG UID=1000
ARG GID=1000

RUN groupadd --non-unique --gid ${GID} ${USER_NAME} --non-unique && \
    useradd --uid ${UID} --gid ${GID} --create-home ${USER_NAME} --non-unique && \
    usermod -g ${USER_NAME} ${USER_NAME}

RUN apt-get update && apt-get install -y procps

USER ${USER_NAME}

WORKDIR /home/${USER_NAME}/app

# ------------------ Development ------------------
FROM base as dev

ENV NODE_ENV=development

COPY --chown=${USER_NAME}:${USER_NAME} tsconfig.build.json tsconfig.build.json
COPY --chown=${USER_NAME}:${USER_NAME} tsconfig.json tsconfig.json
COPY --chown=${USER_NAME}:${USER_NAME} package.json package.json
COPY --chown=${USER_NAME}:${USER_NAME} package*.json package*.json
COPY --chown=${USER_NAME}:${USER_NAME} entrypoint.dev.sh entrypoint.dev.sh

COPY --chown=${UID}:${GID} .npm-cache* .npm
COPY --chown=${UID}:${GID} node_modules* node_modules

RUN --mount=type=cache,target=/home/${USER_NAME}/.npm,uid=${UID},gid=${GID} npm install

ENTRYPOINT [ "./entrypoint.dev.sh" ]
CMD ["start"]

# ------------------ Production ------------------

FROM base as prod-build

ENV NODE_ENV=production

COPY --chown=${USER_NAME}:${USER_NAME} . .

# install node_modules
RUN --mount=type=cache,target=/home/${USER_NAME}/.npm,uid=${UID},gid=${GID} npm install --only=production

RUN npm run build

FROM node:20.10.0-bookworm-slim as prod

RUN apt-get update && apt-get install -y procps

ENV NODE_ENV=production

COPY --chown=${USER_NAME}:${USER_NAME} --from=prod-build /home/${USER_NAME}/dist /home/${USER_NAME}/dist

ENTRYPOINT [ "node" ]
CMD ["dist/main.js"]
