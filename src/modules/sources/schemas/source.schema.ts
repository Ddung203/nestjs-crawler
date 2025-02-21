import * as mongoose from "mongoose";
import { DATABASE } from "src/constants/mongoose";
import { v4 as uuidv4 } from "uuid";

export interface SourceDocument extends mongoose.Document {
  _id: string;
  name: string;
  url: string;
}

const SourceSchema = new mongoose.Schema<SourceDocument>(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true, unique: true },
    url: { type: String, required: true },
  },
  { timestamps: true },
);

export const SourceModel = mongoose.model<SourceDocument>(DATABASE.COLLECTIONS.SOURCE, SourceSchema);
export { SourceSchema };
