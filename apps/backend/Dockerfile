# Build stage
FROM oven/bun:latest AS builder

WORKDIR /app

# Copy package and lock files
COPY package.json ./
COPY bun.lock ./

# Install dependencies
RUN bun install


# Runtime stage
FROM oven/bun:latest

WORKDIR /app

# Create non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Copy source files
COPY src ./src
COPY prisma ./prisma
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY prisma.config.ts ./
COPY  .env.example* ./

# Install Prisma globally for migrations
RUN bun install -g prisma

# Change ownership
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD bun run -r tsconfig-paths/register --eval "const http = await import('http'); http.get('http://localhost:3000/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Development environment - starts with hot reload
CMD ["bun", "run", "start:dev"]
