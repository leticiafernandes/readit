import { __db_pwd__, __db_user__, __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path/posix";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post],
  dbName: "readit",
  debug: !__prod__,
  type: "postgresql",
  user: __db_user__,
  password: __db_pwd__,
} as Parameters<typeof MikroORM.init>[0]; // cast to export MikroORM with the proper types
