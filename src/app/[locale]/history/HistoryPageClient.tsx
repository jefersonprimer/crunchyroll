'use client';

import React, { useState, useEffect } from 'react';
import { useHistory } from '../contexts/HistoryContext';
import { EpisodeCard } from '@/app/[locale]/history/components/EpisodeCard';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import TabsNavigation from '@/app/components/layout/TabsNavigation';
import { ClientMetadata } from '@/app/components/metadata/ClientMetadata';

const HistoryPageClient = () => {
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
      case 'crunchylists':
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
        <div className="flex flex-col items-center justify-center py-[48px] px-[20px] text-center">
          <h2 className='font-medium text-[24px] text-white mb-[8px]'>Carregando...</h2>
        </div>
      );
    }

    if (watchedEpisodes.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-[48px] px-[20px] text-center">
          <h2 className='font-medium text-[24px] text-white mb-[8px]'>Nenhum episódio assistido</h2>
          <p className='font-medium text-[24px] text-white'>Os episódios que você assistir aparecerão aqui.</p>
        </div>
      );
    }

    return (
      <div className="w-[1066px]">
        <div className="flex w-[1050px] justify-between items-center mb-[10px] py-0 px-[5px]">
          <h2 className="text-[20px] font-semibold text-white">{t('historyHeaderTitle')}</h2>
          <button onClick={clearHistory} className="py-[8px] px-[16px] cursor-pointer">
            <span className="text-[#A0A0A0] hover:text-white font-bold">{t('clearHistory')}</span>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-[5px]">
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
    <div>

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
    </div>
  );
};

export default HistoryPageClient;
