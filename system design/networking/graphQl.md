# What is GraphQL?
GraphQL is a query language for APIs that lets clients request exactly the data they need from a server, unlike traditional APIs that might send too much or too little. It acts like a flexible translator between apps and backend data, making communication efficient and precise.

Example - 
Imagine a restaurant
- REST → You order a fixed combo meal
- GraphQL → You order exactly what you want (no extra food, no missing food)

In graphQL Studio - 
{
  user {
    name
    email
  }
}

Response - 
{
  "user": {
    "name": "Parul",
    "email": "parul@gmail.com"
  }
}

# Why GraphQL?

1. OVER-FETCHING - Apps today often need data from multiple sources, but REST APIs can force multiple requests or deliver unnecessary info, wasting bandwidth. GraphQL solves this by using one endpoint where you specify your exact data needs, reducing network traffic and speeding up apps.

2. UNDER-FETCHING - You need to call multiple APIs to get all data

3. SINGLE ENDPOINT - One URL handles all queries, mutations, and subscriptions, simplifying API design.

4. STRONG TYPING & VERSIONING - Self-documenting schemas prevent errors and ease evolution without breaking changes.

5. REAL TIME SUPPORT: Subscriptions enable live updates, like chat apps or stock tickers.


# Building Blocks of GraphQL
1. Schema - It is the shape of the API. Kind of a blueprint of how your data looks

type Book {
    id: ID!
    title: String!
    publishedYear: String!
}

2. Typedef - Definition of the Data - 
    1. SCALAR - Built-in types (Int, String, Boolean, ID) 
    2. CUSTOM - Whatever you define (like Book in the above example)

3. Queries
Query is used to fetch the data - 
type Query {
    books: [Book]!
}

4. Mutations
These are used to change the data
type Mutation {
    addBook(title: String!, authorId: ID!): Book!
}

5. Resolvers
The actual logic to return the data resides in resolver

Book: {
  author: (parent) => {
    return findAuthorById(parent.authorId);
  }
}

LIKE - 
Schema = What is possible
Resolver = How it happens


Entrypoint - index.js

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);