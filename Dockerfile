# Base stage: Install dependencies and copy application code
FROM node:18-alpine AS base

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Builder stage: Build the React app
FROM base AS build

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Production stage: Use Nginx as the web server
FROM nginx:alpine AS production

# Copy the build output from the builder stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add a user to run the app
RUN adduser -D appuser
USER appuser

# Set the environment variables
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 80

# Command to run the app
CMD ["nginx", "-g", "daemon off;"]

# Development stage: Use Node.js to serve the app
FROM base AS development

# Set the environment variables
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
