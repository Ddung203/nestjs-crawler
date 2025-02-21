/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, OnModuleInit } from "@nestjs/common";
import axios from "axios";
import * as cheerio from "cheerio";
import { KafkaService } from "../kafka/kafka.service";
import { NewsArticlesService } from "../news_articles/news-article.service";

@Injectable()
export class ExtractorService implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly newsArticlesService: NewsArticlesService,
  ) {}

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async onModuleInit() {
    await this.kafkaService.consumeMessages("news-links", this.processNews.bind(this));
  }

  async processNews(message: any) {
    if (!JSON.parse(message)) {
      console.error("Received empty message:", JSON.parse(message));
      return;
    }

    const { url, source } = JSON.parse(message);

    try {
      await this.sleep(2000);
      const response = await axios.get(url);

      if (!response) return;

      const $ = cheerio.load(response.data);

      const title = $("title").text();
      const content = $("p")
        .map((_, el) => $(el).text())
        .get()
        .join("\n");

      let category = this.extractCategoryFromUrl(url, source);

      if (!category) {
        category = this.extractCategoryFromHtml($);
      }

      if (!title || !content) return;

      await this.newsArticlesService.create({
        title,
        url,
        content,
        source,
        published_at: new Date(),
        category: category || "unknown",
      });
    } catch (error) {
      console.log(`Error processing ${url}`);
    }
  }

  private extractCategoryFromUrl(url: string, source: string): string | null {
    try {
      const parsedUrl = new URL(url);
      const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);

      if (source === "dantri") {
        return pathSegments.length > 0 ? pathSegments[0] : null;
      }
      if (source === "vnexpress") {
        return pathSegments.length > 0 ? pathSegments[0] : null;
      }
    } catch (error) {
      console.error(`Error extracting category from URL: ${url}`, error.message);
    }
    return null;
  }

  private extractCategoryFromHtml($: cheerio.CheerioAPI): string | null {
    let category = $("meta[name='category']").attr("content");

    if (!category) {
      category = $(".breadcrumb li:last-child").text().trim();
    }

    return category || null;
  }
}
