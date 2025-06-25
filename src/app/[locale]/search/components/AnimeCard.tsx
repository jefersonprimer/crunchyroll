import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './AnimeCard.module.css';
import { Anime } from '../../../../types/anime';
import MaturityRating from '@/app/components/elements/MaturityRating';
import { useFavorites } from '@/app/[locale]/contexts/FavoritesContext';
import PlayButton from '@/app/components/buttons/PlayButton';
import BookmarkButton from '@/app/components/buttons/BookmarkButton';
import AddButton from '@/app/components/buttons/AddButton';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const t = useTranslations('AnimeCardSearch');
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [showModal, setShowModal] = useState(false);
  const isFavorited = favorites.some((fav) => fav.id === anime.id);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  return (
    <li className={styles.animeItem}>
      <div className={styles.animeLink}>
        <Link href={`/series/${anime.id}/${anime.slug}`}>
          <div className={styles.imageContainer}>
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
            <div className={styles.cardInfo}>
              <h3 className={styles.name}>{anime.name}</h3>
              <div className={styles.flexContainer2}>
                <MaturityRating rating={Number(anime.rating) || 0} size={4} />
                <span className={styles.score}>
                  {anime.score}
                  <svg className="w-5 h-4" 
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
              <p className={`${styles.infoText} ${styles.seasonText}`}>
                Temporada: {anime.seasons?.[0]?.seasonNumber ?? "N/A"}
              </p>
              <p className={`${styles.infoText} ${styles.episodesText}`}>
                Episódios: {anime.totalEpisodes ?? "N/A"}
              </p>
              <p className={`${styles.infoText} ${styles.synopsis}`}>{anime.synopsis}</p>
            </div>
            <div className={styles.texts}>
              <span className={styles.name}>{anime.name}</span>
              <div className={styles.buttons}>
                <span className={styles.audioType}>
                  {t(`audioTypes.${anime.audioType}`)}
                </span>
              </div>
            </div>
          </div>
        </Link>
        <div className={styles.playButton + ' ' + styles.showOnHover}>
          <PlayButton firstEpisode={anime.episodes?.[0] || null} />
          <BookmarkButton isFavorited={isFavorited} onToggle={handleFavoriteClick} />
          <AddButton onClick={handleAddButtonClick} />
        </div>
      </div>
    </li>
  );
};

export default AnimeCard; 

