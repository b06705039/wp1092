import db from './db';  // see the README for how to manipulate this object

// TODO
// Setup the GraphQL server

import { GraphQLServer, PubSub } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
// import Subscription from './resolvers/Subscription';
// import User from './resolvers/User';
// import Post from './resolvers/Post';
// import Comment from './resolvers/Comment';

const pubsub = new PubSub();
const collections = db.people;

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    // Subscription,
    // User,
    // Post,
    // Comment,
  },
  context: {
    collections,
    pubsub,
  },
});

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
