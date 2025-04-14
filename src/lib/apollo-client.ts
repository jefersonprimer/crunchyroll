// src/lib/apollo-client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://backend-crunchyroll-production.up.railway.app/graphql',
  cache: new InMemoryCache(),
});

export default client;
