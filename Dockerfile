FROM node:17-alpine

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

COPY . .
RUN npm ci
RUN npm install express

RUN npm run build

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
