/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as cheerio from "cheerio";

import { KafkaService } from "../kafka/kafka.service";
import { SourcesService } from "../sources/source.service";

@Injectable()
export class CrawlerService {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly sourcesService: SourcesService,
  ) {}

  async crawlNews(): Promise<void> {
    //
    // const sources = [
    //   { name: "dantri", url: "https://dantri.com.vn/" },
    //   {
    //     name: "vnexpress",
    //     url: "https://vnexpress.net/",
    //   },
    // ];
    const sources = await this.sourcesService.findAll();

    for (const source of sources) {
      console.log(`Crawling: ${source.name}`);

      try {
        const response = await axios.get(source.url);
        const $ = cheerio.load(response.data);

        const links: string[] = [];
        $("a[href]").each((_, el) => {
          const link = $(el).attr("href");
          if (link && link.includes(source.url)) {
            links.push(link);
          }
        });

        console.log("links.length: ", links.length);
        // console.log("links", links[1]);
        // await this.kafkaService.sendMessage("news-links", { url: links[1], source: source.name });

        for (const url of links) {
          await this.kafkaService.sendMessage("news-links", { url, source: source.name });
          // await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`Error crawling ${source.name}:`, error.message);
      }
    }
  }
}
