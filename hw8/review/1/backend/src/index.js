import db, { fetchData } from "./db";
import { GraphQLServer, PubSub } from "graphql-yoga";
import { connectMongo } from "./mongoose";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";

(async () => {
  const pubsub = new PubSub();
  await connectMongo();
  await fetchData();

  const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: { Query, Mutation, Subscription },
    context: {
      db,
      pubsub,
    },
  });

  server.start({ port: process.env.PORT | 5000 }, () => {
    console.log(`The server is up on port ${process.env.PORT | 5000}!`);
  });
})();
