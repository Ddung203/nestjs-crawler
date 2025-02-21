import * as mongoose from "mongoose";

import { DATABASE } from "src/constants/mongoose";
import { ApiConfigService } from "src/shared/services/api-config.service";

export const databaseProviders = [
  {
    provide: DATABASE.PROVIDERS.CONNECTION,
    useFactory: async (configService: ApiConfigService): Promise<typeof mongoose> => {
      const connection = await mongoose.connect(configService.mongodbConfig.uri);

      mongoose.connection.on("connected", () => {
        console.log("✅ Kết nối MongoDB thành công!");
      });

      mongoose.connection.on("error", (err) => {
        console.error("❌ Lỗi kết nối MongoDB:", err);
      });

      return connection;
    },
    inject: [ApiConfigService],
  },
];
