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

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /usr/src/duriseo-fe/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /usr/src/duriseo-fe/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/duriseo-fe/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]
