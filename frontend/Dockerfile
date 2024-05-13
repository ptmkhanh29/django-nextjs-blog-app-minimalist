FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

## Step by step manual

## 1. Build the docker image

##	docker build -t [IMAGE_NAME] .

## 2. Run docker container from docker image

##	docker run -p 3000:3000 -v ${PWD}:/app -v /app/node_modules docker-next
