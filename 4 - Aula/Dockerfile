FROM node:18-alpine

WORKDIR /trabalho

COPY package.json .

RUN npm install

COPY . .

CMD npm start