# Use an official Node image as the build environment
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json  ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Use a lightweight nginx server for production
FROM nginx:alpine AS production

# Copy the built app to nginx's html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
