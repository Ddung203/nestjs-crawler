import { Connection } from "mongoose";
import { DATABASE } from "src/constants/mongoose";
import { NewsArticleDocument, NewsArticleSchema } from "./news-article.schema";

export const newsArticleProviders = [
  {
    provide: DATABASE.MODELS.NEWS_ARTICLE_MODEL,
    useFactory: (connection: Connection) =>
      connection.model<NewsArticleDocument>(DATABASE.COLLECTIONS.NEWS_ARTICLE, NewsArticleSchema),
    inject: [DATABASE.PROVIDERS.CONNECTION],
  },
];
