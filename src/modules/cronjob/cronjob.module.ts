import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { CrawlerModule } from "../crawler/crawler.module";
import { CronjobService } from "./cronjob.service";
import { SourceDataModule } from "../sources/source.module";

const modules = [CrawlerModule, SourceDataModule];

@Module({
  imports: [ScheduleModule.forRoot(), ...modules],
  providers: [CronjobService],
})
export class CronjobModule {}
