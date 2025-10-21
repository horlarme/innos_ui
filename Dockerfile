FROM oven/bun:alpine AS base

WORKDIR /app

COPY ./package.json ./bun.lock ./

RUN bun install --frozen-lockfile

COPY . ./
ENV NODE_ENV=production
RUN bun run build


FROM nginx:alpine AS server

COPY --from=base /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
