FROM node:22.15.0-alpine

# Set working directory
WORKDIR /usr/src/duriseo-fe

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy environment variables
COPY .env ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

CMD ["npm", "run", "start"]
