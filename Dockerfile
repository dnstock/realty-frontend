# Use the official Node.js image as the base image for building
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

## Multi-stage build

# Production stage: Use Nginx as the web server
FROM nginx:alpine AS production

# Copy the build output from the builder stage to the Nginx HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port the app runs on
EXPOSE 80

# Add a health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Command to run the app
CMD ["nginx", "-g", "daemon off;"]

# Development stage: Use Node.js to serve the app
FROM node:18-alpine AS development

# Set the working directory in the container
WORKDIR /app

# Copy the build output from the builder stage to the working directory
COPY --from=builder /app/build /app/build

# Install serve globally for development environment
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]