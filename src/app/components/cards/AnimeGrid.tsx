'use client';

import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import { Anime } from "@/types/anime";
import { useFavorites } from "@/app/[locale]/contexts/FavoritesContext";
import Link from "next/link";

import MaturityRating from '../elements/MaturityRating';
import PlayButton from '../buttons/PlayButton';
import BookmarkButton from '../buttons/BookmarkButton';
import AddButton from '../buttons/AddButton';
import AddToListModal from '../modals/AddToListModal';
import AnimeGridSkeleton from './AnimeGridSkeleton';

interface AnimeGridProps {
  animes: Anime[];
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animes }) => {
  const t = useTranslations();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [firstEpisodes, setFirstEpisodes] = useState<{ [key: string]: any }>({});
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const { loading, data } = useQuery(GET_ANIMES);

  useEffect(() => {
    if (!loading && data?.animes) {
      const episodesMap: { [key: string]: any } = {};
      
      animes.forEach((anime) => {
        const currentAnime = data.animes.find((a: Anime) => a.id === anime.id);
        if (currentAnime?.episodes && currentAnime.episodes.length > 0) {
          const firstEp = currentAnime.episodes[0];
          episodesMap[anime.id] = {
            id: firstEp.id,
            slug: firstEp.slug,
            videoUrl: firstEp.videoUrl,
            publicCode: firstEp.publicCode
          };
        }
      });
      
      setFirstEpisodes(episodesMap);
    }
  }, [data, loading, animes]);

  const handleFavoriteClick = (anime: Anime) => {
    const isFavorited = favorites.some((fav) => fav.id === anime.id);
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  return (
    <div className="flex flex-wrap gap-[10px] justify-center items-center w-full">
    {loading
      ? Array.from({ length: 12 }).map((_, i) => <AnimeGridSkeleton key={i} />)
      : animes.map((anime) => {
          const isFavorited = favorites.some((fav) => fav.id === anime.id);
          const firstEpisode = firstEpisodes[anime.id] || null;
  
          return (
            <div
              key={anime.id}
              onMouseEnter={() => setHoveredCard(anime.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="w-[166px] h-[300px] p-2 flex flex-col justify-between relative overflow-hidden transition-all duration-200 ease-in-out cursor-pointer text-left group"
            >
              <Link href={`/series/${anime.publicCode}/${anime.slug}`}>
                <img
                  src={anime.imagePoster}
                  alt={anime.name}
                  className="w-full h-[80%] object-cover group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:w-full group-hover:h-full group-hover:z-[1]"
                />
  
                {isFavorited && (
                  <div className="absolute top-2 right-2 z-[3] w-0 h-0 border-t-[0px] border-r-[34px] border-b-[32px] border-l-[0px] border-solid border-transparent border-r-black flex items-start justify-end text-[#FF640A] opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                    <svg
                      className="w-4 mt-[1px] -mr-[34px] fill-[#FF640A]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      role="img"
                    >
                      <path d="M4 2h8a1 1 0 0 1 1 1v9.92a1 1 0 0 1-1.625.78L8 11l-3.375 2.7A1 1 0 0 1 3 12.92V3a1 1 0 0 1 1-1z" />
                    </svg>
                  </div>
                )}
  
                <div className="relative w-[150px] h-[58px] flex flex-col justify-start text-white z-[1] opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis text-[14px] font-bold py-[10px]">{anime.name}</p>
                  <p className="text-[#A0A0A0] text-[12px] m-0">
                    {t(`audioTypes.${anime.audioType}`)}
                  </p>
                </div>
  
                {hoveredCard === anime.id && (
                  <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 p-[10px] text-white text-left opacity-100 bg-[rgba(20,21,25,0.9)] z-[2] h-full w-full flex flex-col justify-start items-start transition-opacity duration-200">
                    <h3 className="overflow-hidden text-ellipsis line-clamp-2 w-[130px] mb-[5px]">{anime.name}</h3>
                    <div className="flex items-center gap-[6px]">
                      <MaturityRating rating={Number(anime.rating) || 0} size={4} />
                      <span className="flex items-center gap-[2px]">
                        {anime.score}
                        <svg
                          className="w-4 h-4 inline-flex items-center text-[#f1f1f1]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          aria-labelledby="star-svg"
                          aria-hidden="false"
                          role="img"
                          fill="#f1f1f1"
                        >
                          <title id="star-svg">Avaliação</title>
                          <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z" />
                        </svg>
                      </span>
                    </div>
  
                    <span className="text-[#A0A0A0] text-sm font-medium">
                      {anime.seasons?.length ?? "N/A"} {t(`seasons.${anime.seasons?.length === 1 ? 'singular' : 'plural'}`)}
                    </span>
  
                    <span className="text-[#A0A0A0] text-sm font-medium">
                      {anime.totalEpisodes ?? "N/A"} {t(`episodes.${anime.totalEpisodes === 1 ? 'singular' : 'plural'}`)}
                    </span>
  
                    <p className="mt-[6px] text-white text-sm font-medium overflow-hidden text-ellipsis line-clamp-6 w-[140px]">
                      {anime.synopsis}
                    </p>
                  </div>
                )}
              </Link>
  
              <div className="absolute bottom-[10px] z-[3] flex items-center justify-center gap-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayButton firstEpisode={firstEpisode} />
                <BookmarkButton isFavorited={isFavorited} onToggle={() => handleFavoriteClick(anime)} />
                <AddButton
                  onClick={() => {
                    setSelectedAnime(anime);
                    setShowModal(true);
                  }}
                />
              </div>
            </div>
          );
        })}
    {showModal && selectedAnime && (
      <AddToListModal
        anime={selectedAnime}
        onClose={() => {
          setShowModal(false);
          setSelectedAnime(null);
        }}
      />
    )}
  </div>  
  );
};

export default AnimeGrid;


