FROM node:22-alpine
RUN apk add --no-cache procps
WORKDIR /app

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
# COPY packages/types/package*.json ./packages/types/

RUN npm install

COPY apps/api ./apps/api
# COPY packages/types ./packages/types

WORKDIR /app/apps/api

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
