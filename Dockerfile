# Use the official Node.js 20 LTS image as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json from your server directory
COPY server/package*.json ./

# Install production dependencies in the container
RUN npm install --only=production

# Copy the server directory contents to the container's working directory
COPY server/ ./

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8080

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "server.js"]
