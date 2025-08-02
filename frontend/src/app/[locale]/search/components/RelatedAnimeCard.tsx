import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Anime } from '@/types/anime';
import MaturityRating from '@/app/components/elements/MaturityRating';
import { useFavorites } from '@/app/[locale]/contexts/FavoritesContext';
import PlayButton from '@/app/components/buttons/PlayButton';
import BookmarkButton from '@/app/components/buttons/BookmarkButton';
import AddButton from '@/app/components/buttons/AddButton';
import { useParams } from 'next/navigation';

interface RelatedAnimeCardProps {
  anime: Anime;
}

export default function RelatedAnimeCard({ anime }: RelatedAnimeCardProps) {
  const t = useTranslations('RelatedAnimeCard');
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [showModal, setShowModal] = useState(false);
  const isFavorited = favorites.some((fav) => fav.id === anime.id);
  const params = useParams();
  const locale = params.locale as string;

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center gap-4 p-2 hover:bg-[#141519] transition-colors duration-200 cursor-pointer group">
        <div className="flex-shrink-0 relative">
          <img
            src={anime.imagePoster}
            alt={anime.name}
            className="w-15 h-22.5 object-cover"
          />

          <div className="absolute top-0 left-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <MaturityRating rating={Number(anime.rating) || 0} size={4} />
          </div>
          {isFavorited && (
            <div className="absolute top-0 right-0 z-[3] w-0 h-0 border-[24px] border-t-0 border-l-transparent border-r-black border-b-transparent flex items-start justify-end text-[#FF640A] opacity-100 transition-opacity duration-200 ">
              <svg
                className="text-[#FF640A] w-3 h-3 mt-[1px] mr-[-24px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                aria-hidden="true"
                role="img"
                fill="currentColor"
              >
                <path d="M4 2h8a1 1 0 0 1 1 1v9.92a1 1 0 0 1-1.625.78L8 11l-3.375 2.7A1 1 0 0 1 3 12.92V3a1 1 0 0 1 1-1z" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-semibold text-sm truncate mb-1">
            {anime.name}
          </h2>
          <p className="text-gray-400 text-xs flex items-center gap-2">
            <span className="font-medium text-sm text-[#A0A0A0] m-0">
              {anime.seasons?.length ?? "N/A"} {t(`seasons.${anime.seasons?.length === 1 ? 'singular' : 'plural'}`)}
            </span>
            <span className="font-medium text-sm text-[#A0A0A0] m-0">
              {anime.totalEpisodes ?? "N/A"} {t(`episodes.${anime.totalEpisodes === 1 ? 'singular' : 'plural'}`)}
            </span>
          </p>
          {/* Non-hover state: audioType */}
          <div className="flex items-center mt-2 opacity-100 group-hover:opacity-0 transition-opacity duration-200">
            {anime.rating && (
              <span className="text-[#a0a0a0] text-sm">{t(`audioTypes.${anime.audioType}`)}</span>
            )}
          </div>
          {/* Hover state: score and buttons */}
          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-[#dadada] font-semibold text-sm flex items-center gap-1">
              {anime.score}
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="star-svg"
                aria-labelledby="star-svg"
                aria-hidden="false"
                role="img"
                fill="currentColor"
              >
                <title id="star-svg">Avaliação</title>
                <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z" />
              </svg>
            </span>
            <div className="flex gap-2 ml-auto">
              <PlayButton firstEpisode={anime.episodes?.[0] || null} />
              <BookmarkButton isFavorited={isFavorited} onToggle={handleFavoriteClick} />
              <AddButton onClick={handleAddButtonClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 