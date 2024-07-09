// gateway/index.mjs
import { ApolloServer } from '@apollo/server';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'graphql-server-1', url: 'http://localhost:4001/graphql' },
      { name: 'graphql-server-2', url: 'http://localhost:4002/graphql' },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀 Gateway ready at ${url}`);
