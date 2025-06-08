import React, { createContext, useContext, useState, ReactNode } from 'react';

type FilterState = {
  favoritos: boolean;
  idioma: 'todos' | 'legendado' | 'dublado';
  tipoMidia: 'todos' | 'animes' | 'filmes';
};

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({
    favoritos: false,
    idioma: 'todos',
    tipoMidia: 'todos',
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}; 