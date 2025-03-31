"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AnimeGrid from "../../components/cards/AnimeGrid";
import { Anime } from "@/types/anime";
import useFetchAnimes from "../../hooks/useFetchAnimes"; 
import styles from "./styles.module.css";

export default function PopularPage() {
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const router = useRouter();
  const { animes, loading, error } = useFetchAnimes(); // Usando o hook

  useEffect(() => {
    if (animes.length > 0) {
      setFilteredAnimes(
        animes.filter((anime: Anime) => anime.isPopular === true)
      );
    }
  }, [animes]);

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
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

  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.popularContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Animes Mais Populares</h1>
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
              <title id="sort-svg">Ordenar</title>
              <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z"></path>
            </svg>
            <span className={styles.maisPopulares}>MAIS POPULARES</span>
          </div>

          {showFilterOptions && (
            <div className={styles.filterOptions}>
              <div onClick={goToPopular} className={styles.item}>
                Mais Populares
              </div>
              <div onClick={goToNewReleases} className={styles.item}>
                Mais Recentes
              </div>
              <div onClick={goToAlphabeticOrder} className={styles.item}>
                Ordem Alfabética
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.gridPopular}>
        <h1 className={styles.popularTitle}>Populares</h1>
        <div>
          <AnimeGrid animes={filteredAnimes} />
        </div>
      </div>
    </div>
  );
}
