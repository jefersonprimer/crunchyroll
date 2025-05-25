'use client';

import { HistoryProvider } from './contexts/HistoryContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HistoryProvider>
      {children}
    </HistoryProvider>
  );
} 