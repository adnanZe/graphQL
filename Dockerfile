FROM node:18.14.2-bullseye-slim

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY ./ /app

EXPOSE 3000

CMD ["npm", "start"]