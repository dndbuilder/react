import { MongooseModuleOptions } from "@nestjs/mongoose";

export const databaseConfig: MongooseModuleOptions = {
  uri: process.env.MONGODB_URI,
  dbName: process.env.DB_NAME,
};
