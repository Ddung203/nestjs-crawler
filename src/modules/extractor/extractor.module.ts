import { Global, Module } from "@nestjs/common";
import { ExtractorService } from "./extractor.service";
import { KafkaModule } from "../kafka/kafka.module";
import { NewsArticleModule } from "../news_articles/news-article.module";

@Global()
@Module({
  imports: [KafkaModule, NewsArticleModule],
  providers: [ExtractorService],
  exports: [ExtractorService],
})
export class ExtractorModule {}
