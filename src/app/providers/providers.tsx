'use client';

import { DropdownProvider } from "../[locale]/contexts/DropdownContext";
import { HistoryProvider } from '../[locale]/contexts/HistoryContext';
import { ListsProvider } from "../[locale]/contexts/ListsContext";
import { ApolloProvider } from '@apollo/client';
import client from '../../lib/apollo-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
       <DropdownProvider>
          <HistoryProvider>
            <ListsProvider>
              {children}
            </ListsProvider>
          </HistoryProvider>
       </DropdownProvider>
    </ApolloProvider>
  );
} 

