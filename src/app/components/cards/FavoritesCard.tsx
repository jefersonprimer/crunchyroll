import React from 'react';
import styles from './FavoritesCard.module.css';
import { Anime } from '../../../types/anime';
import MaturityRating from '@/app/components/utils/elements/SmallMaturityRating';

interface AnimeCardProps {
  anime: Anime;
  onRemove: (id: string) => void;
}

const FavoritesCard: React.FC<AnimeCardProps> = ({ anime, onRemove }) => {
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
        <h3 className={styles.name}>
          {anime.name}
        </h3>
        <span className={styles.play}>Comecar a Assistir: E1</span>
        <div className={styles.buttons}>
          <span className={styles.audioType}>{anime.audioType}</span>
        </div>
      </div>
    </li>
  );
};

export default FavoritesCard; 