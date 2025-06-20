import { Anime } from '@/types/anime';
import { useTranslations } from 'next-intl';
import styles from '../ListDetails.module.css';
import { useFavorites } from '../../../contexts/FavoritesContext';

interface AnimeSearchCardProps {
  anime: Anime;
  isInList: boolean;
  onAdd: (anime: Anime) => void;
}

const AnimeSearchCard: React.FC<AnimeSearchCardProps> = ({ anime, isInList, onAdd }) => {
  const t = useTranslations('ListDetails');
  const { favorites } = useFavorites();
  const isFavorited = favorites.some((fav) => fav.id === anime.id);

  return (
    <div className={styles.searchResultItem}>
      <div className={styles.searchResultInfo}>
        <div className="relative">
          <img
            src={anime.imagePoster || anime.imageCardCompact}
            alt={anime.name}
            className={styles.searchResultImage}
          />
          {isFavorited && (
            <div className="absolute top-0 right-0 bg-[#FF640A] p-1 rounded-bl">
              <svg 
                className="w-4 h-4" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 16 16" 
                data-t="watchlist-filled-small-svg" 
                aria-hidden="true" 
                role="img"
                fill="#ffffff"
              >
                <path d="M4 2h8a1 1 0 0 1 1 1v9.92a1 1 0 0 1-1.625.78L8 11l-3.375 2.7A1 1 0 0 1 3 12.92V3a1 1 0 0 1 1-1z"></path>
              </svg>
            </div>
          )}
        </div>
        <div className='flex-col'>
          <p className={styles.animeName}>{anime.name}</p>
          <div className={styles.infoTextDiv}>
            <span>
              {anime.seasons?.length ?? "N/A"} {t(`seasons.${anime.seasons?.length === 1 ? 'singular' : 'plural'}`)},
            </span>
            <span>
              {anime.totalEpisodes ?? "N/A"} {t(`episodes.${anime.totalEpisodes === 1 ? 'singular' : 'plural'}`)}
            </span>
          </div>
          <p className={styles.infoText}>{t(`audioTypes.${anime.audioType}`)}</p>
        </div>
      </div>
      {!isInList && (
        <button
          onClick={() => onAdd(anime)}
          className='cursor-pointer'
        >
          <svg 
            className="w-5 h-5" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            data-t="add-svg" 
            aria-hidden="false" 
            role="img" 
            aria-labelledby="add-svg-2920c1db-424f-4e4c-8768-43b65ace2715"
            fill='#FF640A'
          >
            <title id="add-svg-2920c1db-424f-4e4c-8768-43b65ace2715">Adicionar</title>
            <path d="M13 3v8h8v2h-8v8h-2v-8H3v-2h8V3z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default AnimeSearchCard; 