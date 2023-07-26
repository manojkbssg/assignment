# Node Block 
ARG NODE_VERSION=18.16.1 
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /myapp
COPY package.json .
RUN npm install
COPY . . 
RUN npm run build

# Nginx Block
FROM nginx:1.23.2-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=base /myapp/build .
ENTRYPOINT [ "nginx", "-g", "daemon off;"] 