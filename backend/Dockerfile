FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt ./
COPY .env .env
RUN pip install -r requirements.txt
COPY . .
