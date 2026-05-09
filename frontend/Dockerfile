# Stage 1: Build
FROM node:25-alpine AS build

WORKDIR /app
COPY package*.json ./
# Gunakan ci untuk instalasi yang lebih bersih dan hemat memori
RUN npm ci 

COPY . .
# Tambahkan limit memori untuk Node agar tidak melebihi alokasi Docker
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Stage 2: Production
FROM node:25-alpine

WORKDIR /app
RUN npm install -g serve
# Kita hanya ambil hasil build-nya saja (folder dist)
COPY --from=build /app/dist ./dist

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]