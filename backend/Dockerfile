# Sử dụng image Python chính thức từ Docker Hub làm image cơ sở
FROM python:3.8-slim

# Đặt thư mục làm việc trong container
WORKDIR /app

# Cài đặt các gói phụ thuộc
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ thư mục backend hiện tại vào thư mục làm việc trong container
COPY . /app/

# Thiết lập câu lệnh để chạy khi container khởi động
CMD ["python", "manage.py", "runserver", "0.0.0.0:3001"]
