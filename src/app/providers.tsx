'use client';

import { HistoryProvider } from './[locale]/contexts/HistoryContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HistoryProvider>
      {children}
    </HistoryProvider>
  );
} 

