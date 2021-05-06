FROM node:14.15.4-alpine3.12 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
# Make port 8080 available to the world outside container
EXPOSE 8080
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
