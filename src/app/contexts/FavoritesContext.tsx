'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Anime } from "@/types/anime";

type Favorite = Anime;

interface FavoritesContextType {
  favorites: Favorite[];
  addFavorite: (anime: Favorite) => void;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    // Inicializa o estado com os favoritos do localStorage
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    return [];
  });

  // Salvar favoritos no localStorage sempre que a lista mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (favorites.length > 0) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
      } else {
        localStorage.removeItem('favorites');
      }
    }
  }, [favorites]);

  const addFavorite = (anime: Favorite) => {
    setFavorites((prevFavorites) => {
      // Verifica se o anime já está nos favoritos
      if (prevFavorites.some(fav => fav.id === anime.id)) {
        return prevFavorites;
      }
      
      // Verifica se a lista já tem 100 itens
      if (prevFavorites.length >= 100) {
        alert('Você atingiu o limite máximo de 100 favoritos.');
        return prevFavorites;
      }
  
      // Adiciona o novo favorito à lista
      return [...prevFavorites, anime];
    });
  };  

  const removeFavorite = (id: string) => {
    setFavorites((prevFavorites) => 
      prevFavorites.filter(favorite => favorite.id !== id)
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
