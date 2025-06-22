import React, { useState } from 'react';
import styles from './AnimeCard.module.css';
import { Anime } from '../../../../types/anime';
import MaturityRating from '@/app/components/elements/MaturityRating';
import { useFavorites } from '@/app/[locale]/contexts/FavoritesContext';
import { useTranslations } from 'next-intl';
import BookmarkButton from '@/app/components/buttons/BookmarkButton';
import PlayButton from '@/app/components/buttons/PlayButton';

interface AnimeCardProps {
  anime: Anime;
  onRemove: (animeId: string) => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onRemove }) => {
  const t = useTranslations('AnimeCardCrunchylist');
  const [isHovered, setIsHovered] = useState(false);
  const firstEpisode = anime.episodes?.[0];
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorited = favorites.some((fav: Anime) => fav.id === anime.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  // Função para ser usada no BookmarkButton
  const handleFavoriteToggle = () => {
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  return (
    <li 
      className={styles.listItem}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.image}>
        <img 
          src={anime.imageCardCompact} 
          alt={anime.name} 
          className={styles.animeImage}
          onError={(e) => {
            console.error('Error loading image:', e);
            e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        <div className={styles.ratingContainer}>
          <MaturityRating rating={Number(anime.rating)} size={4} />
        </div>
        {isFavorited && (
         <div className={styles.favoriteLabel}>
         <svg className={styles.favoriteIcon} 
           xmlns="http://www.w3.org/2000/svg" 
           viewBox="0 0 16 16" data-t="watchlist-filled-small-svg" 
           aria-hidden="true" 
           role="img">
             <path d="M4 2h8a1 1 0 0 1 1 1v9.92a1 1 0 0 1-1.625.78L8 11l-3.375 2.7A1 1 0 0 1 3 12.92V3a1 1 0 0 1 1-1z">
             </path>
         </svg>
       </div>
        )}
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.name}>{anime.name}</span>
        <span className={styles.audioType}>{t(`audioTypes.${anime.audioType}`)}</span>
        {isHovered && (
          <div className={styles.cardInfo}>
            <h3 className={styles.name1}>{anime.name}</h3>
            <div className={styles.infoText}>
              <div className={styles.flexContainer}>
                <span className={styles.score}>
                  {anime.score}
                  <svg className={styles.iconStar} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    data-t="star-svg" 
                    aria-labelledby="star-svg" 
                    aria-hidden="false" 
                    role="img"
                    fill="#f1f1f1"
                  >
                    <title id="star-svg">Avaliação</title>
                    <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z">
                    </path>
                </svg>
                </span>
              </div>
            </div>
            <p className={styles.synopsis}>{anime.synopsis}</p>

            <div className={styles.playButton}>
              <PlayButton firstEpisode={firstEpisode} />
              <BookmarkButton
                isFavorited={isFavorited}
                onToggle={handleFavoriteToggle}
                color="#FF640A"
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.rightContainer}>
        <button
          onClick={() => onRemove(anime.id)}
          className={styles.removeButton}
        >
          <svg className={styles.trashIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M13 2h-2a1 1 0 0 0-1 1v1H4a1 1 0 0 0 0 2h1v15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6h1a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1m-1 2v2h5v14H7V6h5V4zm-2 5a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1z"/>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default AnimeCard; 

