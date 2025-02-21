import * as mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { NewsArticle } from "../interfaces/news-article.interface";

export interface NewsArticleDocument extends NewsArticle, Document {}

const NewsArticleSchema = new mongoose.Schema<NewsArticleDocument>(
  {
    _id: { type: String, default: uuidv4 },
    title: { type: String, default: "" },
    url: { type: String, default: "" },
    content: { type: String, default: "" },
    source: { type: String, default: "" },
    published_at: { type: Date },
    category: { type: String, required: true },
  },
  { timestamps: true },
);

NewsArticleSchema.index({ createdAt: -1 });
NewsArticleSchema.index({ category: 1, createdAt: -1 });

export const NewsArticleModel = mongoose.model<NewsArticleDocument>("NewsArticle", NewsArticleSchema);
export { NewsArticleSchema };

NewsArticleSchema.set("toObject", {
  transform: function (doc, ret) {
    return ret;
  },
});
