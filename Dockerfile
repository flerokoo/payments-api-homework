FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm i --production

EXPOSE 3000

COPY src ./

CMD ["node"]