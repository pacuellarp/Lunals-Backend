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

ENV PORT=$PORT
ENV TAG=$TAG
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_NAME=$DB_NAME
ENV DB_PORT=$DB_PORT
ENV DB_URL=$DB_URL
ENV DIALECT=$DIALECT
ENV PGADMIN_DEFAULT_EMAIL=$PGADMIN_DEFAULT_EMAIL
ENV PGADMIN_DEFAULT_PASSWORD=$PGADMIN_DEFAULT_PASSWORD
ENV NODE_ENV=$NODE_ENV

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run migrations:run

EXPOSE 8080

CMD ["npm", "start"]