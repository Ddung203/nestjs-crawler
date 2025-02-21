import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ThrottlerOptions } from "@nestjs/throttler";
import { isNil } from "lodash";

import parse from "src/packages/parse";

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === "development";
  }

  get isProduction(): boolean {
    return this.nodeEnv === "production";
  }

  get isTest(): boolean {
    return this.nodeEnv === "test";
  }
  private getDuration(key: string, format?: string): number {
    const value = this.getString(key);
    const duration = parse(value, format);

    if (duration === null) {
      throw new Error(`${key} environment variable is not a valid duration`);
    }

    return duration;
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + " environment variable is not a number");
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + " env var is not a boolean");
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replaceAll("\\n", "\n");
  }

  get nodeEnv(): string {
    return this.getString("NODE_ENV");
  }

  get documentationEnabled(): boolean {
    return this.getBoolean("ENABLE_DOCUMENTATION");
  }

  get authConfig() {
    return {
      privateKey: this.getString("JWT_PRIVATE_KEY"),
      publicKey: this.getString("JWT_PUBLIC_KEY"),
      jwtExpirationTime: this.getNumber("JWT_EXPIRATION_TIME"),
    };
  }

  get appConfig() {
    return {
      port: this.getString("PORT"),
      fallbackLanguage: this.getString("FALLBACK_LANGUAGE"),
    };
  }

  get throttlerConfigs(): ThrottlerOptions {
    return {
      ttl: this.getDuration("THROTTLER_TTL"),
      limit: this.getNumber("THROTTLER_LIMIT"),
      // storage: new ThrottlerStorageRedisService(new Redis(this.redis)),
    };
  }

  get firebaseAdminConfig() {
    return {
      projectId: this.getString("FIREBASE_PROJECT_ID"),
      clientEmail: this.getString("FIREBASE_CLIENT_EMAIL"),
      privateKey: this.getString("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
    };
  }

  get payOSConfig() {
    return {
      clientId: this.getString("PAYOS_CLIENT_ID"),
      apiKey: this.getString("PAYOS_API_KEY"),
      checksumKey: this.getString("PAYOS_CHECKSUM_KEY"),
      webhookUrl: this.getString("PAYOS_WEBHOOK_URL"),
      cancelUrl: this.getString("PAYOS_CANCEL_URL"),
      returnUrl: this.getString("PAYOS_RETURN_URL"),
    };
  }

  get telegramConfig() {
    return {
      url: this.getString("TELEGRAM_API_URL"),
      chatId: this.getString("TELEGRAM_CHAT_ID"),
    };
  }

  get redisConfig() {
    return {
      uri: this.getString("REDIS_URI"),
    };
  }

  get mongodbConfig() {
    return {
      uri: this.getString("MONGO_URI"),
    };
  }

  get urlVersion() {
    return {
      enable: this.getString("URL_VERSIONING_ENABLE") === "true",
      prefix: "v",
      version: this.getString("URL_VERSION"),
    };
  }

  private get(key: string): string {
    const value: string | undefined = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(`${key} environment variable does not set`);
    }

    return value;
  }
}
