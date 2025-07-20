import React, { useState } from 'react';
import { Anime } from '../../../../types/anime';
import MaturityRating from '@/app/components/elements/MaturityRating';
import { useFilters } from '../../contexts/FilterContext';
import { useCardFavorites } from '../../contexts/CardFavoritesContext';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import FavoriteButton from '@/app/components/buttons/FavoriteButton';
import RemoveButton from '@/app/components/buttons/RemoveButton';

interface AnimeCardProps {
  anime: Anime & { isMovie?: boolean };
  onRemove: (id: string) => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onRemove }) => {
  const t = useTranslations('AnimeCardWatchlist');
  const { filters } = useFilters();
  const { isCardFavorite, toggleCardFavorite } = useCardFavorites();
  const isFavorite = isCardFavorite(anime.id);
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <div className="flex flex-row md:flex-col gap-2 justify-center items-center sm:w-[445px] w-full md:w-[255px] p-2 h-auto overflow-hidden cursor-pointer hover:bg-[#23252B]">
      <div className="w-[65px] h-[98px] sm:w-[445px] md:w-[240px] md:h-auto relative mx-auto flex-shrink-0">
        <div className="absolute top-[4px] left-[4px] z-1">
          <MaturityRating rating={Number(anime.rating) || 0} size={4} />
        </div>
        {!imageLoaded && (
          <div className="bg-[#141519] animate-pulse absolute top-0 left-0 w-full h-full "/>
        )}
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={anime.imagePoster}
          />
          <img
            src={anime.imageCardCompact}
            alt={anime.name}
            width={240}
            height={135}
            className="w-full h-full object-cover md:w-[240px] md:h-auto"
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.error('Error loading image:', e);
              e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image';
            }}
          />
        </picture>
      </div>
      <div className="flex flex-col justify-between pl-4 md:pl-0  px-0 w-full md:w-[240px] h-auto">
        <h3 className="text-sm font-semibold text-white leading-[1.4] line-clamp-3">{anime.name}</h3>
        <span className="text-[#A0A0A0] text-sm font-medium">{t('startWatching')}</span>
        <div className="flex items-center justify-between mt-[2rem]">
          <span className="text-[#A0A0A0] text-sm font-medium">{t(`audioTypes.${anime.audioType}`)}</span>
          <div className='flex gap-2'>
            <FavoriteButton isFavorite={isFavorite} onClick={() => toggleCardFavorite(anime.id)} />
            <RemoveButton onClick={() => onRemove(anime.id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard; 

