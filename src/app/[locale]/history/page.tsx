'use client';

import React, { useState, useEffect } from 'react';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import { useHistory } from '../contexts/HistoryContext';
import styles from './styles.module.css';
import { EpisodeCard } from '@/app/[locale]/history/components/EpisodeCard';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import TabsNavigation from '@/app/components/layout/TabsNavigation';

const HistoryPage = () => {
  const t = useTranslations('History');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { watchedEpisodes, clearHistory } = useHistory();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  let selectedTab = 'historico';
  if (pathname.includes('watchlist')) selectedTab = 'fila';
  else if (pathname.includes('crunchylists')) selectedTab = 'crunchylists';

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case 'fila':
        router.push('/watchlist');
        break;
      case 'crunchylist':
        router.push('/crunchylists');
        break;
      default:
        break;
    }
  };

  if (!isMounted) {
    return null;
  }

  const renderHistoryContent = () => {
    if (!watchedEpisodes) {
      return (
        <div className={styles.emptyState}>
          <h2>Carregando...</h2>
        </div>
      );
    }

    if (watchedEpisodes.length === 0) {
      return (
        <div className={styles.emptyState}>
          <h2>Nenhum episódio assistido</h2>
          <p>Os episódios que você assistir aparecerão aqui.</p>
        </div>
      );
    }

    return (
      <div className={styles.historyContainer}>
        <div className={styles.historyHeader}>
          <h2>{t('historyHeaderTitle')}</h2>
          <button onClick={clearHistory} className={styles.clearButton}>
            <span className='text-[#A0A0A0] font-bold'>{t('clearHistory')}</span>
          </button>
        </div>
        <div className={styles.episodesGrid}>
          {watchedEpisodes.map(({ episode, anime, watchedAt }) => (
            <EpisodeCard 
              key={episode.id} 
              episode={episode} 
              anime={anime} 
              watchedAt={watchedAt}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <FavoritesProvider>
      <Header/>
      <TabsNavigation
        selectedTab={selectedTab}
        onTabChange={handleTabClick}
        labels={{
          fila: t('queue'),
          crunchylists: t('crunchylists'),
          historico: t('history'),
          'Minhas Listas': t('title')
        }}
      >
        {renderHistoryContent()}
        
      </TabsNavigation>
      <Footer/>
    </FavoritesProvider>
  );
};

export default HistoryPage;
