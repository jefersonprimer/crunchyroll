"use client";

import "../../globals.css";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import MaturityRating from "../elements/MaturityRating";
import { useFavorites } from "../../[locale]/contexts/FavoritesContext";
import { useTranslations } from 'next-intl';
import EpisodePlayButton from '../buttons/EpisodePlayButton';
import BookmarkButton from '../buttons/BookmarkButton';

import { GET_HAS_THUMBNAIL } from "../../../lib/queries/getHasThumbnail";
import { GET_EPISODES } from "../../../lib/queries/getEpisodes";

import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";

interface AnimeCarouselFullScreenProps {
  className?: string;
}

const AnimeCarouselFullScreen: React.FC<AnimeCarouselFullScreenProps> = ({
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [firstEpisode, setFirstEpisode] = useState<Episode | null>(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [minLoading, setMinLoading] = useState(true);

  const t = useTranslations();

  // Fetch animes with thumbnails using GraphQL
  const { 
    data: animesData, 
    loading: animesLoading, 
    error: animesError 
  } = useQuery(GET_HAS_THUMBNAIL);

  // Fetch episodes using GraphQL
  const { 
    data: episodesData, 
    loading: episodesLoading 
  } = useQuery(GET_EPISODES);

  // Get the thumbnailAnimes from the query result
  const thumbnailAnimes = animesData?.hasThumbnail || [];
  const episodes = episodesData?.episodes || [];

  useEffect(() => {
    if (!episodesLoading && thumbnailAnimes.length > 0) {
      const currentAnime = thumbnailAnimes[currentIndex];
      if (currentAnime && currentAnime.episodes && currentAnime.episodes.length > 0) {
        setFirstEpisode(currentAnime.episodes[0]);
      } else {
        setFirstEpisode(null);
      }
    }
  }, [episodesLoading, thumbnailAnimes, currentIndex, episodes]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (thumbnailAnimes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnailAnimes.length);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [thumbnailAnimes]);

  useEffect(() => {
    const timer = setTimeout(() => setMinLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const nextPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnailAnimes.length);
  };

  const prevPage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + thumbnailAnimes.length) % thumbnailAnimes.length
    );
  };

  const navigateToPage = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const touchDistance = touchStartX - touchEndX;

    if (touchDistance > 50) {
      nextPage(); // Swipe left
    } else if (touchDistance < -50) {
      prevPage(); // Swipe right
    }

    // Reset touch values
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleFavoriteClick = (anime: Anime) => {
    const isFavorited = favorites.some((fav) => fav.id === anime.id);
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  if (animesLoading || minLoading) {
    // Skeleton visual durante o loading
    return (
      <div
        className={`relative w-[1351px] h-[759.94px] aspect-[16/9] bg-black overflow-hidden flex justify-center items-start ${className}`}
      >
        {/* Imagem de fundo skeleton */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#111214] animate-pulse z-[1]" />
        <div className='gradientOverlay'></div>
        {/* Wrapper centralizado das arrows e conteúdo */}
        <div className="relative w-[1351px] h-[432px] mx-auto my-0 p-0  top-0">
          {/* Arrow esquerda skeleton */}
          <div className="absolute left-0 top-0 h-[432px] w-[64px] flex flex-col justify-center items-center z-[3]">
            <button
              className="w-[64px] h-full animate-pulse flex items-center justify-center  opacity-100 border-none p-0"
              tabIndex={-1}
              aria-label="Anterior (skeleton)"
              disabled
            >
              <svg
                className="text-[#24262C]"
                width="46"
                height="46"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
                fill="currentColor"
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
              </svg>
            </button>
          </div>
          {/* Conteúdo central skeleton */}
          <div className="absolute py-[60px] top-0 left-1/2 -translate-x-1/2 w-[1223px] text-white z-[2] flex flex-col items-start justify-start h-[432px]">
            <div className="flex flex-col items-start justify-start h-[432px]">
              <div className="w-[387.66px] h-[360px] mb-8">
                {/* Logo skeleton */}
                <div className="w-auto max-w-[283.25px] h-[127.06px] bg-[#1F2025] animate-pulse mb-4" />
                <div className='w-[387.66px] h-[216.94px] mt-6'>
                  <div className='flex items-center mb-3'>
                    <div className="w-[290px] h-[20px] bg-[#1C1D23] animate-pulse" />
                  </div>
                  {/* Sinopse skeleton */}
                  <div className="border-none flex-col items-center mb-8">
                    <div className="w-[380px] h-[20px] mb-2 bg-[#1C1D23] animate-pulse" />
                    <div className="w-[380px] h-[20px] mb-2 bg-[#1C1D23] animate-pulse" />
                    <div className="w-[380px] h-[20px] mb-2 bg-[#1C1D23] animate-pulse" />
                  </div>
                  {/* Botões skeleton */}
                  <div className="border-none flex items-center mt-2">
                    <div className="w-[160px] h-[40px] bg-[#1C1D23] animate-pulse" />
                  </div>
                </div>
              </div>
              {/* Indicadores skeleton */}
              <div className="flex justify-center gap-[10px]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="border border-[#1C1D23] rounded-[5px] w-[20px] h-[8px] bg-[#1C1D23] animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Arrow direita skeleton */}
          <div className="absolute right-0 top-0 h-[432px] w-[64px] flex flex-col justify-center items-center z-[3]">
            <button
              className="w-[64px] h-full animate-pulse flex items-center justify-center opacity-100 border-none p-0"
              tabIndex={-1}
              aria-label="Próximo (skeleton)"
              disabled
            >
              <svg
                className="text-[#24262C]"
                width="46"
                height="46"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
                fill="currentColor"
              >
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (animesError) {
    return <div>Erro ao carregar os dados: {animesError.message}</div>;
  }

  if (!thumbnailAnimes || thumbnailAnimes.length === 0) {
    return <div></div>;
  }

  const currentAnime = thumbnailAnimes[currentIndex];
  const isFavorited = favorites.some((fav) => fav.id === currentAnime.id);

  return (
    <div
      className={`relative w-[1351px] h-[759.94px] aspect-[16/9] bg-black overflow-hidden flex justify-center items-start ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-[1]"
        src={isMobile
          ? currentAnime.imagePoster
          : currentAnime.imageThumbnail}
        alt="Background"
      />
      <div className='gradientOverlay'></div>

      {/* Wrapper centralizado das arrows e conteúdo */}
      <div className="relative w-[1351px] h-[432px] mx-auto my-0 p-0  top-0">
        {/* Arrow esquerda */}
        <div className="absolute left-0 top-0 h-[432px] w-[64px] flex flex-col justify-center items-center z-[3]">
          <button
            className='cursor-pointer w-[64px] h-full p-0 flex items-center justify-center z-[3]'
            onClick={prevPage}
            aria-label="Anterior"
          >
            <svg 
              className="text-[#FFFFFF] hover:text-[#A0A0A0]" 
              width="46" 
              height="46" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              aria-labelledby="angle-svg" 
              aria-hidden="true" 
              role="img"
              fill="currentColor"
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
            </svg>
          </button>
        </div>
        {/* Conteúdo central */}
        <div className="absolute py-[60px] top-0 left-1/2 -translate-x-1/2 w-[1223px] text-white z-[2] flex flex-col items-start justify-start h-[432px]">
          <div className="flex flex-col items-start justify-start h-[432px]">
            <div className="w-[387.66px] h-[360px]">
              <div className="w-auto max-w-[283.25px] h-auto max-h-[103.06px] overflow-hidden">
                <Link
                  href={`/series/${currentAnime.publicCode}/${currentAnime.slug}`}
                  tabIndex={0}
                >
                  <img
                    alt={currentAnime.name}
                    className="max-h-[103.06px] max-w-[283.25px] w-auto h-auto object-contain"
                    loading="eager"
                    sizes="(max-width: 960px) 320px, (max-width: 1260px) 480px, 600px"
                    src={currentAnime.imageLogo}
                    srcSet={`
                      ${currentAnime.imageLogo} 320w,
                      ${currentAnime.imageLogo} 480w,
                      ${currentAnime.imageLogo} 600w
                    `}
                  />
                </Link>
              </div>
              <div className='w-[387.66px] h-[216.94px] mt-6'>
                <div className='flex items-center gap-[5px]'>
                <MaturityRating rating={currentAnime.rating} size={5} />
                <span className="flex items-center text-[0.9rem] relative pl-[14px] 
                  before:content-['◆'] before:text-[#A0A0A0] before:text-[0.6rem] 
                  before:absolute before:left-[4px] before:top-1/2 before:-translate-y-1/2 
                  before:mr-[8px] first:before:hidden">
                </span>
                  <p className="text-[0.9rem] text-[#A0A0A0] my-[5px] mx-0">
                    {t(`audioTypes.${currentAnime.audioType}`)}
                  </p>
                </div>
                <p className="w-[380px] h-[96px] mb-6 text-[#DADADA] text-base leading-6 overflow-hidden text-ellipsis [display:-webkit-box] [webkitLineClamp:4] [webkitBoxOrient:vertical]">
                  {currentAnime.synopsis}
                </p>
                <div className="border-none flex items-center gap-2">
                  <EpisodePlayButton
                    episode={currentAnime.episodes && currentAnime.episodes.length > 0 ? currentAnime.episodes[0] : null}
                  />
                  
                  <BookmarkButton
                    isFavorited={isFavorited}
                    onToggle={() => handleFavoriteClick(currentAnime)}
                    color="#FF640A"
                    outline
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-[10px]">
              {thumbnailAnimes.map((anime: Anime, index: number) => (
                <button
                  key={anime.id}
                  className={`
                    border border-[#868789] rounded-[5px] w-[20px] h-[8px] relative
                    bg-[#868789] cursor-pointer flex justify-center items-center
                    overflow-hidden transition-all duration-300 ease-in-out
                    hover:bg-[#FF4500] hover:border-[#FF4500]
                    ${currentIndex === index ? 'w-[40px]' : ''}
                  `}
                  onClick={() => navigateToPage(index)}
                >
                  <span className={`
                    absolute top-0 left-0 h-full bg-[#ff640a] rounded-[5px]
                    transition-all duration-[10s] ease-linear opacity-0
                    ${currentIndex === index ? 'w-full opacity-100' : 'w-0'}
                  `}></span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Arrow direita */}
        <div className="absolute right-0 top-0 h-[432px] w-[64px] flex flex-col justify-center items-center z-[3]">
          <button
            className='cursor-pointer w-[64px] h-full p-0 flex items-center justify-center z-[3]'
            onClick={nextPage}
            aria-label="Próximo"
          >
            <svg 
              className="text-[#FFFFFF] hover:text-[#A0A0A0]" 
              width="46" 
              height="46" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              aria-labelledby="angle-svg" 
              aria-hidden="true" 
              role="img"
              fill="currentColor"  
            >
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimeCarouselFullScreen;