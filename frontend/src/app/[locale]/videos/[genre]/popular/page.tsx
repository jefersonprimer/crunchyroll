'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from '@/lib/queries/getAnimes';
import AnimeCarouselGenre from '../../../../components/carousel/AnimeCarouselGenre';
import { useTranslations } from 'next-intl';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useDropdown } from '@/app/[locale]/hooks/useDropdown';
import { Anime } from '@/types/anime';
import { ClientMetadata } from '@/app/components/metadata/ClientMetadata';

type AudioFilter = "subtitled_dubbed" | "subtitled" | "dubbed";

interface Genre {
  id: string;
  name: string;
}

const genreMapping: Record<string, { en: string; pt: string }> = {
  action: { en: "Action", pt: "Ação" },
  adventure: { en: "Adventure", pt: "Aventura" },
  comedy: { en: "Comedy", pt: "Comédia" },
  drama: { en: "Drama", pt: "Drama" },
  fantasy: { en: "Fantasy", pt: "Fantasia" },
  historical: { en: "Historical", pt: "Histórico" },
  "post-apocalyptic": { en: "Post-Apocalyptic", pt: "Pós-Apocalíptico" },
  "sci-fi": { en: "Sci-Fi", pt: "Ficção Científica" },
  supernatural: { en: "Supernatural", pt: "Sobrenatural" },
  thriller: { en: "Thriller", pt: "Suspense" },
  romance: { en: "Romance", pt: "Romance" },
  shonen: { en: "Shonen", pt: "Shonen" },
  shojo: { en: "Shojo", pt: "Shojo" },
};

const GenrePopularPage: React.FC = () => {
  const t = useTranslations('genre');
  const params = useParams();
  const genre = params.genre as string;
  const genreInfo = genreMapping[genre];
  const { data, loading, error } = useQuery(GET_ANIMES);
  const [audioFilter, setAudioFilter] = useState<AudioFilter>("subtitled_dubbed");
  const { activeDropdown, toggleDropdown } = useDropdown();
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    if (data?.animes) {
      let filtered = data.animes.filter((anime: Anime) =>
        anime.genres?.some((g: Genre) => g.name === genreInfo.en)
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
  }, [data, audioFilter, genreInfo.en]);

  const handleAudioFilter = (filter: AudioFilter) => {
    setAudioFilter(filter);
    toggleDropdown(null);
  };

  if (!genreInfo) {
    return <p>{t('genreNotFound', { genre })}</p>;
  }

  if (loading) return <p>{t('loading')}</p>;
  if (error) return <p>{t('error', { error: error.message })}</p>;

  return (
    <div>
      <ClientMetadata
        title={`Animes, Séries de ${genre} - Em Alta - Crunchyroll`}
        description={`Animes, Séries de ${genre} - Em Alta - Crunchyroll`}
      />
    <Header />
    <div className="px-8 py-8 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        {/* Título principal */}
        <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
          {t('genrePopularPage.title', { genre: genreInfo.pt })}
        </h1>
  
        {/* Filtros */}
        <div className="relative">
          {/* Botão do filtro */}
          <div
            onClick={() => toggleDropdown('audio')}
            className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
              activeDropdown === 'audio' ? 'bg-gray-200 dark:bg-gray-600' : ''
            }`}
          >
            <svg
              className="w-5 h-5 fill-current text-gray-900 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-t="filter-svg"
              aria-labelledby="filter-svg"
              aria-hidden="true"
              role="img"
            >
              <path
                fillRule="evenodd"
                d="M9 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2M3 8a1 1 0 0 1 0-2h2.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21a1 1 0 0 1 0 2h-8.142c-.447 1.72-2 3-3.858 3S5.589 9.72 5.142 8H3zm12 11c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2zm6-3a1 1 0 0 1 0 2h-2.142c-.447 1.72-2 3-3.858 3s-3.411-1.28-3.858-3H3a1 1 0 0 1 0-2h8.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21z"
              ></path>
            </svg>
            <span className="text-sm text-gray-900 dark:text-white">
              {t('filters.audio.label')}
            </span>
          </div>
  
          {/* Dropdown do filtro */}
          {activeDropdown === 'audio' && (
            <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-700 rounded shadow-lg p-4 min-w-[200px] z-10">
              <span className="block text-xs text-gray-500 dark:text-gray-300 mb-2">
                {t('filters.audio.language')}
              </span>
              
              {/* Opção Todos */}
              <div
                onClick={() => handleAudioFilter("subtitled_dubbed")}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                  audioFilter === "subtitled_dubbed" 
                    ? 'bg-gray-100 dark:bg-gray-600' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <span className={`w-4 h-4 rounded-full border-2 ${
                  audioFilter === "subtitled_dubbed" 
                    ? 'border-orange-500 after:content-[""] after:block after:w-2 after:h-2 after:rounded-full after:bg-orange-500 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2' 
                    : 'border-gray-400 dark:border-gray-300'
                } relative`}></span>
                {t('filters.audio.options.all')}
              </div>
              
              {/* Opção Legendado */}
              <div
                onClick={() => handleAudioFilter("subtitled")}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                  audioFilter === "subtitled" 
                    ? 'bg-gray-100 dark:bg-gray-600' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <span className={`w-4 h-4 rounded-full border-2 ${
                  audioFilter === "subtitled" 
                    ? 'border-orange-500 after:content-[""] after:block after:w-2 after:h-2 after:rounded-full after:bg-orange-500 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2' 
                    : 'border-gray-400 dark:border-gray-300'
                } relative`}></span>
                {t('filters.audio.options.subtitled')}
              </div>
              
              {/* Opção Dublado */}
              <div
                onClick={() => handleAudioFilter("dubbed")}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                  audioFilter === "dubbed" 
                    ? 'bg-gray-100 dark:bg-gray-600' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <span className={`w-4 h-4 rounded-full border-2 ${
                  audioFilter === "dubbed" 
                    ? 'border-orange-500 after:content-[""] after:block after:w-2 after:h-2 after:rounded-full after:bg-orange-500 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2' 
                    : 'border-gray-400 dark:border-gray-300'
                } relative`}></span>
                {t('filters.audio.options.dubbed')}
              </div>
            </div>
          )}
        </div>
      </div>
  
      {/* Carrossel de animes */}
      <AnimeCarouselGenre animes={filteredAnimes} />
    </div>
    <Footer />
  </div>
  );
};

export default GenrePopularPage;
