# Use official Node.js image as the base image
FROM node:16

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to optimize caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port for the app to run
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
