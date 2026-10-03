# syntax=docker/dockerfile:1

FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci

COPY . .

# NEXT_PUBLIC_* values are inlined into the client bundle at build time.
ARG NEXT_PUBLIC_MAP_API
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_MAP_API=$NEXT_PUBLIC_MAP_API \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# `next build` prerenders the activity/project pages + sitemap from Postgres, so
# the build needs a real connection. It comes in as a BuildKit secret (host
# network, Postgres on 127.0.0.1) and is never written to a layer.
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
RUN npx prisma generate
RUN --mount=type=secret,id=DATABASE_URL,required=true \
    DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" npx next build

FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --chmod=755 docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

USER node

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "server.js"]
