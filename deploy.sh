#!/bin/sh

APP_VERSION=$(cat package.json | jq -r .version)
git fetch
git checkout production
git pull origin production
APP_VERSION=${APP_VERSION} docker-compose -f production.yml up --build
