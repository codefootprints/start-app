# Stage 1: Build
FROM golang:1.26-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
# Build binary yang statis agar bisa jalan di alpine murni
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Stage 2: Final Image
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
# Hanya ambil binary-nya saja dari stage builder
COPY --from=builder /app/main .
# Ambil file .env jika diperlukan di dalam container
COPY --from=builder /app/.env . 

EXPOSE 3000
CMD ["./main"]