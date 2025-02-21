import { Global, Module } from "@nestjs/common";

import { CrawlerService } from "./crawler.service";
import { SourceDataModule } from "../sources/source.module";

@Global()
@Module({
  imports: [SourceDataModule],
  providers: [CrawlerService],
  exports: [CrawlerService],
})
export class CrawlerModule {}
