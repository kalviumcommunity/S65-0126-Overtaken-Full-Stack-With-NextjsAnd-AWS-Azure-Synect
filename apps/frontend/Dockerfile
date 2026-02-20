# ---------- Build Stage ----------
FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile


# ---------- Runtime Stage ----------
FROM oven/bun:latest

WORKDIR /app

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Copy app files
COPY app ./app
COPY public ./public
COPY tsconfig.json next.config.ts postcss.config.mjs ./
COPY .env.example* ./

# Permissions
RUN chown -R appuser:appuser /app
USER appuser

# Port exposed
EXPOSE 3000

# Start dev server correctly
CMD ["bun","run","dev","--","-p","3000","-H","0.0.0.0"]