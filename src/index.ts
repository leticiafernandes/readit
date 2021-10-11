import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  /** DB config */
  const orm = await MikroORM.init(mikroOrmConfig);
  // orm.em.create(Post, { title: 'my first post' })
  // orm.em.persist()
  await orm.getMigrator().up();

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  }); /** graphql config */
  apolloServer.applyMiddleware({ app });

  /** Server config */
  app.listen(4000, () => {
    console.log("server started at localhost:4000");
  });
};

main();
