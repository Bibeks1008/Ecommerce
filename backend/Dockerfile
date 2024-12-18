FROM node:23-alpine3.20

COPY package.json /app/
COPY app.js /app/
COPY .env /app/
COPY routes /app/routes
COPY models /app/models
COPY middleware /app/middleware
COPY helpers /app/helpers
COPY controllers /app/controllers
COPY images /app/images

WORKDIR /app

RUN npm install

CMD ["npm", "start"]

