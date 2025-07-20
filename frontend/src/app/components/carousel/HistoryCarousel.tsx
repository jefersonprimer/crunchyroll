'use client';

import React, { useState, useEffect } from 'react';
import { useHistory } from '@/app/[locale]/contexts/HistoryContext';
import { EpisodeCard } from '../cards/EpisodeCard';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useOnScreen } from '@/app/[locale]/hooks/useOnScreen';

interface HistoryCarouselProps {
  useOnScreen?: boolean;
}

const HistoryCarousel: React.FC<HistoryCarouselProps> = ({ useOnScreen: useOnScreenProp = true }) => {
  const { watchedEpisodes } = useHistory();
  const params = useParams();
  const locale = params.locale as string;
  const [isClient, setIsClient] = useState(false);

  const { ref, isIntersecting } = useOnScreenProp
    ? useOnScreen({ threshold: 0.1 })
    : { ref: undefined, isIntersecting: true };

  const [canLoad, setCanLoad] = useState(!useOnScreenProp);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (useOnScreenProp && isIntersecting) {
      setCanLoad(true);
    }
    if (!useOnScreenProp) {
      setCanLoad(true);
    }
  }, [isIntersecting, useOnScreenProp]);

  if (!isClient) {
    return null;
  }

  if (!canLoad) {
    return (
      <div ref={useOnScreenProp ? ref : undefined} className="p-0 m-0 mx-auto text-left flex flex-col w-auto lg:w-[1351px] h-auto lg:min-h-[301.33px]">
        <div className="flex justify-between items-center bg-black p-0 m-0 mx-auto w-auto lg:w-[1223px]  h-auto lg:h-[52px]">
          <h2 className="text-[1.75rem] font-bold text-white">Continue Assistindo</h2>
        </div>
        <div
          className="w-auto lg:w-[1233px] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px] p-0 m-0 mx-auto"
        >
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="card relative flex-none w-full h-[273.33px] overflow-visible cursor-pointer text-left opacity-70 animate-pulse"
              style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}
            >
              <div style={{ width: '100%', height: '160px', position: 'relative', marginBottom: 8 }}>
                <div style={{ width: '100%', height: '100%', background: '#141519'}} />
              </div>
              <div style={{ paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ width: '80%', height: 20, background: '#141519', marginBottom: 8 }} />
                <div style={{ width: '50%', height: 16, background: '#141519' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!watchedEpisodes || watchedEpisodes.length === 0) {
    return null;
  }

  return (
    <div ref={useOnScreenProp ? ref : undefined} className="p-0 m-0 lg:mx-auto text-left flex flex-col w-auto lg:w-[1351px] h-auto lg:min-h-[301.33px]">
      <div className="flex justify-between lg:items-center bg-black p-0 m-0 lg:mx-auto w-auto lg:w-[1223px] h-auto lg:h-[52px] px-4 md:px-0 ">
        <h2 className="text-[1.75rem] font-bold text-white">Continue Assistindo</h2>
        <div className="flex items-center">
          <Link
            href={`/${locale}/history`}
            className="flex items-center text-[#A0A0A0] font-bold transition-colors duration-200 hover:text-white"
          >
            <span className="hidden md:inline">VER HISTÓRICO</span>
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

      <div className="w-auto lg:w-[1233px] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-2 lg:gap-4 p-0 px-4 md:px-0 m-0 lg:mx-auto">
        {watchedEpisodes.slice(-4).map(({ episode, anime }) => (
          <div key={episode.id} className="w-full">
            <EpisodeCard episode={episode} anime={anime} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryCarousel;
