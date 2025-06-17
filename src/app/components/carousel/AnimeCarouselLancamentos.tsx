"use client";

import { useQuery } from '@apollo/client';
import { GET_RELEASING_ANIMES } from '@/lib/queries/getReleasing';

import { Anime } from "@/types/anime";
import AnimeCarousel from "./AnimeCarousel";
import AnimeCarouselLancamentosSkeleton from "./AnimeCarouselLancamentosSkeleton";
import styles from "./AnimeCarouselLancamentos.module.css";
import { useTranslations } from 'next-intl';

interface AnimeCarouselLancamentosProps {
  itemsPerPage?: number;
  className?: string;
}

const AnimeCarouselLancamentos: React.FC<AnimeCarouselLancamentosProps> = ({
  itemsPerPage = 5,
}) => {
  const { loading, error, data } = useQuery(GET_RELEASING_ANIMES);
  const releasingAnimes = data?.releasingAnimes || [];
  const t = useTranslations();

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
      <h2 className={styles.title}>{t('carousels.releases.title')}</h2>
        <p className={styles.subtitle}>
          {t('carousels.releases.subtitle')}
        </p>
      </div>
      <AnimeCarousel animes={releasingAnimes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselLancamentos;

