import React from 'react';
import styles from './AnimeCard.module.css';
import { Anime } from '../../../../../types/anime';
import MaturityRating from '@/app/components/elements/MaturityRating';
import { useFilters } from '../../../contexts/FilterContext';
import { useCardFavorites } from '../../../contexts/CardFavoritesContext';
import { useTranslations } from 'next-intl';

interface AnimeCardProps {
  anime: Anime & { isMovie?: boolean };
  onRemove: (id: string) => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onRemove }) => {
  const t = useTranslations('AnimeCardWatchlist');
  const { filters } = useFilters();
  const { isCardFavorite, toggleCardFavorite } = useCardFavorites();
  const isFavorite = isCardFavorite(anime.id);

  // Check if the anime should be shown based on filters
  const shouldShow = () => {
    // Check favorite filter
    if (filters.favoritos && !isFavorite) return false;

    // Check language filter
    if (filters.idioma !== 'todos' && anime.audioType) {
      const isDubbed = anime.audioType.toLowerCase().includes('dub');
      const isSubbed = anime.audioType.toLowerCase().includes('sub');
      
      if (filters.idioma === 'dublado' && !isDubbed) return false;
      if (filters.idioma === 'legendado' && !isSubbed) return false;
    }

    // Check media type filter
    if (filters.tipoMidia !== 'todos') {
      const isMovie = anime.isMovie || false;
      if (filters.tipoMidia === 'filmes' && !isMovie) return false;
      if (filters.tipoMidia === 'animes' && isMovie) return false;
    }

    return true;
  };

  if (!shouldShow()) return null;

  return (
    <li className={styles.animeItem} title={anime.name}>
      <div className={styles.imageContainer}>
        <div className={styles.ratingContainer}>
          <MaturityRating rating={Number(anime.rating) || 0} size={4} />
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
        <span className={styles.play}>{t('startWatching')}</span>
        <div className={styles.buttons}>
          <span className={styles.audioType}>{t(`audioTypes.${anime.audioType}`)}</span>
          <div className='flex gap-2'>
            <button 
              onClick={() => toggleCardFavorite(anime.id)}
              className={styles.removeButton}
              title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              {isFavorite ? (
                <svg
                  className={styles.favoriteIconFilled}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="favorite-filled-svg"
                  aria-labelledby="favorite-filled-svg"
                  aria-hidden="true"
                  role="img"
                  fill='currentColor'
                >
                  <path d="M12.078 5.446C10.801 3.816 9.156 3 7.144 3 3.818 3 1.426 6.285 2.26 9.924c.785 3.422 4.058 7.114 9.818 11.076 5.608-3.613 8.845-7.305 9.711-11.076C22.706 5.935 20.244 3 16.965 3c-1.927 0-3.556.815-4.887 2.446z"></path>
                </svg>
              ) : (
                <svg
                  className={styles.favoriteIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="favorite-svg"
                  aria-labelledby="favorite-svg"
                  aria-hidden="true"
                  role="img"
                  fill='currentColor'
                >
                  <path d="M19.84 9.476C20.442 6.858 19.07 5 16.965 5c-1.31 0-2.377.534-3.337 1.71L12.046 8.65l-1.542-1.97C9.602 5.53 8.536 5 7.144 5 5.132 5 3.658 7.07 4.21 9.477c.601 2.623 3.21 5.702 7.901 9.099 4.512-3.103 7.054-6.163 7.73-9.1zM16.965 3c3.279 0 5.741 2.935 4.824 6.924-.866 3.77-4.103 7.463-9.71 11.076-5.761-3.962-9.034-7.654-9.819-11.076C1.426 6.285 3.818 3 7.144 3c1.322 0 2.485.352 3.49 1.055l-.105.127.282.002c.456.346.879.766 1.267 1.262a7.499 7.499 0 0 1 1.264-1.236l.31.003a9.964 9.964 0 0 0-.115-.146C14.549 3.356 15.692 3 16.965 3z">
                  </path>
                </svg>
              )}
            </button>
            <button
              className={styles.removeButton}
              onClick={() => onRemove(anime.id)}
              title="Remover da fila"
            >
              <svg  
              className={styles.trashIcon} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              data-t="trash-svg" 
              aria-labelledby="trash-svg" 
              aria-hidden="true" 
              role="img"
              fill='currentColor'
              >
                <path d="M13 2h-2a1 1 0 0 0-1 1v1H4a1 1 0 0 0 0 2h1v15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6h1a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1m-1 2v2h5v14H7V6h5V4zm-2 5a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1z">
                </path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default AnimeCard; 

