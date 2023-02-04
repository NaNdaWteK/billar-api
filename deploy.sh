#!/bin/sh

APP_VERSION=$(cat package.json | jq -r .version)
APP_VERSION=${APP_VERSION} docker-compose -f production.yml up --build
