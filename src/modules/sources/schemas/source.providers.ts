import { Connection } from "mongoose";

import { DATABASE } from "src/constants/mongoose";
import { SourceDocument, SourceSchema } from "./source.schema";

export const sourceProviders = [
  {
    provide: DATABASE.MODELS.SOURCE_MODEL,
    useFactory: (connection: Connection) => connection.model<SourceDocument>(DATABASE.COLLECTIONS.SOURCE, SourceSchema),
    inject: [DATABASE.PROVIDERS.CONNECTION],
  },
];
