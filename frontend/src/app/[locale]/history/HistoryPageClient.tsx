'use client';

import React from 'react';
import { useHistory } from '../contexts/HistoryContext';
import { EpisodeCard } from '@/app/[locale]/history/components/EpisodeCard';
import { useTranslations } from 'next-intl';

const SkeletonEpisodeCard = () => (
  <div className="relative w-64 h-auto min-h-[264px] overflow-hidden transition-all duration-300 ease-in-out box-border mx-auto flex justify-center items-center">
    <div className="relative w-[240px] h-auto min-h-[249px] overflow-hidden block box-border">
      <div className="relative w-full h-[135px] mx-auto bg-[#2a2a2a] box-border">
        <div className="absolute top-0 left-0 w-full h-full bg-[#141519] animate-pulse" />
      </div>
      <div className="w-full h-[114px] mx-auto flex flex-col gap-1 relative z-10">
        <div className="w-4/5 h-5 bg-[#141519] animate-pulse mt-2.5 mb-2" />
        <div className="w-1/2 h-4 bg-[#141519] animate-pulse mt-2" />
      </div>
    </div>
  </div>
);


const HistoryPageClient = () => {
  const t = useTranslations('History');
  const { watchedEpisodes, clearHistory, loading } = useHistory();

  const onClear = () => {
    clearHistory();
  };

  return (
    <div className="flex justify-center items-center w-full mx-auto  max-w-[1066px]">
      {loading ? (
        <div className="w-full max-w-[1050px]">
          <div className="flex justify-between items-center gap-4 w-full max-w-[1050px] h-[44px] mb-2 mx-auto">
            <div className="flex-1 min-w-0">
              <div className="h-10 w-88 bg-[#141519] animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="w-32 h-10 bg-[#141519] animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {Array.from({ length: 8 }).map((_, idx) => (
              <SkeletonEpisodeCard key={idx} />
            ))}
          </div>
        </div>
      ) : watchedEpisodes.length === 0 ? (
        <div className="w-full md:max-w-[1050px] mx-auto border border-dashed border-gray-400 p-8 flex flex-col items-center">
         
            <div className="mb-4 flex justify-center">
              <img
                src="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-history.png"
                srcSet="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-history@2x.png 2x, https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-history@3x.png 3x"
                alt="Empty history"
                className="w-60 h-60 object-contain"
              />
            </div>
            <h4 className="text-[#dadada] mb-[1rem] leading-[1.5] text-center">
              Este é um momento... histórico. <br />Comece a assistir para preencher esta lista.
            </h4>
            <div>
              <a
                tabIndex={0}
                className="inline-block py-2 px-4 bg-[#FF640A] opacity-90 hover:opacity-100 cursor-pointer"
                data-t="go-to-home-btn"
                href="/pt-br/"
              >
                <span className="text-sm text-black no-underline font-semibold uppercase">Voltar para tela inicial</span>
              </a>
            </div>
        </div>
      ) : (
        <div className="w-full items-center justify-center mx-auto  max-w-[1066px]">
          <div className="flex w-full justify-between items-center mb-[10px] mx-auto px-4 lg:px-0  max-w-[1050px]">
            <h2 className="text-xl font-semibold text-white">{t('historyHeaderTitle')}</h2>
            <button onClick={onClear} className="py-[8px] px-[16px] cursor-pointer">
              <span className="text-sm text-[#A0A0A0] hover:text-white font-bold uppercase">{t('clearHistory')}</span>
            </button>
          </div>
          <div className="w-full md:max-w-6xl mx-auto md:grid md:grid-cols-3 lg:grid-cols-4 lg:gap-4 lg:px-0 max-w-[1066px] px-2">
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
      )}
    </div>
  );
};

export default HistoryPageClient;
