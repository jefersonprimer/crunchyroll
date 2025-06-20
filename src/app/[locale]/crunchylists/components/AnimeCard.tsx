import React, { useState } from 'react';
import styles from './AnimeCard.module.css';
import { Anime } from '../../../../types/anime';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid, faStar } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import MaturityRating from '@/app/components/elements/MaturityRating';
import { useFavorites } from '@/app/[locale]/contexts/FavoritesContext';
import { useTranslations } from 'next-intl';

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
            <FontAwesomeIcon icon={bookmarkSolid} />
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
                  <FontAwesomeIcon icon={faStar} className={styles.iconStar} />
                </span>
              </div>
            </div>
            <p className={styles.synopsis}>{anime.synopsis}</p>

            <div className={styles.playButton}>
              <div className={styles.tooltip}>
                <span className={styles.tooltipText}>Play</span>
                {firstEpisode ? (
                  <div>
                    <svg className={styles.iconPlay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
                    </svg>
                  </div>
                ) : (
                  <span>
                    <svg className={styles.iconPlay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
                    </svg>
                  </span>
                )}
              </div>

              <div className={styles.tooltip} onClick={handleFavoriteClick}>
                <span className={styles.tooltipText}>
                  {isFavorited ? t('removeFromQueue') : t('addToQueue')}
                </span>
                <FontAwesomeIcon
                  icon={isFavorited ? bookmarkSolid : bookmarkOutline}
                  style={{ color: "#FF640A", transition: "color 0.3s ease-in-out" }}
                  className={styles.iconBookmark}
                />
              </div>

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

