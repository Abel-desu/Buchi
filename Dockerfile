# Use an official Node runtime as a parent image
FROM node:14.17.1-alpine3.11

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the app files to the container
COPY . .

# Build the app
RUN npm run build

# Serve the app with a static server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the port the app will run on
EXPOSE 5000
