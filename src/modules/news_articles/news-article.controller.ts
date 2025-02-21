import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NewsArticlesService } from "./news-article.service";

@Controller("news")
@ApiTags("news")
export class NewsArticleController {
  constructor(private readonly newsArticlesService: NewsArticlesService) {}

  @Get()
  async getNews(@Query("category") category: string) {
    if (!category) {
      return { message: "Category is required" };
    }

    const news = await this.newsArticlesService.getLatestNews(category);
    return { data: news };
  }
}
