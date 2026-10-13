# ========================================================
# Stage 1: Build React 19 Frontend with Vite & Node.js
# ========================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm install

# Copy application source files
COPY . .

# Build production bundle
RUN npm run build

# ========================================================
# Stage 2: Serve optimized bundle with high-performance Nginx
# ========================================================
FROM nginx:alpine

# Remove default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy build artifacts from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration with reverse proxy for /api/
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
