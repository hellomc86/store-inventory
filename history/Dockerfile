# Stage 1: Build
FROM node:20-alpine3.19 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run
FROM node:20-alpine3.19

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm install --only=production

CMD ["npm", "start"]
