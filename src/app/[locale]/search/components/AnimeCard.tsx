import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './AnimeCard.module.css';
import { Anime } from '../../../../types/anime';
import MaturityRating from '@/app/components/elements/MaturityRating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { useFavorites } from '@/app/[locale]/contexts/FavoritesContext';

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

  return (
    <li className={styles.animeItem}>
      <Link href={`/series/${anime.id}/${anime.slug}`} className={styles.animeLink}>
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
              <FontAwesomeIcon icon={bookmarkSolid} />
            </div>
          )}
          <div className={styles.cardInfo}>
            <h3 className={styles.name}>{anime.name}</h3>
            <div className={styles.flexContainer2}>
              <MaturityRating rating={Number(anime.rating) || 0} size={4} />
              <span className={styles.score}>
                {anime.score}
                <FontAwesomeIcon icon={faStar} className={styles.iconStar} />
              </span>
            </div>
            <p className={`${styles.infoText} ${styles.seasonText}`}>
              Temporada: {anime.seasons?.[0]?.seasonNumber ?? "N/A"}
            </p>
            <p className={`${styles.infoText} ${styles.episodesText}`}>
              Episódios: {anime.totalEpisodes ?? "N/A"}
            </p>
            <p className={`${styles.infoText} ${styles.synopsis}`}>{anime.synopsis}</p>

            <div className={styles.playButton}>
              <div className={styles.tooltip}>
                <span className={styles.tooltipText}>Play</span>
                <>
                  <svg className={styles.iconPlay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
                  </svg>
                </>
              </div>

              <div className={styles.tooltip} onClick={handleFavoriteClick}>
                <span className={styles.tooltipText}>
                  {isFavorited ? "Remover da Fila" : "Adicionar à Fila"}
                </span>
                <FontAwesomeIcon
                  icon={isFavorited ? bookmarkSolid : bookmarkOutline}
                  style={{ color: "#FF640A", transition: "color 0.3s ease-in-out" }}
                  className={`${styles.iconBookmark} ${isFavorited ? "filled" : "outline"}`}
                />
              </div>

              <div className={styles.tooltip} onClick={() => setShowModal(true)}>
                <span className={styles.tooltipText}>Adicionar à Primerlist</span>
                <svg
                  className={styles.iconPlus}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-labelledby="add-svg"
                  role="img"
                >
                  <title id="add-svg">Add</title>
                  <path fillRule="evenodd" d="M13 3v8h8v2h-8v8h-2v-8H3v-2h8V3z" />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.texts}>
            <span className={styles.name}>
              {anime.name}
            </span>
            <div className={styles.buttons}>
              <span className={styles.audioType}>
                {t(`audioTypes.${anime.audioType === 'subtitled' ? 'sub' : 
                    anime.audioType === 'dubbed' ? 'dub' : 
                    anime.audioType === 'subtitled_dubbed' ? 'subtitled_dubbed' : 'sub'}`)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default AnimeCard; 

