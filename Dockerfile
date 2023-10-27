FROM node:16 AS build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# aqui van las variables de entorno de nuestro archivo .env
ARG PORT
ARG TAG
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG DB_PORT
ARG DB_URL
ARG DIALECT
ARG PGADMIN_DEFAULT_EMAIL
ARG PGADMIN_DEFAULT_PASSWORD
ARG NODE_ENV

ENV PORT=3000
ENV TAG=13
ENV DB_USER='fl0user'
ENV DB_PASSWORD='xzPWEL3DNq1S'
ENV DB_NAME='LunalsDB'
ENV DB_PORT=5432
ENV DB_URL='postgres://fl0user:xzPWEL3DNq1S@ep-nameless-water-29957669.us-east-2.aws.neon.fl0.io:5432/LunalsDB?sslmode=require'
ENV DIALECT='postgres'
ENV PGADMIN_DEFAULT_EMAIL='pgadmin@example.com'
ENV PGADMIN_DEFAULT_PASSWORD='pgadminPassword'
ENV NODE_ENV='production'

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run migrations:run

EXPOSE 8080

CMD ["npm", "start"]