import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { NewsArticleController } from "./news-article.controller";
import { NewsArticlesService } from "./news-article.service";
import { newsArticleProviders } from "./schemas/news-article.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [NewsArticleController],
  providers: [NewsArticlesService, ...newsArticleProviders],
  exports: [NewsArticlesService],
})
export class NewsArticleModule {}
