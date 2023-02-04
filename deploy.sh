#!/bin/sh

git fetch
git checkout production
git pull origin production
APP_VERSION=$(cat package.json | jq -r .version) docker-compose -f production.yml up --build
