'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from '@/lib/queries/getAnimes';
import AnimeCarouselGenre from '../../../../components/carousel/AnimeCarouselGenre';
import styles from './styles.module.css';
import { useTranslations } from 'next-intl';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useDropdown } from '@/app/[locale]/hooks/useDropdown';
import { Anime } from '@/types/anime';
import { FavoritesProvider } from '@/app/[locale]/contexts/FavoritesContext';

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
      <Header/>
      <FavoritesProvider>
        <div className={styles.mainContainer}>
          <div className={styles.headerContainer}>
            <h1 className={styles.mainTitle}>{t('genrePopularPage.title', { genre: genreInfo.pt })}</h1>
            <div className={styles.filters}>
              <div
                onClick={() => toggleDropdown('audio')}
                className={`${styles.svgBtn} ${activeDropdown === 'audio' ? styles.active : ''}`}
              >
                <svg
                  className={styles.svgIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="filter-svg"
                  aria-labelledby="filter-svg"
                  aria-hidden="true"
                  role="img">
                  <path fillRule="evenodd" d="M9 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2M3 8a1 1 0 0 1 0-2h2.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21a1 1 0 0 1 0 2h-8.142c-.447 1.72-2 3-3.858 3S5.589 9.72 5.142 8H3zm12 11c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2zm6-3a1 1 0 0 1 0 2h-2.142c-.447 1.72-2 3-3.858 3s-3.411-1.28-3.858-3H3a1 1 0 0 1 0-2h8.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21z">
                  </path>
                </svg>
                <span className={styles.maisPopulares}>{t('filters.audio.label')}</span>
              </div>
              {activeDropdown === 'audio' && (
                <div className={styles.filterOptions}>
                  <span className={styles.idioma}>{t('filters.audio.language')}</span>
                  <div 
                    onClick={() => handleAudioFilter("subtitled_dubbed")} 
                    className={styles.item}
                    data-selected={audioFilter === "subtitled_dubbed"}
                  >
                    <span className={styles.radioButton}></span>
                    {t('filters.audio.options.all')}
                  </div>
                  <div 
                    onClick={() => handleAudioFilter("subtitled")} 
                    className={styles.item}
                    data-selected={audioFilter === "subtitled"}
                  >
                    <span className={styles.radioButton}></span>
                    {t('filters.audio.options.subtitled')}
                  </div>
                  <div 
                    onClick={() => handleAudioFilter("dubbed")} 
                    className={styles.item}
                    data-selected={audioFilter === "dubbed"}
                  >
                    <span className={styles.radioButton}></span>
                    {t('filters.audio.options.dubbed')}
                  </div>
                </div>
              )}
            </div>
          </div>
          <AnimeCarouselGenre animes={filteredAnimes} />
        </div>
      </FavoritesProvider>
      <Footer/>
    </div>
  );
};

export default GenrePopularPage;
