FROM node:current-alpine

RUN mkdir -p /src/api

WORKDIR /src/api

COPY . /src/api

RUN npm install

EXPOSE 3333

CMD ["npm", "start"]