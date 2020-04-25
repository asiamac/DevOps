FROM node:alpine

WORKDIR /opt/mywebapp

COPY ./package.json .

RUN npm install

COPY . .

CMD ["yarn", "dev"]


