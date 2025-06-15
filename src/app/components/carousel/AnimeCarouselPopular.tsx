"use client";

import Loading from "@/app/loading";
import { useQuery } from '@apollo/client';
import { GET_POPULAR_ANIMES } from '@/lib/queries/getPopularAnimes';
import AnimeCarousel from "./AnimeCarousel";
import styles from "./styles.module.css";

interface AnimeCarouselPopularProps {
  itemsPerPage?: number;
  className?: string; // Propriedade opcional
}

const AnimeCarouselPopular: React.FC<AnimeCarouselPopularProps> = ({
  itemsPerPage = 5,
}) => {
  const { loading, error, data } = useQuery(GET_POPULAR_ANIMES);
  const popularAnimes = data?.popularAnimes || [];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  if (popularAnimes.length === 0) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.titulo}>
          Animes Populares
        </h2>
        <p className={styles.subtitulo}>
          Assista os três primeiros episódios desses simulcasts de outubro de
          2024 de graça!
        </p>
      </div>
      <AnimeCarousel animes={popularAnimes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselPopular;