import React, { useState, useEffect } from 'react';
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

  const getAudioTypeKey = (audioType?: AudioType) => {
    if (!audioType) return 'subtitled';
    return audioType.toLowerCase();
  };

  return (
    <div className="flex flex-col w-[300.25px] h-[273.33px] p-2.5 overflow-hidden transition-transform duration-200 ease-in hover:bg-[#23252B]">
    <div className="w-full h-40 relative">
      <div className="absolute top-1 left-1 z-10">
        <MaturityRating rating={Number(anime.rating) || 0} size={4} />
      </div>
      {(!showImage || !imageLoaded) && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#141519] animate-pulse" />
      )}
      <img 
        src={anime.imageCardCompact} 
        alt={anime.name} 
        className={`w-full h-full object-cover ${showImage && imageLoaded ? 'block' : 'hidden'}`}
        onLoad={() => setImageLoaded(true)}
        onError={(e) => {
          console.error('Error loading image:', e);
          e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image';
          setImageLoaded(true);
        }}
      />
    </div>
    <div className="pt-2 flex flex-col gap-0.5">
      {showText ? (
        <>
          <h3 className="font-sans text-sm font-semibold text-white m-0 leading-[1.4]">
            {anime.name}
          </h3>
          <span className="font-sans text-[#A0A0A0] font-medium text-sm">
            Comecar a Assistir: E1
          </span>
          <div className="flex items-center justify-between mt-8">
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