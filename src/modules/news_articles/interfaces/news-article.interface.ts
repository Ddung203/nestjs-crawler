import { Document } from "mongoose";

export interface NewsArticle extends Document {
  readonly _id: string;
  title: string;
  url: string;
  content: string;
  source: string;
  category: string;
  published_at: Date;
  createdAt: Date;
  updatedAt: Date;
}
