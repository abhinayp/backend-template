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
