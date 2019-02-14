FROM node:10

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN npm i npm@latest -g

RUN mkdir /app
WORKDIR /app

COPY . /app/
RUN npm install

USER node

CMD ["node", "stream.js"]