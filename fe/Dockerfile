FROM node:20-alpine3.17 as build

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25-alpine as prod

COPY --from=build ./dist /usr/share/nginx/html
COPY version.txt /usr/share/nginx/html
