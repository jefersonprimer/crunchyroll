"use client";

import Loading from "@/app/loading";
import { useQuery } from '@apollo/client';
import { GET_SEASON_POPULAR_ANIMES } from '@/lib/queries/getSeasonPopularAnimes';

import AnimeCarousel from "./AnimeCarousel";
import styles from "./AnimeCarouselPopularSeason.module.css";
import { Anime } from "@/types/anime";

interface AnimeCarouselPopularSeasonProps {
  itemsPerPage?: number;
  className?: string; // Propriedade opcional
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
    <div className="anime-carousel-popular-season">
      <div className={styles.header}>
        <h2 className={styles.titulo}>
          Animes Populares da Temporada
        </h2>
        <p className={styles.subtitulo}>
          Assista os três primeiros!
        </p>
      </div>
      <AnimeCarousel animes={seasonPopularAnimes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselPopularSeason;