FROM node:22.14.0 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY src ./src
COPY public ./public
COPY vite.config.ts tsconfig.json index.html tsconfig.app.json tsconfig.node.json env.schema.ts  ./

RUN yarn build

FROM nginx:alpine AS runner

COPY --from=builder app/dist/ /usr/share/nginx/html