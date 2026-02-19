import { Injectable, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";
import { logger } from "../utils/logger";

@Injectable()
export class CacheService implements OnModuleDestroy {
  private readonly defaultTtlSeconds: number;
  private readonly client: Redis;

  constructor() {
    this.defaultTtlSeconds = Number(process.env.REDIS_TTL_SECONDS ?? 120);
    this.client = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      retryStrategy: () => null,
    });
  }

  async getJson<T>(key: string): Promise<T | null> {
    const connected = await this.ensureConnected();
    if (!connected) {
      return null;
    }

    try {
      const payload = await this.client.get(key);
      return payload ? (JSON.parse(payload) as T) : null;
    } catch (error) {
      logger.warn("Redis get failed", {
        code: "REDIS_GET_ERROR",
        details: { key, error: this.errorMessage(error) },
      });
      return null;
    }
  }

  async setJson(key: string, value: unknown, ttlSeconds = this.defaultTtlSeconds) {
    const connected = await this.ensureConnected();
    if (!connected) {
      return;
    }

    try {
      await this.client.set(key, JSON.stringify(value), "EX", ttlSeconds);
    } catch (error) {
      logger.warn("Redis set failed", {
        code: "REDIS_SET_ERROR",
        details: { key, error: this.errorMessage(error) },
      });
    }
  }

  async del(key: string) {
    const connected = await this.ensureConnected();
    if (!connected) {
      return;
    }

    try {
      await this.client.del(key);
    } catch (error) {
      logger.warn("Redis delete failed", {
        code: "REDIS_DEL_ERROR",
        details: { key, error: this.errorMessage(error) },
      });
    }
  }

  async deleteByPrefix(prefix: string) {
    const connected = await this.ensureConnected();
    if (!connected) {
      return;
    }

    try {
      const keys = await this.client.keys(`${prefix}*`);
      if (keys.length > 0) {
        await this.client.del(...keys);
      }
    } catch (error) {
      logger.warn("Redis delete by prefix failed", {
        code: "REDIS_DEL_PREFIX_ERROR",
        details: { prefix, error: this.errorMessage(error) },
      });
    }
  }

  async onModuleDestroy() {
    if (this.client.status !== "end") {
      await this.client.quit();
    }
  }

  private async ensureConnected() {
    if (this.client.status === "ready") {
      return true;
    }

    try {
      if (this.client.status === "wait") {
        await this.client.connect();
        return true;
      }
      return false;
    } catch (error) {
      logger.warn("Redis connection unavailable", {
        code: "REDIS_CONNECT_ERROR",
        details: this.errorMessage(error),
      });
      return false;
    }
  }

  private errorMessage(error: unknown) {
    return error instanceof Error ? error.message : "Unknown redis error";
  }
}
