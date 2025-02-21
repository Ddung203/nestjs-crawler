/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Redis } from "ioredis";
import { Injectable } from "@nestjs/common";
import { InjectRedis } from "@nestjs-modules/ioredis";

@Injectable()
export class NestRedisService {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redisClient.set(key, value, "EX", ttl);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redisClient.exists(key);
    return result === 1;
  }

  async expire(key: string, ttl: number): Promise<void> {
    await this.redisClient.expire(key, ttl);
  }

  async incr(key: string, increment = 1): Promise<number> {
    return await this.redisClient.incrby(key, increment);
  }

  async hset(key: string, field: string, value: string): Promise<void> {
    await this.redisClient.hset(key, field, value);
  }

  async hget(key: string, field: string): Promise<string | null> {
    return await this.redisClient.hget(key, field);
  }

  async hdel(key: string, field: string): Promise<void> {
    await this.redisClient.hdel(key, field);
  }

  async setJson(key: string, value: any, ttl?: number): Promise<void> {
    const jsonValue = JSON.stringify(value);
    await this.set(key, jsonValue, ttl);
  }

  async getJson<T>(key: string): Promise<T | null> {
    const jsonValue = await this.get(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  }

  async deleteKeysByPattern(pattern: string) {
    let cursor = "0";
    do {
      const [newCursor, keys] = await this.redisClient.scan(cursor, "MATCH", pattern, "COUNT", 100);
      cursor = newCursor;

      if (keys.length > 0) {
        await this.redisClient.del(...keys);
      }
    } while (cursor !== "0");
  }
}
