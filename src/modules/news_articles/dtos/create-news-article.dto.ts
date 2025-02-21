import { DateField, StringField } from "src/decorators/field.decorators";

export class NewsArticleDto {
  @StringField()
  title: string;

  @StringField()
  url: string;

  @StringField()
  content: string;

  @DateField()
  published_at: any;

  @StringField()
  source: string;

  @StringField()
  category: string;
}
