import { useTranslations } from 'next-intl';
import { Anime } from '@/types/anime';
import { useEffect, useRef, useState } from 'react';
import { useFavorites } from '@/app/[locale]/contexts/FavoritesContext';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";

interface AnimeHoverModalProps {
  anime: Anime;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const AnimeHoverModal = ({ anime, triggerRef }: AnimeHoverModalProps) => {
  const t = useTranslations('AnimeHoverModal');
  const [position, setPosition] = useState<'left' | 'right'>('right');
  const modalRef = useRef<HTMLDivElement>(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorited = favorites.some((fav) => fav.id === anime.id);

  useEffect(() => {
    const updatePosition = () => {
      if (triggerRef.current && modalRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const spaceOnRight = windowWidth - triggerRect.right;
        const modalWidth = 438; // Approximate modal width

        setPosition(spaceOnRight >= modalWidth ? 'right' : 'left');
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [triggerRef]);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  return (
    <div
      ref={modalRef}
      className={`absolute z-50 bg-[#363231] shadow-lg rounded p-4 w-[438px] h-[482px] top-1/2 -translate-y-1/2 -translate-x-1/16 ${
        position === 'right' ? 'left-full ml-2' : 'right-full mr-2'
      }`}
    >
      {/* Triangle pointer */}
      <div 
        className={`absolute w-0 h-0 border-24 border-transparent ${
          position === 'right' 
            ? 'border-r-[#363231] -left-12' 
            : 'border-l-[#363231] -right-12'
        } top-[50%] -translate-y-1/2`}
      />
      
      <div className="flex flex-col gap-3">
        <div className="flex gap-4">
          <img
            src={anime.imagePoster}
            alt={anime.name}
            className="w-[120px] h-[180px] object-cover rounded-lg"
          />
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-[1rem] font-weight-700 text-uppercase font-bold text-[#f4f2f2] text-left">{anime.name}</h1>
            {anime.synopsis && (
              <p className="text-[.8125rem] text-[#cecaca] line-clamp-3 text-left">{anime.synopsis}</p>
            )}           
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex gap-2 mt-2">
          <Link 
            href={`/watch/${anime.publicCode}/${anime.slug}`}
            className="flex-1 bg-[#f47521] hover:bg-[#e56a1a] text-white text-center py-2 px-4 rounded font-medium transition-colors"
          >
            {t('buttons.watch')}
          </Link>
          <button
            onClick={handleFavoriteClick}
            className="flex items-center justify-center bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white py-2 px-4 rounded font-medium transition-colors"
            aria-label={isFavorited ? t('buttons.removeFromFavorites') : t('buttons.addToFavorites')}
          >
            <FontAwesomeIcon 
              icon={isFavorited ? bookmarkSolid : bookmarkOutline} 
              className="text-lg"
            />
          </button>
        </div>

        {/* Latest Episode Section */}
        {anime.episodes && anime.episodes.length > 0 && (
          <div className="flex mt-4 border-t border-[#4a4a4a] pt-4">
            <div className="flex flex-col gap-3">
              <img
                src={anime.episodes[0].image}
                alt={anime.episodes[0].title}
                className="w-[180px] h-[101px] object-cover rounded"
              />
              <div className="flex flex-col text-left">
                <span className="text-xs text-[#cecaca] line-clamp-2">{anime.episodes[0].title}</span>
                <span className="text-xs text-[#A09895] mt-1">
                  {t('episode', { number: anime.episodes.length })}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeHoverModal; 

