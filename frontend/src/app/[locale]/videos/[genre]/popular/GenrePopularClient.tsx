'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import AnimeCarouselGenre from '../../../../components/carousel/AnimeCarouselGenre';
import { Anime } from '@/types/anime';
import AudioDropdown from './AudioDropdown';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export type AudioFilter = "subtitled_dubbed" | "subtitled" | "dubbed";

interface GenrePopularClientProps {
  animes: Anime[];
  genre: string;
  genreInfo?: { en: string; pt: string };
  error?: any;
  audioFilter: AudioFilter;
}

const GenrePopularClient: React.FC<GenrePopularClientProps> = ({ animes, genre, genreInfo, error, audioFilter }) => {
  const t = useTranslations('genre');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    if (animes && genreInfo) {
      let filtered = animes.filter((anime: Anime) =>
        anime.genres?.some((g: any) => g.name === genreInfo.en)
      );
      if (audioFilter !== "subtitled_dubbed") {
        filtered = filtered.filter((anime: Anime) => {
          if (audioFilter === "dubbed") {
            return anime.audioType === "dubbed" || anime.audioType === "subtitled_dubbed";
          }
          return anime.audioType === audioFilter;
        });
      }
      setFilteredAnimes(filtered);
    }
  }, [animes, audioFilter, genreInfo]);

  if (error) {
    return <p>{t('error', { error: error.message })}</p>;
  }

  if (!genreInfo) {
    return <p>{t('genreNotFound', { genre })}</p>;
  }

  // Build base path for links
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = pathname.split('/')[1];
  const genrePath = pathname;

  // Handler to update the URL with the new filter
  const handleAudioChange = (filter: AudioFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === 'subtitled_dubbed') {
      params.delete('lang');
    } else {
      params.set('lang', filter);
    }
    router.replace(`${genrePath}${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <>
      <div className="px-8 py-8 max-w-full mx-auto w-[1066px] my-0 mb-8">
        <div className="flex justify-between items-center mb-8">
          {/* Título principal */}
          <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            {t('genrePopularPage.titlePage', { genre: genreInfo.pt })}
          </h1>

          {/* Filtros */}
          <AudioDropdown audioFilter={audioFilter} onChange={handleAudioChange as (filter: string) => void} />
        </div>
        {/* Carrossel de animes */}
        <AnimeCarouselGenre animes={filteredAnimes} />
      </div>
    </>
  );
};

export default GenrePopularClient; 