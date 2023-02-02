FROM node:16.17.1-alpine3.15

COPY ./dist/. /app
COPY ./package.json /app

WORKDIR /app

EXPOSE 8000

RUN yarn --production=true

CMD ["yarn", "serve"]
