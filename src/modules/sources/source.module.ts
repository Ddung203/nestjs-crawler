import { Module } from "@nestjs/common";

import { SourcesService } from "./source.service";
import { sourceProviders } from "./schemas/source.providers";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [SourcesService, ...sourceProviders],
  exports: [SourcesService, ...sourceProviders],
})
export class SourceDataModule {}
