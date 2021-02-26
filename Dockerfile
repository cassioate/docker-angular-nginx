FROM node:latest as angular
LABEL MAINTAINER = 'Cassio'
WORKDIR /app
COPY package.json .
RUN npm install -g
RUN npm install -g @angular/cli
RUN npm build
COPY . .
ENTRYPOINT ng serve

FROM nginx:alpine
COPY --from=angular app/dist/apimoney-ui /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
