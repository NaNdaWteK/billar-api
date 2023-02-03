FROM node:16.17.1-alpine3.15

COPY ./dist/. /app
COPY ./package.json /app
COPY ./ecosystem.config.js /app

WORKDIR /app

EXPOSE 8000
EXPOSE 8001

RUN yarn global add pm2
RUN yarn --production=true


