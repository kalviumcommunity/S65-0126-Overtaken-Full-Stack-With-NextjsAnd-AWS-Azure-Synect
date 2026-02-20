# Build stage
FROM oven/bun:latest AS builder

WORKDIR /app

# Copy package and lock files
COPY package.json ./
COPY bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile


# Runtime stage
FROM oven/bun:latest

WORKDIR /app

# Create non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Copy source files
COPY app ./app
COPY public ./public
COPY tsconfig.json next.config.ts postcss.config.mjs ./
COPY .env.example* ./

# Change ownership
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Development environment - Next.js dev server with hot reload
CMD ["bun", "run", "dev"]
