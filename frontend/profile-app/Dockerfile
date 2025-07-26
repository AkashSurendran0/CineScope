# Step 1: Build
FROM node:18 AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Step 2: Serve
FROM node:18

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3004

CMD ["serve", "-s", "dist", "-l", "3004", "--cors"]
