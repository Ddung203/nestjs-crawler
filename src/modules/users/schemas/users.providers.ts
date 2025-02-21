import { Connection } from "mongoose";
import { DATABASE } from "src/constants/mongoose";
import { UserDocument, UserSchema } from "./user.schema";

export const usersProviders = [
  {
    provide: DATABASE.MODELS.USER,
    useFactory: (connection: Connection) => connection.model<UserDocument>(DATABASE.COLLECTIONS.USER, UserSchema),
    inject: [DATABASE.PROVIDERS.CONNECTION],
  },
];
