import { Global, Module } from "@nestjs/common";

import { KafkaService } from "./kafka.service";
import { NewsArticleModule } from "../news_articles/news-article.module";

@Global()
@Module({
  imports: [NewsArticleModule],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
