# Stage 1: Build the Angular app
FROM node:20.11.0-alpine as build
WORKDIR /app

RUN npm config set registry https://registry.npmjs.org/

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy application code and build
COPY . .
RUN ng build --prod

# Stage 2: Serve the app with NGINX
FROM nginx:alpine
COPY --from=build /app/dist/control-tech /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
