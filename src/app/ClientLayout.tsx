'use client';

import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import { ListsProvider } from './[locale]/contexts/ListsContext';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';

import Header from "./components/layout/Header";
import Footer from './components/layout/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <div>   {/* className="pt-[60px]" */}
        <ListsProvider>
          {children}
        </ListsProvider>
      </div>
      
    </ApolloProvider>
  );
} 

