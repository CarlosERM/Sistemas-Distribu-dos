FROM node:18-alpine

WORKDIR /bookstore

COPY package.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]