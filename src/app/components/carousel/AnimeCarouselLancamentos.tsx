"use client";

import { useQuery } from '@apollo/client';
import { GET_RELEASING_ANIMES } from '@/lib/queries/getReleasing';

import { Anime } from "@/types/anime";
import AnimeCarousel from "./AnimeCarousel";
import AnimeCarouselLancamentosSkeleton from "./AnimeCarouselLancamentosSkeleton";
import styles from "./AnimeCarouselLancamentos.module.css";

interface AnimeCarouselLancamentosProps {
  itemsPerPage?: number;
  className?: string;
}

const AnimeCarouselLancamentos: React.FC<AnimeCarouselLancamentosProps> = ({
  itemsPerPage = 5,
}) => {
  const { loading, error, data } = useQuery(GET_RELEASING_ANIMES);
  const releasingAnimes = data?.releasingAnimes || [];

  if (loading) {
    return <AnimeCarouselLancamentosSkeleton itemsPerPage={itemsPerPage} />;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  if (releasingAnimes.length === 0) {
    return <div></div>;
  }

  return (
    <div className="anime-carousel-lancamentos">
      <div className={styles.header}>
        <h2 className={styles.titulo}>
         Uma amostra da temporada de primavera 2025
        </h2>
        <p className={styles.subtitulo}>
         Assista os três primeiros episódios desses simulcasts da primavera 2025 de graça!
        </p>
      </div>
      <AnimeCarousel animes={releasingAnimes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselLancamentos;