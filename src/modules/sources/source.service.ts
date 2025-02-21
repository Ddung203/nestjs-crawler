import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";

import { DATABASE } from "src/constants/mongoose";
import { SourceDocument } from "./schemas/source.schema";

@Injectable()
export class SourcesService {
  constructor(
    @Inject(DATABASE.MODELS.SOURCE_MODEL)
    private sourceModel: Model<SourceDocument>,
  ) {}

  async findAll() {
    return await this.sourceModel.find().lean();
  }
}
