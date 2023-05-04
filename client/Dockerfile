FROM node:16-alpine

WORKDIR /app

RUN npm install -g typescript

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD npm run start
