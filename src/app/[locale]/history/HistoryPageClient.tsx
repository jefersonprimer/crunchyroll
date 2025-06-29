'use client';

import React from 'react';
import { useHistory } from '../contexts/HistoryContext';
import { EpisodeCard } from '@/app/[locale]/history/components/EpisodeCard';
import { useTranslations } from 'next-intl';
import HistoryHeader from './components/HistoryHeader';
import PageLoading from '@/app/components/loading/PageLoading';

const HistoryPageClient = () => {
  const t = useTranslations('History');
  const { watchedEpisodes, clearHistory, loading } = useHistory();

  const renderHistoryContent = () => {
    if (loading) {
      return <PageLoading />;
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
        <HistoryHeader onClear={clearHistory} title={t('historyHeaderTitle')} />
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
    <div className="flex justify-center items-center w-[1066px] p-0 m-0">
      {renderHistoryContent()}
    </div>
  );
};

export default HistoryPageClient;
