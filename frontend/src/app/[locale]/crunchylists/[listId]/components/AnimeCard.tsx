import React, { useState } from 'react';
import Image from 'next/image';
import { Anime } from '../../../../../types/anime';
import MaturityRating from '@/app/components/elements/MaturityRating';
import { useFavorites } from '@/app/[locale]/contexts/FavoritesContext';
import { useTranslations } from 'next-intl';
import BookmarkButton from '@/app/components/buttons/BookmarkButton';
import PlayButton from '@/app/components/buttons/PlayButton';
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from '@/lib/queries/getAnimes';

interface AnimeCardProps {
  anime: Anime;
  onRemove: (animeId: string) => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onRemove }) => {
  const t = useTranslations('AnimeCardCrunchylist');
  const [isHovered, setIsHovered] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorited = favorites.some((fav: Anime) => fav.id === anime.id);

  // Busca os animes completos
  const { loading, data } = useQuery(GET_ANIMES);
  const [firstEpisode, setFirstEpisode] = useState<any | null>(null);

  React.useEffect(() => {
    if (!loading && data?.animes) {
      const currentAnime = data.animes.find((a: Anime) => a.id === anime.id);
      if (currentAnime?.episodes && currentAnime.episodes.length > 0) {
        const firstEp = currentAnime.episodes[0];
        setFirstEpisode({
          id: firstEp.id,
          slug: firstEp.slug,
          videoUrl: firstEp.videoUrl,
          publicCode: firstEp.publicCode
        });
      }
    }
  }, [data, loading, anime.id]);

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
    <div
      className="flex items-center p-4 border-b border-[#2a2a2a] relative min-h-[120px] cursor-pointer hover:bg-[#23252B] overflow-hidden transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-[240px] h-[140px] mr-4 overflow-hidden group">
        <Image 
          src={anime.imageCardCompact} 
          alt={anime.name} 
          className="w-full h-full object-cover"
          width={240}
          height={140}
        />
        <div className={`absolute top-0 left-0 p-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}> 
          <MaturityRating rating={Number(anime.rating)} size={4} />
        </div>
        {isFavorited && (
         <div className="absolute top-0 right-0 z-[3] w-0 h-0 
            border-l-[36px] border-l-transparent
            border-t-[36px] border-b-black
            flex items-start justify-end
            p-0 text-black opacity-100
            transition-opacity duration-200 ease-linear">
          <svg className="w-4 -mt-[35px] -ml-[35px] mb-0 mr-0 text-[#FF640A]" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 16 16" data-t="watchlist-filled-small-svg" 
            aria-hidden="true" 
            role="img"
            fill='currentColor'
            >
              <path d="M4 2h8a1 1 0 0 1 1 1v9.92a1 1 0 0 1-1.625.78L8 11l-3.375 2.7A1 1 0 0 1 3 12.92V3a1 1 0 0 1 1-1z">
              </path>
          </svg>
       </div>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-4 relative">
        {!isHovered && (
          <>
            <span className="text-[1rem] text-[#999]">{anime.name}</span>
            <span className="text-[0.875rem] text-[#999] ">{t(`audioTypes.${anime.audioType}`)}</span>
          </>
        )}
        {isHovered && (
          <div className="w-full bg-[#23252B] p-0 m-0">
            <h3 className="text-[1rem] font-medium mb-2">{anime.name}</h3>
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[0.875rem] text-white">
                  {anime.score}
                  <svg className="w-4 h-4 inline-flex items-center" 
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
            <p className="text-xs text-[#999] mb-4 line-clamp-2 overflow-hidden">{anime.synopsis}</p>
            <div className="flex gap-2 mt-1">
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
      {isHovered && (
        <div className="ml-1 mt-6 transition-opacity duration-200 opacity-100">
          <button
            onClick={() => onRemove(anime.id)}
            className="bg-none border-none cursor-pointer p-2"
            aria-label="Remover anime"
            title="Remover anime"
          >
            <svg 
              className="w-5 h-5 text-[#999] hover:text-white transition-colors duration-200" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
              fill='currentColor'
              >
              <path d="M13 2h-2a1 1 0 0 0-1 1v1H4a1 1 0 0 0 0 2h1v15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6h1a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1m-1 2v2h5v14H7V6h5V4zm-2 5a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1z"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default AnimeCard; 

