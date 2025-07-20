import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Anime } from '../../../../types/anime';
import MaturityRating from '@/app/components/elements/MaturityRating';
import { useFavorites } from '@/app/[locale]/contexts/FavoritesContext';
import PlayButton from '@/app/components/buttons/PlayButton';
import BookmarkButton from '@/app/components/buttons/BookmarkButton';
import AddButton from '@/app/components/buttons/AddButton';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const t = useTranslations('AnimeCardSearch');
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [showModal, setShowModal] = useState(false);
  const isFavorited = favorites.some((fav) => fav.id === anime.id);

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
    <li className="group list-none w-full transition-transform duration-300 ease-in-out relative hover:scale-105">
      <div className="no-underline text-inherit block relative">
        <div>
            <div className="relative w-full h-[280px] overflow-hidden">
                <img
                  src={anime.imageCardCompact}
                  alt={anime.name}
                  className="w-full h-[70%] object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  onError={(e) => {
                    console.error('Error loading image:', e);
                    e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image';
                  }}
                />
              {isFavorited && (
                <div className="absolute top-0 right-0 z-30 w-0 h-0 border-solid border-r-[36px] border-r-black border-b-[36px] border-b-transparent flex items-start justify-end p-0 text-[#FF640A] opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-0">
                  <svg
                    className="w-4 mr-[-35px] mt-[2px] fill-[#FF640A]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    data-t="watchlist-filled-small-svg"
                    aria-hidden="true"
                    role="img"
                  >
                    <path d="M4 2h8a1 1 0 0 1 1 1v9.92a1 1 0 0 1-1.625.78L8 11l-3.375 2.7A1 1 0 0 1 3 12.92V3a1 1 0 0 1 1-1z" />
                  </svg>
                </div>
              )}
              <div className="absolute top-0 left-0 w-full h-full bg-[#141519] p-2 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 flex flex-col gap-0.5 overflow-y-auto z-20">
                <h3 className="text-white text-2xl font-bold m-0">{anime.name}</h3>
                <div className="flex items-center gap-2.5">
                  <MaturityRating rating={Number(anime.rating) || 0} size={4} />
                  <span className="text-[#FF640A] flex items-center gap-1">
                    {anime.score}
                    <svg
                      className="w-5 h-4 fill-[#f1f1f1]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      data-t="star-svg"
                      aria-labelledby="star-svg"
                      aria-hidden="false"
                      role="img"
                    >
                      <title id="star-svg">Avaliação</title>
                      <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z" />
                    </svg>
                  </span>
                </div>
                <p className="text-[#ccc] m-0 text-sm">
                  Temporada: {anime.seasons?.[0]?.seasonNumber ?? "N/A"}
                </p>
                <p className="text-[#ccc] m-0 text-sm">
                  Episódios: {anime.totalEpisodes ?? "N/A"}
                </p>
                <p className="text-[#ccc] m-0 text-sm overflow-hidden text-ellipsis line-clamp-5 w-[260px]">
                  {anime.synopsis}
                </p>
                <div className="absolute bottom-2.5 left-2.5 flex gap-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayButton firstEpisode={anime.episodes?.[0] || null} />
                  <BookmarkButton isFavorited={isFavorited} onToggle={handleFavoriteClick} />
                  <AddButton onClick={handleAddButtonClick} />
                </div>
              </div>
              <div className="mt-2.5 py-1 transition-opacity duration-300 ease-in-out relative z-10 hover:opacity-0">
                <span className="text-white text-base font-medium block mb-2">{anime.name}</span>
                <div className="flex gap-2.5">
                  <span className="text-[#FF640A] text-xs">
                    {t(`audioTypes.${anime.audioType}`)}
                  </span>
                </div>
              </div>
            </div> 
        </div>
      </div>
    </li>
  );
};

export default AnimeCard;