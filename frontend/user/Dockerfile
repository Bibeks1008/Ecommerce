FROM node:23-alpine3.20

COPY package.json /app/
COPY public /app/public
COPY src /app/src

WORKDIR /app

RUN npm install

CMD ["npm", "start"]