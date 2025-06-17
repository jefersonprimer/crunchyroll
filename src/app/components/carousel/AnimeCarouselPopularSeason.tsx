"use client";

import Loading from "@/app/loading";
import { useQuery } from '@apollo/client';
import { GET_SEASON_POPULAR_ANIMES } from '@/lib/queries/getSeasonPopularAnimes';
import AnimeCarousel from "./AnimeCarousel";
import styles from "./styles.module.css";

interface AnimeCarouselPopularSeasonProps {
  itemsPerPage?: number;
  className?: string; 
}

const AnimeCarouselPopularSeason: React.FC<AnimeCarouselPopularSeasonProps> = ({
  itemsPerPage = 5,
}) => {
  const { loading, error, data } = useQuery(GET_SEASON_POPULAR_ANIMES);
  const seasonPopularAnimes = data?.seasonPopularAnimes || [];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  if (seasonPopularAnimes.length === 0) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Animes Populares da Temporada
        </h2>
        <p className={styles.subtitle}>
          Assista os três primeiros!
        </p>
      </div>
      <AnimeCarousel animes={seasonPopularAnimes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselPopularSeason;

