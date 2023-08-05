#!/bin/bash

# get first argument
COMMAND=$1
set -ex

# run command with case
case $COMMAND in
  start)
    echo "Starting development server"
    npm install
    npm run start:dev
    ;;
  *)
    echo "unknown command, running bash $COMMAND"
    exit 127
    ;;
esac
