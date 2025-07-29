############################################
### APP BUILD STAGE
############################################
FROM node:22-alpine AS builder

WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm ci --verbose

COPY . .
RUN npm run build

############################################
### PRODUCTION STAGE
############################################
FROM nginx:alpine

COPY --from=builder /app/frontend/dist /usr/share/nginx/html

RUN printf 'server { \
     listen 80; root /usr/share/nginx/html; \
     location / { try_files $uri $uri/ /index.html; } \
}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 80
