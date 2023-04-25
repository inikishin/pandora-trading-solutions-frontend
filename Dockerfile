# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
FROM node:18-alpine3.15 AS base
RUN apk add --no-cache libc6-compat

# Install dependencies ---------------------------------------------------------------------------------
FROM base AS dependencies

WORKDIR /app

RUN npm set progress=false && npm config set depth 0
COPY package.json package-lock.json* ./

RUN npm ci

# Rebuild the source code ------------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Copy needed files and run application ----------------------------------------------------------------
FROM node:18-alpine3.15 AS application
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]

# Nginx for static -------------------------------------------------------------------------------------
#FROM nginx:1.23.2-alpine AS nginx
#WORKDIR /www
#
#COPY --from=builder /app/.next/static /www/static
