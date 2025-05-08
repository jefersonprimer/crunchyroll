"use client";

import Loading from "@/app/loading";
import { useQuery } from '@apollo/client';
import { GET_RELEASING_ANIMES } from '@/lib/queries/getReleasing';

import { Anime } from "@/types/anime";
import AnimeCarousel from "./AnimeCarousel";
import styles from "./AnimeCarouselLancamentos.module.css";

interface AnimeCarouselLancamentosProps {
  itemsPerPage?: number;
  className?: string; // Propriedade opcional
}

const AnimeCarouselLancamentos: React.FC<AnimeCarouselLancamentosProps> = ({
  itemsPerPage = 5,
}) => {
  const { loading, error, data } = useQuery(GET_RELEASING_ANIMES);
  const releasingAnimes = data?.releasingAnimes || [];


  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  if (releasingAnimes.length === 0) {
    return <div>Nenhum lançamento disponível no momento.</div>;
  }

  return (
    <div className="anime-carousel-lancamentos">
      <h1 className={styles.titulo}>
       Uma amostra da temporada de inverno 2025
      </h1>
      <p className={styles.subtitulo}>
       Assista os três primeiros episódios desses simulcasts da inverno 2025 de graça!
      </p>
      <AnimeCarousel animes={releasingAnimes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselLancamentos;