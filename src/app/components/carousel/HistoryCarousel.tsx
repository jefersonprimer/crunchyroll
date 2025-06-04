'use client';

import React from 'react';
import { useHistory } from '@/app/contexts/HistoryContext';
import { EpisodeCard } from '@/app/series/[publicCode]/[slug]/components/EpisodeCard';
import styles from './HistoryCarousel.module.css';

const HistoryCarousel = () => {
  const { watchedEpisodes } = useHistory();

  if (!watchedEpisodes || watchedEpisodes.length === 0) {
    return null;
  }

  return (
    <div className={styles.historyCarouselContainer}>
      <h2 className={styles.historyTitle}>Continue Assistindo</h2>
      <div className={styles.historyCarousel}>
        {watchedEpisodes.slice(0, 10).map(({ episode, anime }) => (
          <div key={episode.id} className={styles.historyItem}>
            <EpisodeCard episode={episode} anime={anime} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryCarousel;
