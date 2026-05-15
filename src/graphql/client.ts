import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/graphql';
const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:4000/graphql';

const httpLink = createHttpLink({ uri: API_URL });

const authLink = setContext((_, prevContext) => {
  const token = localStorage.getItem('crm_token');
  return {
    headers: {
      ...(prevContext.headers as Record<string, string> | undefined),
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_URL,
    connectionParams: () => {
      const token = localStorage.getItem('crm_token');
      return token ? { Authorization: `Bearer ${token}` } : {};
    },
  }),
);

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          contacts: { merge: false },
          deals: { merge: false },
          activities: { merge: false },
        },
      },
    },
  }),
});
