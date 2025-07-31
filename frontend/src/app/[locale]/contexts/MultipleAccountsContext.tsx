'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useMultipleAccounts, MultipleAccountsHook } from '@/app/[locale]/hooks/useMultipleAccounts';

const MultipleAccountsContext = createContext<MultipleAccountsHook | undefined>(undefined);

interface MultipleAccountsProviderProps {
  children: ReactNode;
}

export const MultipleAccountsProvider: React.FC<MultipleAccountsProviderProps> = ({ children }) => {
  const multipleAccountsHook = useMultipleAccounts();

  return (
    <MultipleAccountsContext.Provider value={multipleAccountsHook}>
      {children}
    </MultipleAccountsContext.Provider>
  );
};

export const useMultipleAccountsContext = () => {
  const context = useContext(MultipleAccountsContext);
  if (context === undefined) {
    throw new Error('useMultipleAccountsContext must be used within a MultipleAccountsProvider');
  }
  return context;
}; 