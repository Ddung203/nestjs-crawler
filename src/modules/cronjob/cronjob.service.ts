import { Inject, Injectable } from "@nestjs/common";
import { Interval, Timeout } from "@nestjs/schedule";
import { Model } from "mongoose";

import { DATABASE } from "src/constants/mongoose";
import { CrawlerService } from "../crawler/crawler.service";
import { SourceDocument } from "../sources/schemas/source.schema";
import { seedSources } from "../sources/seeds/seed-sources";

@Injectable()
export class CronjobService {
  constructor(
    @Inject(DATABASE.MODELS.SOURCE_MODEL)
    private sourceModel: Model<SourceDocument>,
    private crawlerService: CrawlerService,
  ) {}

  @Interval(600000) // 10 minutes
  async handleScheduledTasksEveryMinute() {
    await this.crawlerService.crawlNews();
  }

  @Timeout(5000)
  async handleStartupTask() {
    await seedSources(this.sourceModel);
    await this.crawlerService.crawlNews();
  }
}
