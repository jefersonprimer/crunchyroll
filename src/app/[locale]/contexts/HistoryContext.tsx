// contexts/HistoryContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Episode } from '@/types/episode';
import { Anime } from '@/types/anime';

interface HistoryContextType {
  watchedEpisodes: Array<{
    episode: Episode;
    anime: Anime;
    watchedAt: string;
  }>;
  addToHistory: (episode: Episode, anime: Anime) => void;
  clearHistory: () => void;
  removeFromHistory: (episodeId: string) => void;
  loading: boolean;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const defaultHistory: Array<{
  episode: Episode;
  anime: Anime;
  watchedAt: string;
}> = [];

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchedEpisodes, setWatchedEpisodes] = useState<Array<{
    episode: Episode;
    anime: Anime;
    watchedAt: string;
  }>>(defaultHistory);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load history from localStorage only once on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const savedHistory = localStorage.getItem('watchHistory');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          setWatchedEpisodes(parsedHistory);
        } else {
          console.error('Invalid history format in localStorage');
          localStorage.removeItem('watchHistory');
        }
      }
    } catch (error) {
      console.error('Error loading history from localStorage:', error);
      localStorage.removeItem('watchHistory');
    }
    setLoading(false);
  }, []); // Empty dependency array ensures this only runs once

  // Memoize the addToHistory function
  const addToHistory = useCallback((episode: Episode, anime: Anime) => {
    if (!isClient) return;
    
    setWatchedEpisodes(prevEpisodes => {
      const newHistory = [
        {
          episode,
          anime,
          watchedAt: new Date().toISOString(),
        },
        ...prevEpisodes.filter(
          (item) => item.episode.id !== episode.id
        ),
      ].slice(0, 50);

      try {
        localStorage.setItem('watchHistory', JSON.stringify(newHistory));
      } catch (error) {
        console.error('Error saving history to localStorage:', error);
      }

      return newHistory;
    });
  }, [isClient]);

  // Memoize the clearHistory function
  const clearHistory = useCallback(() => {
    if (!isClient) return;
    
    setWatchedEpisodes(defaultHistory);
    try {
      localStorage.removeItem('watchHistory');
    } catch (error) {
      console.error('Error clearing history from localStorage:', error);
    }
  }, [isClient]);

  // Add removeFromHistory function
  const removeFromHistory = useCallback((episodeId: string) => {
    if (!isClient) return;
    
    setWatchedEpisodes(prevEpisodes => {
      const newHistory = prevEpisodes.filter(item => item.episode.id !== episodeId);
      
      try {
        if (newHistory.length > 0) {
          localStorage.setItem('watchHistory', JSON.stringify(newHistory));
        } else {
          localStorage.removeItem('watchHistory');
        }
      } catch (error) {
        console.error('Error updating history in localStorage:', error);
      }

      return newHistory;
    });
  }, [isClient]);

  const value = React.useMemo(() => ({
    watchedEpisodes,
    addToHistory,
    clearHistory,
    removeFromHistory,
    loading,
  }), [watchedEpisodes, addToHistory, clearHistory, removeFromHistory, loading]);

  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
