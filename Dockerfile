# syntax=docker/dockerfile:1
FROM alpine:latest

COPY . .
COPY .dockerignore .


RUN apk update && apk add --no-cache nodejs npm
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]