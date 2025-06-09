"use client";

import { useQuery } from '@apollo/client';
import { GET_HAS_NEXT_SEASON } from '@/lib/queries/getHasNextSeason';
import { Anime } from "@/types/anime";
import AnimeCarousel from "./AnimeCarousel";
import styles from "./AnimeCarouselNextSeason.module.css";
import Loading from "@/app/loading";

interface AnimeCarouselNextSeasonProps {
  itemsPerPage?: number;
  className?: string;
}

const AnimeCarouselNextSeason: React.FC<AnimeCarouselNextSeasonProps> = ({
  itemsPerPage = 5,
}) => {
  const { loading, error, data } = useQuery(GET_HAS_NEXT_SEASON);
  const nextSeasonAnimes = data?.nextSeasonAnimes || [];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  if (nextSeasonAnimes.length === 0) {
    return <div>Não há animes programados para a próxima temporada.</div>;
  }

  return (
    <div className={`${styles.nextSeasonContainer} anime-carousel-next-season`}>
      <div className={styles.header}>
        <h2 className={styles.titulo}>Animes da Próxima Temporada</h2>
        <p className={styles.subtitulo}>
          Confira os animes mais esperados para a próxima temporada!
        </p>
      </div>
      <AnimeCarousel animes={nextSeasonAnimes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselNextSeason;