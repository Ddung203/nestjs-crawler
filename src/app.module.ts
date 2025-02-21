// app.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { ClsModule } from "nestjs-cls";
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import { join } from "path";

import { CrawlerModule } from "./modules/crawler/crawler.module";
import { CronjobModule } from "./modules/cronjob/cronjob.module";
import { DatabaseModule } from "./modules/database/database.module";
import { ExtractorModule } from "./modules/extractor/extractor.module";
import { KafkaModule } from "./modules/kafka/kafka.module";
import { NewsArticleModule } from "./modules/news_articles/news-article.module";
import { ApiConfigService } from "./shared/services/api-config.service";
import { SharedModule } from "./shared/shared.module";

const modules = [DatabaseModule, NewsArticleModule, KafkaModule, CrawlerModule, ExtractorModule, CronjobModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || "development"}`,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => ({
        throttlers: [configService.throttlerConfigs],
      }),
      inject: [ApiConfigService],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        fallbackLanguage: configService.appConfig.fallbackLanguage,
        loaderOptions: {
          path: join(__dirname, "/i18n/"),
          watch: true,
        },
      }),
      resolvers: [{ use: QueryResolver, options: ["lang"] }, AcceptLanguageResolver, new HeaderResolver(["x-lang"])],
      inject: [ApiConfigService],
    }),

    ...modules,
  ],
  providers: [],
})
export class AppModule {}
