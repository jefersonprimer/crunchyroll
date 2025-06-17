"use client";

import { useQuery } from '@apollo/client';
import { GET_HAS_NEXT_SEASON } from '@/lib/queries/getHasNextSeason';
import AnimeCarousel from "./AnimeCarousel";
import styles from "./styles.module.css";
import Loading from "@/app/loading";
import { useTranslations } from 'next-intl'; 

interface AnimeCarouselNextSeasonProps {
  itemsPerPage?: number;
  className?: string;
}

const AnimeCarouselNextSeason: React.FC<AnimeCarouselNextSeasonProps> = ({
  itemsPerPage = 5,
}) => {
  const { loading, error, data } = useQuery(GET_HAS_NEXT_SEASON);
  const nextSeasonAnimes = data?.nextSeasonAnimes || [];
  const t = useTranslations();

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
        <h2 className={styles.title}>{t('carousels.nextSeason.title')}</h2>
        <p className={styles.subtitle}>
          {t('carousels.nextSeason.subtitle')}
        </p>
      </div>
      <AnimeCarousel animes={nextSeasonAnimes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselNextSeason;

