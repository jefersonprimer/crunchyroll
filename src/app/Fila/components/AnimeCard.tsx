import React from 'react';
import styles from './AnimeCard.module.css';
import { Anime } from '../../../types/anime';
import MaturityRating from '@/app/components/utils/elements/SmallMaturityRating';

interface AnimeCardProps {
  anime: Anime;
  onRemove: (id: string) => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onRemove }) => {
  return (
    <li className={styles.animeItem} title={anime.name}>
      <div className={styles.imageContainer}>
        <div className={styles.ratingContainer}>
          <MaturityRating rating={Number(anime.rating) || 0} />
        </div>
        <img 
          src={anime.imageCardCompact} 
          alt={anime.name} 
          className={styles.animeImage}
          onError={(e) => {
            console.error('Error loading image:', e);
            // Fallback to a default image if needed
            e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
      </div>
      <div className={styles.texts}>
        <span className={styles.name}>
          {anime.name}
        </span>
        <span className={styles.play}>Comecar a Assistir: E1</span>
        <div className={styles.buttons}>
          <span className={styles.audioType}>{anime.audioType}</span>
          <button
            className={styles.removeButton}
            onClick={() => onRemove(anime.id)}
          >
            <svg
              className={styles.trashIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-t="trash-svg"
              aria-hidden="true"
              role="img"
              style={{ backgroundColor: 'transparent' }}
            >
              <title>Remover</title>
              <path
                d="M13 2h-2a1 1 0 0 0-1 1v1H4a1 1 0 0 0 0 2h1v15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6h1a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1m-1 2v2h5v14H7V6h5V4zm-2 5a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1z"
                fill="none"
                stroke="#a0a0a0"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};

export default AnimeCard; 