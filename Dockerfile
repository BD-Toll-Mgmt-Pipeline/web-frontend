# react-app/Dockerfile
FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
