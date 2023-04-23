FROM node:16-alpine3.16 as builder

RUN mkdir /app && chown node:node /app
WORKDIR /app
RUN chmod 777 /app
COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./prisma/
RUN npm ci
COPY --chown=node:node . .
RUN npm run build
FROM node:16-alpine3.16
WORKDIR /app
ENV NODE_ENV production

COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/prisma ./prisma
EXPOSE 3000:3000
USER node

CMD ["node",  "dist/src/main"]