# Use Ubuntu as the base image
FROM ubuntu:latest

# Set author label
LABEL authors="Amey Pande"

# Set working directory inside the container
WORKDIR /app

# Update and install Node.js, npm and other dependencies
RUN apt-get update && apt-get install -y \
  curl \
  gnupg2 \
  ca-certificates \
  lsb-release \
  && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs \
  && apt-get install -y git

# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

COPY .env .env
# Expose the port that Vite will run on (default is 5173)
EXPOSE 5173

# Run Vite in dev mode
CMD ["npm", "run", "dev"]
