"use client";

import { useQuery } from '@apollo/client';
import { GET_HAS_NEXT_SEASON } from '@/lib/queries/getHasNextSeason';
import AnimeCarousel from "./AnimeCarousel";
import styles from "./styles.module.css";
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
    return <div></div>;
  }

  return (
    <div className={styles.container}>
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