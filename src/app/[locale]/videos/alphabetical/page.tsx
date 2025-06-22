"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import { Anime } from "@/types/anime";
import Link from "next/link";
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import { FavoritesProvider } from "../../contexts/FavoritesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { useFavorites } from "../../contexts/FavoritesContext";
import MaturityRating from "../../../components/elements/MaturityRating";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { useDropdown } from "@/hooks/useDropdown";
import Loading from "@/app/loading";
import { AudioType } from "@/types/enums";
import AnimeCard from "./components/AnimeCard";

type AudioFilter = "subtitled_dubbed" | "subtitled" | "dubbed";

const AnimeList = () => {
  const t = useTranslations('alphabetical');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [activeLetter, setActiveLetter] = useState<string>("#");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [audioFilter, setAudioFilter] = useState<AudioFilter>("subtitled_dubbed");
  const { activeDropdown, toggleDropdown } = useDropdown();
  const router = useRouter();
  const { favorites } = useFavorites();
  
  const { data, loading, error } = useQuery(GET_ANIMES);

  useEffect(() => {
    if (data?.animes) {
      let filtered = data.animes;
      
      // Apply letter filter
      if (activeLetter !== "#") {
        filtered = filtered.filter(
          (anime: Anime) => anime.name[0].toUpperCase() === activeLetter.toUpperCase()
        );
      }
      
      // Apply audio filter
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
  }, [data, activeLetter, audioFilter]);

  // Função para filtrar os animes por letra
  const handleLetterClick = (letter: string) => {
    setActiveLetter(letter);

    if (letter === "#") {
      setFilteredAnimes(data?.animes || []); // Mostra todos os animes
    } else {
      const filtered = data?.animes.filter(
        (anime: Anime) => anime.name[0].toUpperCase() === letter.toUpperCase()
      );
      setFilteredAnimes(filtered || []);
    }
  };

  // Função para ativar/desativar o menu de filtros
  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  // Funções para navegação por filtros
  const goToPopular = () => {
    router.push("/videos/popular");
  };

  const goToNewReleases = () => {
    router.push("/videos/new");
  };

  const goToAlphabeticOrder = () => {
    router.push("/videos/alphabetical");
  };

  const handleAudioFilter = (filter: AudioFilter) => {
    setAudioFilter(filter);
    toggleDropdown(null);
  };

  // Geração de letras para o filtro
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  if (loading) return <Loading/>;
  if (error) return <div className={styles.error}>{error.message}</div>;

  return (
    <div>
      <Header/>
      <div className={styles.glossaryContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('title')}</h1>
          {/* Filtro de Ordem Alfabética e as opções */}
          <div className={styles.filtersContainer}>
            <div className={styles.filters}>
              <div onClick={toggleFilterOptions} className={styles.svgBtn}>
                <svg
                  className={styles.svgIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-labelledby="sort-svg"
                  aria-hidden="true"
                  role="img"
                >
                  <title id="sort-svg">{t('sort.title')}</title>
                  <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z"></path>
                </svg>
                <span className={styles.ordemAlfabetica}>{t('filters.alphabetical')}</span>
              </div>
              {showFilterOptions && (
                <div className={styles.filterOptions}>
                  <div onClick={goToPopular} className={styles.item}>
                    {t('filters.mostPopular')}
                  </div>
                  <div onClick={goToNewReleases} className={styles.item}>
                    {t('filters.mostRecent')}
                  </div>
                  <div onClick={goToAlphabeticOrder} className={styles.item}>
                    {t('filters.alphabeticalOrder')}
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
                  <title id="filter-svg">{t('filter.title')}</title>
                  <path fillRule="evenodd" d="M9 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2M3 8a1 1 0 0 1 0-2h2.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21a1 1 0 0 1 0 2h-8.142c-.447 1.72-2 3-3.858 3S5.589 9.72 5.142 8H3zm12 11c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2zm6-3a1 1 0 0 1 0 2h-2.142c-.447 1.72-2 3-3.858 3s-3.411-1.28-3.858-3H3a1 1 0 0 1 0-2h8.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21z">
                  </path>
                </svg>
                <span className={styles.maisPopulares}>{t('filters.filter')}</span>
              </div>
              {activeDropdown === 'audio' && (
                <div className={styles.filterOptions}>
                  <span className={styles.idioma}>{t('filters.language')}</span>
                  <div
                    onClick={() => handleAudioFilter("subtitled_dubbed")}
                    className={styles.item}
                    data-selected={audioFilter === "subtitled_dubbed"}
                  >
                    <span className={styles.radioButton}></span>
                      {t('filters.all')}
                  </div>
                  <div
                    onClick={() => handleAudioFilter(AudioType.SUBTITLED)}
                    className={styles.item}
                    data-selected={audioFilter === AudioType.SUBTITLED}
                  >
                    <span className={styles.radioButton}></span>
                      {t('filters.subtitled')}
                  </div>
                  <div
                    onClick={() => handleAudioFilter(AudioType.DUBBED)}
                    className={styles.item}
                    data-selected={audioFilter === AudioType.DUBBED}
                  >
                    <span className={styles.radioButton}></span>
                    {t('filters.dubbed')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Filtro de letras */}
        <div className={styles.letterFilter}>
          <button
            className={activeLetter === "#" ? styles.activeLetter : ""}
            onClick={() => handleLetterClick("#")}
          >
            #
          </button>
          {letters.map((letter) => (
            <button
              key={letter}
              className={activeLetter === letter ? styles.activeLetter : ""}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className={styles.carousel}>
          {filteredAnimes.length > 0 ? (
            filteredAnimes.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))
          ) : (
            <p>Nenhum anime encontrado com a letra "{activeLetter}".</p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default function Glossary() {
  return (
    <FavoritesProvider>
      <AnimeList />
    </FavoritesProvider>
  );
}


