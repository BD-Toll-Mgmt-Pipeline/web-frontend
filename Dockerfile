# react-app/Dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY . .

# Attempt to resolve the error by forcing installation
RUN npm install --force

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

