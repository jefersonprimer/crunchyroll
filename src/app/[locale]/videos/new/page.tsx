"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import { Anime } from "@/types/anime";
import AnimeGrid from "../../../components/cards/AnimeGrid";
import { GET_LATEST_RELEASES } from "@/lib/queries/getLatestReleases";
import { FavoritesProvider } from "../../contexts/FavoritesContext";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import { useDropdown } from "@/hooks/useDropdown";
import Loading from "@/app/loading";

type AudioFilter = "subtitled_dubbed" | "subtitled" | "dubbed";

export default function NewReleasesPage() {
  const t = useTranslations('newReleases');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const router = useRouter();
  const [audioFilter, setAudioFilter] = useState<AudioFilter>("subtitled_dubbed");
  const { activeDropdown, toggleDropdown } = useDropdown();
  
  const { data, loading, error } = useQuery(GET_LATEST_RELEASES);

  useEffect(() => {
    if (data?.latestReleases) {
      let filtered = data.latestReleases;
      
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
  }, [data, audioFilter]);

  const handleAudioFilter = (filter: AudioFilter) => {
    setAudioFilter(filter);
    toggleDropdown(null);
  };

  const goToPopular = () => {
    router.push("/videos/popular");
  };

  const goToNewReleases = () => {
    router.push("/videos/new");
  };

  const goToAlphabeticOrder = () => {
    router.push("/videos/alphabetical");
  };

  if (loading) return <Loading/>;
  if (error) return <div className={styles.error}>{error.message}</div>;

  
  return (
    <div>
      <Header/>
      <FavoritesProvider>
        <div className={styles.newReleasesContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>{t('title')}</h1>
            <div className={styles.filtersContainer}>
                <div className={styles.filters}>
                  <div
                    onClick={() => toggleDropdown('filter')}
                    className={`${styles.svgBtn} ${activeDropdown === 'filter' ? styles.active : ''}`}
                  >
                    <svg
                      className={styles.svgIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-labelledby="sort-svg"
                      aria-hidden="true"
                      role="img"
                    >
                      <title id="sort-svg">{t('filters.sort.label')}</title>
                      <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z"></path>
                    </svg>
                    <span className={styles.maisPopulares}>{t('latestReleases')}</span>
                  </div>
                  {activeDropdown === 'filter' && (
                    <div className={styles.filterOptions}>
                      <div onClick={goToPopular} className={styles.item}>
                        {t('filters.sort.options.mostPopular')}
                      </div>
                      <div onClick={goToNewReleases} className={styles.item}>
                        {t('filters.sort.options.newest')}
                      </div>
                      <div onClick={goToAlphabeticOrder} className={styles.item}>
                        {t('filters.sort.options.alphabetical')}
                      </div>
                    </div>
                  )}
                </div>
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
          </div>
          <div className={styles.gridPopular}>
            <h1 className={styles.newTitle}>{t('subtitle')}</h1>
            <div>
              <AnimeGrid animes={filteredAnimes} />
            </div>
          </div>
        </div>
      </FavoritesProvider>
      <Footer/>
    </div>
  );
}