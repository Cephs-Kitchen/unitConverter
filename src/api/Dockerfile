FROM node:current-alpine

RUN mkdir -p /src/api

WORKDIR /src/api

COPY . /src/api

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]