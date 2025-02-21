import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";

import { DATABASE } from "src/constants/mongoose";
import { NewsArticleDto } from "./dtos/create-news-article.dto";
import { NewsArticleDocument } from "./schemas/news-article.schema";

@Injectable()
export class NewsArticlesService {
  constructor(
    @Inject(DATABASE.MODELS.NEWS_ARTICLE_MODEL)
    private newsArticleModel: Model<NewsArticleDocument>,
  ) {}

  async create(createNewsArticleDto: NewsArticleDto) {
    const createdNewsArticle = new this.newsArticleModel({ ...createNewsArticleDto });
    const newNewsArticle = await createdNewsArticle.save();

    return await this.newsArticleModel.findById(newNewsArticle._id).lean();
  }

  async getLatestNews(category: string, limit = 10) {
    if (!category) {
      throw new Error("Category is required");
    }

    return this.newsArticleModel.find({ category }).sort({ createdAt: -1 }).limit(limit).lean();
  }
}
