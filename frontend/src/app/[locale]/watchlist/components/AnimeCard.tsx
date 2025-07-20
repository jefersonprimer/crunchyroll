import React, { useState, useEffect } from 'react';
import { Anime } from '../../../../types/anime';
import MaturityRating from '@/app/components/elements/MaturityRating';
import { useFilters } from '../../contexts/FilterContext';
import { useCardFavorites } from '../../contexts/CardFavoritesContext';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface AnimeCardProps {
  anime: Anime & { isMovie?: boolean };
  onRemove: (id: string) => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onRemove }) => {
  const t = useTranslations('AnimeCardWatchlist');
  const { filters } = useFilters();
  const { isCardFavorite, toggleCardFavorite } = useCardFavorites();
  const isFavorite = isCardFavorite(anime.id);
  const [showText, setShowText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 500);
    const imageTimer = setTimeout(() => setShowImage(true), 1000);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(imageTimer);
    };
  }, []);

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
    <div className="flex justify-center items-center flex-col w-[255px] h-auto min-h-[264px] overflow-hidden cursor-pointer hover:bg-[#23252B]">
      <div className="flex flex-col w-[240px] h-[249px] overflow-hidden">
        <div className="w-[240px] h-auto min-h-[135px] relative my-0 mx-auto">
          <div className="absolute top-[4px] left-[4px] z-1">
            <MaturityRating rating={Number(anime.rating) || 0} size={4} />
          </div>
          {(!showImage || !imageLoaded) && (
            <div className="bg-[#141519] animate-pulse absolute top-0 left-0 w-full h-full "/>
          )}
          <img
            src={anime.imageCardCompact}
            alt={anime.name}
            width={240}
            height={135}
            className="w-[240px] h-auto min-h-[135px] object-cover"
            style={{ display: showImage && imageLoaded ? 'block' : 'none' }}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.error('Error loading image:', e);
              e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image';
            }}
          />
        </div>
        <div className="py-[1rem] px-0 flex flex-col w-[240px] h-auto min-h-[114px]">
          {showText ? (
            <>
              <span className="text-[1rem] font-weight-600 text-[#FFFFFF] m-0 leading-[1.4]">
                {anime.name}
              </span>
              <span className="text-[#A0A0A0]">{t('startWatching')}</span>
              <div className="flex items-center justify-between mt-[2rem]">
                <span className="text-[#A0A0A0]">{t(`audioTypes.${anime.audioType}`)}</span>
                <div className='flex gap-2'>
                  <button
                    onClick={() => toggleCardFavorite(anime.id)}
                    className="bg-none border-none cursor-pointer flex items-center justify-center"
                    title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    {isFavorite ? (
                      <svg
                        className="w-6 h-6 text-[#A0A0A0] hover:text-[#FFFFFF]"
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
                        className="w-6 h-6 text-[#A0A0A0] hover:text-[#FFFFFF]"
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
                    onClick={() => onRemove(anime.id)}
                    title="Remover da fila"
                  >
                    <svg
                      className="w-6 h-6 text-[#A0A0A0] hover:text-[#FFFFFF]"
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
            </>
          ) : (
            <>
              <div className="bg-[#141519] animate-pulse w-[80%] h-[20px] m-0" />
              <div className="bg-[#141519] animate-pulse w-[50%] h-[16px] m-0 mt-[12px]"/>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard; 

