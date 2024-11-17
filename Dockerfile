# Stage 1: Build the Angular app
FROM node:18 as build
WORKDIR /app

RUN npm config set registry https://registry.npmjs.org/

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the application code
COPY . .

# Build the Angular app
RUN ng build --configuration production

# Stage 2: Serve the app using NGINX
FROM nginx:alpine
COPY --from=build /app/dist/<your-angular-app-name> /usr/share/nginx/html

# Expose the port for Vercel
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
