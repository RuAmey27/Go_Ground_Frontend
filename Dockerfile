# Use Node.js official image as base
FROM node:22.12.0
LABEL authors="Amey Pande"
# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of your application files into the container
COPY . .

# Expose the port that Vite will run on (default is 5173)
EXPOSE 5173

# Run Vite in dev mode
CMD ["npm", "run", "dev"]
