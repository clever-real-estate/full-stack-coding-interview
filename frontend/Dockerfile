############################################
### APP BUILD STAGE
############################################
FROM node:22-alpine AS builder

WORKDIR /app/frontend

COPY package.json package-lock.json /app/frontend
RUN npm ci --verbose

COPY . .

RUN npm run build

############################################
### SERVE APP WITH NGINX 
############################################
FROM nginx:1.27-alpine

COPY --from=builder /app/frontend/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
