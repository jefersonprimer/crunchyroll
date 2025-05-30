"use client";

import Loading from "@/app/loading";
import { useQuery } from "@apollo/client";
import { GET_DUBBED_ANIMES } from "@/lib/queries/getDubbedAnimes";
import { Anime } from "@/types/anime";
import AnimeCarousel from "./AnimeCarousel";
import styles from "./AnimeCarouselDub.module.css";

interface AnimeCarouselDubProps {
  itemsPerPage?: number;
  className?: string;
}

interface GetDubbedAnimesData {
  dubbedAnimes: Anime[];
}

const AnimeCarouselDub: React.FC<AnimeCarouselDubProps> = ({
  itemsPerPage = 5,
  className = "",
}) => {
  const { loading, error, data } = useQuery<GetDubbedAnimesData>(GET_DUBBED_ANIMES);
  const dubbedAnimes = data?.dubbedAnimes || [];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  if (dubbedAnimes.length === 0) {
    return <div>Nenhum anime dublado disponível no momento.</div>;
  }

  return (
    <div className={`${styles.audioTypeContainer} ${className}`}>
      <h1 className={styles.titulo}>Dublagens em Português</h1>
      <p className={styles.subtitulo}>
        Descubra os animes disponíveis com áudio dublado!
      </p>
      <AnimeCarousel animes={dubbedAnimes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselDub;
