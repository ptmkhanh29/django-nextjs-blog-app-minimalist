# Sử dụng base image từ Python 3.8
FROM python:3.8-slim

# Thiết lập thư mục làm việc
WORKDIR /app

# Cài đặt các phụ thuộc từ file requirements.txt
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép tất cả các file từ thư mục hiện tại vào thư mục làm việc trong container
COPY . .

# Cài đặt biến môi trường
ENV FLASK_APP=app.py

# Khai báo container sẽ lắng nghe trên port 3001
EXPOSE 3001

# Chạy Flask application
CMD ["flask", "run", "--host=0.0.0.0", "--port=3001"]

