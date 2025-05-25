"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import { Anime } from "@/types/anime";
import AnimeGrid from "../../components/cards/AnimeGrid";
import { GET_LATEST_RELEASES } from "@/lib/queries/getLatestReleases";
import { FavoritesProvider } from "../../contexts/FavoritesContext";

export default function NewReleasesPage() {
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const router = useRouter();
  
  const { data, loading, error } = useQuery(GET_LATEST_RELEASES);

  useEffect(() => {
    if (data?.latestReleases) {
      setFilteredAnimes(data.latestReleases);
    }
  }, [data]);

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
  if (error) return <div className={styles.error}>{error.message}</div>;

  return (
    <FavoritesProvider>
      <div className={styles.newReleasesContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Animes Recém-Adicionados</h1>
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
              <span className={styles.maisRecentes}>MAIS RECENTES</span>
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
          <h1 className={styles.newTitle}>Ultimos Lançamentos</h1>
          <div>
            <AnimeGrid animes={filteredAnimes} />
          </div>
        </div>
      </div>
    </FavoritesProvider>
  );
}
