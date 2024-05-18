FROM node:18.17-alpine

WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Xóa node_modules và package-lock.json trước khi cài đặt lại

USER root

RUN rm -rf node_modules package-lock.json && npm install --verbose

# Copy toàn bộ source code vào container
COPY . .

EXPOSE 3000

CMD ["sh", "-c", "export PATH=$PATH:/app/node_modules/.bin && npm run dev"]

## Step by step manual

## 1. Build the docker image

##	docker build -t [IMAGE_NAME] .

## 2. Run docker container from docker image

##	docker run -p 3000:3000 -v ${PWD}:/app -v /app/node_modules docker-next

## -p 3000:3000

## Ánh xạ cổng 3000 từ máy host đến cổng 3000 của container => có thể truy cập ứng dụng đang chạy trong container thông qua cổng 3000 của máy chủ

## -v ${PWD}:/app 

## gắng thư mục hiện tại ${PWD} đến thư mục /app trong container => đồng bộ mã nguồn từ máy chủ vào container, khi có thay đổi trong thư mục máy

## chủ thì trong container ngay lập tức được đồng bộ

## -v /app/node_modules

## tạo một volume ẩn danh cho thư mục node_modules trong container =>  thư mục node_modules của container không bị ghi đè bởi volume của máy chủ

## docker-next => tên của docker image muốn chạy

