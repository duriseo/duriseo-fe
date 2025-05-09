FROM node:22.15.0-alpine AS base

# Setup
FROM base AS deps
# Install missing dependencies
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /usr/src/duriseo-fe

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY .env ./

# Build
FROM base AS builder
WORKDIR /usr/src/duriseo-fe

# Copy necessary files
COPY --from=deps /usr/src/duriseo-fe/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Running
FROM base AS runner 
WORKDIR /usr/src/duriseo-fe

COPY --from=builder /usr/src/duriseo-fe/.next ./.next
COPY --from=builder /usr/src/duriseo-fe/public ./public
COPY --from=builder /usr/src/duriseo-fe/package.json ./package.json
COPY --from=builder /usr/src/duriseo-fe/node_modules ./node_modules
COPY --from=builder /usr/src/duriseo-fe/next.config.js ./next.config.ts

CMD ["npm", "run", "start"]
