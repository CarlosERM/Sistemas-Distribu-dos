FROM node:18-alpine

WORKDIR /api_tcc

COPY package.json .

RUN npm install

COPY . .

CMD npm start