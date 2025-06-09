'use client';

import React from 'react';
import { useHistory } from '@/app/contexts/HistoryContext';
import styles from './HistoryCarousel.module.css';
import { EpisodeCard } from '../cards/EpisodioCard';
import Link from 'next/link';

const HistoryCarousel = () => {
  const { watchedEpisodes } = useHistory();

  if (!watchedEpisodes || watchedEpisodes.length === 0) {
    return null;
  }

  return (
    <div className={styles.historyCarouselContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Continue Assistindo</h2>
          <div className={styles.filaLink}>
            <Link href="/watchlist" className={styles.filaButton}>
              <span>VER HISTÓRICO</span>
              <svg
                className={styles.angle}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-labelledby="angle-svg"
                aria-hidden="true"
                role="img"
              >
                <title id="angle-svg">Próximo</title>
                <path d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z"></path>
              </svg>
            </Link>
          </div>
      </div>
      <div className={styles.historyCarousel}>
        {watchedEpisodes.slice(-4).map(({ episode, anime }) => (
          <div key={episode.id}>
            <EpisodeCard episode={episode} anime={anime} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryCarousel;
