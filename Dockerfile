FROM node:18.13-alpine3.16

RUN npm i -g ts-node

WORKDIR /app

COPY . /app/

RUN npm i

ENTRYPOINT npm start