import React, { useState } from 'react';
import { Anime } from '../../../types/anime';
import MaturityRating from '@/app/components/elements/MaturityRating';
import { useTranslations } from 'next-intl';
import { AudioType } from '../../../types/enums';

interface AnimeCardProps {
  anime: Anime;
  onRemove: (id: string) => void;
}

const FavoritesCard: React.FC<AnimeCardProps> = ({ anime, onRemove }) => {
  const t = useTranslations();
  const [imageLoaded, setImageLoaded] = useState(false);

  const getAudioTypeKey = (audioType?: AudioType) => {
    if (!audioType) return 'subtitled';
    return audioType.toLowerCase();
  };

  return (
    <div
      className="flex flex-row sm:flex-col w-auto lg:w-[300.25px] h-auto cursor-pointer p-2.5 overflow-hidden hover:bg-[#23252B]">
      {/* Imagem */}
      <div
        className="w-16.5 h-24.5 sm:w-full sm:h-40 relative flex-shrink-0">
        <div className="absolute top-1 left-1 z-10">
          <MaturityRating rating={Number(anime.rating) || 0} size={4} />
        </div>
        {!imageLoaded && (
          <div className="absolute top-0 left-0 w-full h-full bg-[#141519] animate-pulse" />
        )}
        {/* Imagem para telas pequenas (poster) */}
        <img
          src={anime.imagePoster}
          alt={anime.name}
          className={`w-full h-full object-cover sm:hidden ${imageLoaded ? 'block' : 'hidden'}`}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Imagem para telas maiores (compact) */}
        <img
          src={anime.imageCardCompact}
          alt={anime.name}
          className={`w-full h-full object-cover hidden sm:block ${imageLoaded ? 'block' : 'hidden'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      {/* Textos */}
      <div
        className="flex-1 pt-0 sm:pt-2 flex flex-col gap-0.5 justify-center sm:justify-start pl-3 sm:pl-0">
        {imageLoaded ? (
          <>
            <h3 className="font-sans text-sm font-semibold text-white m-0 leading-[1.4]">
              {anime.name}
            </h3>
            <span className="font-sans text-[#A0A0A0] font-medium text-sm">
              Comecar a Assistir: E1
            </span>
            <div className="flex items-center justify-between mt-8 sm:mt-8">
              <span className="font-sans text-[#A0A0A0] font-medium text-sm">
                {t(`audioTypes.${getAudioTypeKey(anime.audioType)}`)}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="w-4/5 h-5 mb-2 bg-[#141519] animate-pulse" />
            <div className="w-1/2 h-4 bg-[#141519] animate-pulse mt-2" />
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesCard; 