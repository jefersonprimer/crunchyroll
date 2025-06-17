'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CardFavoritesContextType {
  cardFavorites: Set<string>;
  toggleCardFavorite: (id: string) => void;
  isCardFavorite: (id: string) => boolean;
}

const CardFavoritesContext = createContext<CardFavoritesContextType | undefined>(undefined);

export const CardFavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cardFavorites, setCardFavorites] = useState<Set<string>>(() => {
    // Inicializa o estado com os favoritos do localStorage
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('cardFavorites');
      return storedFavorites ? new Set(JSON.parse(storedFavorites)) : new Set();
    }
    return new Set();
  });

  // Salvar favoritos no localStorage sempre que a lista mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (cardFavorites.size > 0) {
        localStorage.setItem('cardFavorites', JSON.stringify(Array.from(cardFavorites)));
      } else {
        localStorage.removeItem('cardFavorites');
      }
    }
  }, [cardFavorites]);

  const toggleCardFavorite = (id: string) => {
    setCardFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const isCardFavorite = (id: string) => cardFavorites.has(id);

  return (
    <CardFavoritesContext.Provider value={{ cardFavorites, toggleCardFavorite, isCardFavorite }}>
      {children}
    </CardFavoritesContext.Provider>
  );
};

export const useCardFavorites = () => {
  const context = useContext(CardFavoritesContext);
  if (context === undefined) {
    throw new Error('useCardFavorites must be used within a CardFavoritesProvider');
  }
  return context;
}; 