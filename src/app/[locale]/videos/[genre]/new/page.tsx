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
import type { Anime } from '@/types/anime';
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

const GenreNewPage: React.FC = () => {
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
    <div className="min-h-screen flex flex-col">
      <ClientMetadata
        title={`Animes, Séries de ${genre} - Novidades - Crunchyroll`}
        description={`Animes, Séries de ${genre} - Novidades - Crunchyroll`}
      />
    <Header />
    
    <main className="flex-1 px-8 py-8 max-w-full mx-auto">
      <div className="flex flex-col">
        {/* Header com título e filtros */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('title', { genre: genreInfo.pt })}
          </h1>
          
          {/* Filtro de áudio */}
          <div className="relative">
            {/* Botão do filtro */}
            <button
              onClick={() => toggleDropdown('audio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeDropdown === 'audio'
                  ? 'bg-gray-200 dark:bg-gray-700'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <svg
                className="w-5 h-5 text-gray-900 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M9 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2M3 8a1 1 0 0 1 0-2h2.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21a1 1 0 0 1 0 2h-8.142c-.447 1.72-2 3-3.858 3S5.589 9.72 5.142 8H3zm12 11c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2zm6-3a1 1 0 0 1 0 2h-2.142c-.447 1.72-2 3-3.858 3s-3.411-1.28-3.858-3H3a1 1 0 0 1 0-2h8.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {t('filters.audio.label')}
              </span>
            </button>
  
            {/* Dropdown do filtro */}
            {activeDropdown === 'audio' && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                <div className="p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {t('filters.audio.language')}
                  </p>
                  
                  {/* Opções do filtro */}
                  <div className="space-y-1">
                    {[
                      { value: "subtitled_dubbed", label: t('filters.audio.options.all') },
                      { value: "subtitled", label: t('filters.audio.options.subtitled') },
                      { value: "dubbed", label: t('filters.audio.options.dubbed') }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAudioFilter(option.value as AudioFilter)}
                        className={`flex items-center w-full px-2 py-2 text-sm rounded-md ${
                          audioFilter === option.value
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className={`inline-block w-4 h-4 mr-2 rounded-full border ${
                          audioFilter === option.value
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-400 dark:border-gray-500'
                        }`} />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
  
        {/* Carrossel de animes */}
        <AnimeCarouselGenre animes={filteredAnimes} />
      </div>
    </main>
  
    <Footer />
  </div>
  );
};

export default GenreNewPage;
