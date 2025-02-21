import { Global, Module } from "@nestjs/common";
import { RedisModule as NestRedisModule } from "@nestjs-modules/ioredis";

import { ApiConfigService } from "./../../shared/services/api-config.service";
import { NestRedisService } from "./redis.service";

@Global()
@Module({
  imports: [
    NestRedisModule.forRootAsync({
      inject: [ApiConfigService],
      useFactory: (apiConfigService: ApiConfigService) => ({
        type: "single",
        url: apiConfigService.redisConfig.uri,
      }),
    }),
  ],
  providers: [NestRedisService],
  exports: [NestRedisService],
})
export class RedisModule {}
