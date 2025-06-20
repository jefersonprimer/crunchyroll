'use client';

import React from 'react';
import { useHistory } from '@/app/[locale]/contexts/HistoryContext';
import { EpisodeCard } from '../cards/EpisodioCard';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const HistoryCarousel = () => {
  const { watchedEpisodes } = useHistory();
  const params = useParams();
  const locale = params.locale as string;

  if (!watchedEpisodes || watchedEpisodes.length === 0) {
    return null;
  }

  return (
    <div className="p-0 m-0 mx-auto text-left flex flex-col w-[1351px] min-h-[301.33px]">
      <div className="flex justify-between items-center bg-black p-0 m-0 mx-auto w-[1223px] h-[52px]">
        <h2 className="text-[1.75rem] font-bold text-white">Continue Assistindo</h2>
        <div className="flex items-center">
          <Link
            href={`/${locale}/history`}
            className="flex items-center text-[#A0A0A0] font-bold transition-colors duration-200 hover:text-white"
          >
            <span>VER HISTÓRICO</span>
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-labelledby="angle-svg"
              aria-hidden="true"
              role="img"
            >
              <title id="angle-svg">Próximo</title>
              <path d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z"></path>
            </svg>
          </Link>
        </div>
      </div>

      <div className="w-[1233px] flex items-start justify-start gap-[20px] p-0 m-0 mx-auto">
        {watchedEpisodes.slice(-4).map(({ episode, anime }) => (
          <div key={episode.id}>
            <EpisodeCard episode={episode} anime={anime} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryCarousel;
