'use client';

import React from 'react';
import { useHistory } from '../contexts/HistoryContext';
import styles from './styles.module.css';
import { EpisodeCard } from '../series/[id]/[slug]/components/EpisodeCard';

const History = () => {
  const { watchedEpisodes, clearHistory } = useHistory();

  if (!watchedEpisodes) {
    return (
      <div className={styles.emptyState}>
        <h2>Carregando...</h2>
      </div>
    );
  }

  if (watchedEpisodes.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>Nenhum episódio assistido</h2>
        <p>Os episódios que você assistir aparecerão aqui.</p>
      </div>
    );
  }

  return (
    <div className={styles.historyContainer}>
      <div className={styles.historyHeader}>
        <h2>Histórico de Visualização</h2>
        <button onClick={clearHistory} className={styles.clearButton}>
          Limpar Histórico
        </button>
      </div>
      <div className={styles.episodesGrid}>
        {watchedEpisodes.map(({ episode, anime }) => (
          <EpisodeCard key={episode.id} episode={episode} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default History;
