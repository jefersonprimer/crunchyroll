import { Anime } from '@/types/anime';
import { useTranslations } from 'next-intl';
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
    <div className="flex items-center justify-between p-0.5 my-0.5 border-b border-[#4A4E58] transition-colors duration-200 hover:bg-[#141519] last:border-b-0">
      <div className="flex items-start gap-[12px] p-[10px] w-full">
        <div className="relative">
          <img
            src={anime.imagePoster || anime.imageCardCompact}
            alt={anime.name}
            className="w-[60px] h-[90px] object-cover flex-0"
          />
          {isFavorited && ( 
            <div className="absolute top-0 right-0 z-[3] w-0 h-0 
            border-l-[30px] border-l-transparent border-t-[30px] border-b-black
            flex items-start justify-end p-0 text-black  opacity-100 transition-opacity duration-200 ease-in-out
            group-hover:opacity-0">
              <svg className="w-4 -mt-[30px] -ml-[15px] fill-[#FF640A]" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 16 16" 
              data-t="watchlist-filled-small-svg" 
              aria-hidden="true" 
              role="img">
              <path d="M4 2h8a1 1 0 0 1 1 1v9.92a1 1 0 0 1-1.625.78L8 11l-3.375 2.7A1 1 0 0 1 3 12.92V3a1 1 0 0 1 1-1z"></path>
              </svg>
            </div>
          )}
        </div>
        <div className='flex-col'>
          <p className="text-white text-[14px] font-weight-500 m-0">{anime.name}</p>
          <div className='flex items-center gap-[5px] text-[#999] text-[12px] m-0'>
            <span>
              {anime.seasons?.length ?? "N/A"} {t(`seasons.${anime.seasons?.length === 1 ? 'singular' : 'plural'}`)},
            </span>
            <span>
              {anime.totalEpisodes ?? "N/A"} {t(`episodes.${anime.totalEpisodes === 1 ? 'singular' : 'plural'}`)}
            </span>
          </div>
          <p className='text-[#999] text-[12px] m-0'>{t(`audioTypes.${anime.audioType}`)}</p>
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