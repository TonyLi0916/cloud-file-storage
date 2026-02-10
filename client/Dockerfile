# ============================================
# STAGE 1: Build Stage
# ============================================
# Use Node.js 20 Alpine 
FROM node:20-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package files first (for Docker layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the Vite app (outputs to /app/dist)
RUN npm run build

# ============================================
# STAGE 2: Production Stage
# ============================================
# Use nginx Alpine 
FROM nginx:alpine

# FROM the build stage's /app/dist TO nginx's default serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration 
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP traffic
EXPOSE 80

