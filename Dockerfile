FROM node:20 AS builder
WORKDIR /app

# enable corepack for yarn 
RUN corepack enable
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build:dev

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
