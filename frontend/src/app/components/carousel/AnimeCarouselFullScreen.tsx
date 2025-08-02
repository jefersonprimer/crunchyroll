"use client";

import { useQuery } from "@apollo/client";
import { GET_HAS_THUMBNAIL } from "../../../lib/queries/getHasThumbnail";
import { GET_EPISODES } from "../../../lib/queries/getEpisodes";

import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { useFavorites } from "../../[locale]/contexts/FavoritesContext";

import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";

import MaturityRating from "../elements/MaturityRating";
import EpisodePlayButton from '../buttons/EpisodePlayButton';
import BookmarkButton from '../buttons/BookmarkButton';
import Link from "next/link";


const AnimeCarouselFullScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [firstEpisode, setFirstEpisode] = useState<Episode | null>(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const t = useTranslations();

  const { 
    data: animesData, 
    loading: animesLoading, 
    error: animesError 
  } = useQuery(GET_HAS_THUMBNAIL);

  const { 
    data: episodesData, 
    loading: episodesLoading 
  } = useQuery(GET_EPISODES);

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
    if (thumbnailAnimes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnailAnimes.length);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [thumbnailAnimes]);

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
      nextPage();
    } else if (touchDistance < -50) {
      prevPage();
    }

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

  if (animesLoading) {
    return (
      <div
        className="flex justify-center items-center relative w-full h-screen bg-black overflow-hidden mx-auto md:aspect-[16/9] md:h-auto"
      >
        <div className="w-full h-full absolute top-0 left-0 bg-[#111214] animate-pulse z-[1] md:block" />
        <div className="flex items-end md:items-center md:mt-[-100px] lg:mt-0 my-0 mx-auto relative w-full h-full min-h-screen flex-col lg:max-w-[1351px] lg:max-h-[432px]">
          <div className="absolute left-0 top-0 h-full lg:max-h-[372px] w-auto lg:w-[64px] flex-col justify-center items-center z-[3] hidden sm:flex">
            <button
              className="w-auto md:w-8 lg:w-16 h-full animate-pulse flex items-center justify-center opacity-100 border-none p-0"
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

          <div className="w-full lg:mx-auto lg:w-[1223px] text-white z-[2] lg:h-[432px] absolute left-0 right-0 bottom-0 md:relative md:flex md:flex-col md:py-6 md:items-start md:justify-center md:h-full sm:py-4 px-8 md:px-[60px] xl:px-0">
            <div className="flex flex-col items-center justify-center h-full w-full md:items-start md:justify-center lg:h-[432px] ">
              <div className="lg:max-w-[387.66px] lg:min-h-[360px] lg:h-full w-full h-auto flex flex-col items-center md:items-start">
                <div className="flex justify-center items-center overflow-hidden w-full max-w-[180px] md:min-w-[181.41px] md:max-w-[221px] md:min-h-[88.28px] md:max-h-[118.2px] lg:w-[283.25px] lg:h-[151.06px]">
                  <div className="w-full h-[88px] md:h-full bg-[#1F2025] animate-pulse" />
                </div>

                <div className="w-full flex flex-col items-center text-center mt-2 sm:hidden">
                  <div className="w-[70%] h-[18px] bg-[#1C1D23] animate-pulse mb-2" />
                  <div className="w-[90%] h-[24px] bg-[#1C1D23] animate-pulse" />
                </div>

                <div className='lg:max-w-[387.66px] lg:max-h-[216.94px] w-full h-auto mt-2 flex-col items-center text-center md:items-start md:text-left hidden sm:flex'>
                  <div className="flex flex-col">
                    <div className='flex items-center mb-3 mt-4'>
                      <div className="w-[260px] h-[25px] bg-[#1C1D23] animate-pulse" />
                    </div>
                    <div className="lg:w-[380px] lg:max-h-[96px] h-auto text-[#DADADA] text-base leading-6 overflow-hidden text-ellipsis [webkitLineClamp:4] [webkitBoxOrient:vertical] hidden lg:block">
                      <div className="w-full h-[20px] mb-2 bg-[#1C1D23] animate-pulse" />
                      <div className="w-full h-[20px] mb-2 bg-[#1C1D23] animate-pulse" />
                      <div className="w-full h-[20px] mb-2 bg-[#1C1D23] animate-pulse" />
                    </div>
                  </div>
                  <div className="border-none flex items-center gap-2 mt-3 lg:mt-8">
                    <div className="w-[160px] h-[40px] bg-[#1C1D23] animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-[10px] mt-10 lg:mt-0">
                <div
                  className="border border-[#1C1D23] rounded-[5px] w-[40px] h-[8px] bg-[#1C1D23] animate-pulse"
                />
                <div
                  className="border border-[#1C1D23] rounded-[5px] w-[20px] h-[8px] bg-[#1C1D23] animate-pulse"
                />
                <div
                  className="border border-[#1C1D23] rounded-[5px] w-[20px] h-[8px] bg-[#1C1D23] animate-pulse"
                />
                <div
                  className="border border-[#1C1D23] rounded-[5px] w-[20px] h-[8px] bg-[#1C1D23] animate-pulse"
                />
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 h-full lg:max-h-[372px] w-auto lg:w-[64px] flex-col justify-center items-center z-[3] hidden sm:flex">
            <button
              className="w-auto md:w-8 lg:w-16 h-full animate-pulse flex items-center justify-center opacity-100 border-none p-0"
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

  const currentAnime = thumbnailAnimes[currentIndex];
  const isFavorited = favorites.some((fav) => fav.id === currentAnime.id);

  return (
    <div
      className="flex justify-center items-center relative w-full h-screen bg-black overflow-hidden mx-auto md:aspect-[16/9] md:h-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >

      <img
        className="w-full h-full block absolute top-0 left-0 bg-cover bg-center bg-no-repeat z-[1] md:hidden"
        src={currentAnime.imagePoster}
        alt="Background mobile"
      />
      
      <img
        className="w-full h-full absolute top-0 left-0 bg-cover bg-center bg-no-repeat z-[1] md:block hidden"
        src={currentAnime.imageThumbnail}
        alt="Background desktop"
      />

      <div
        className="absolute bottom-0 left-0 w-full h-4/5 sm:h-1/2 pointer-events-none z-[2] [background:linear-gradient(180deg,#0000_40%,rgba(0,0,0,.749)_65%,#000_90%)]"
      />

      <div className="flex items-end md:items-center md:mt-[-100px] lg:mt-0 my-0 mx-auto relative w-full h-full min-h-screen flex-col lg:max-w-[1351px] lg:max-h-[432px]">
        <div className="absolute left-0 top-0 h-full  lg:max-h-[372px] w-auto lg:w-[64px] flex flex-col justify-center items-center z-[3]">
          <button
            className='cursor-pointer w-auto md:w-8 lg:w-16 h-full p-0 flex items-center justify-center z-[3]'
            onClick={prevPage}
            aria-label="Anterior"
          >
            <svg 
              className="text-[#FFFFFF] hover:text-[#A0A0A0] svg-size lg:w-11.5 lg:h-11.5"
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

        <div className="
          w-full lg:mx-auto lg:w-[1223px] text-white z-[2] lg:h-[432px]
          absolute left-0 right-0 bottom-14.5 sm:bottom-0
          md:relative md:flex md:flex-col md:py-6 md:items-start md:justify-center md:h-full
          sm:py-4
          px-8 md:px-[60px] xl:px-0
        ">
          <div className="flex flex-col items-center justify-center h-full w-full md:items-start md:justify-center lg:h-[432px] ">
            <div className="lg:max-w-[387.66px] lg:min-h-[360px] lg:h-full w-full h-auto flex flex-col items-center md:items-start">
             
              <div className="flex justify-center items-center overflow-hidden w-full max-w-[180px] md:min-w-[181.41px] md:max-w-[221px] md:min-h-[88.28px] md:max-h-[118.2px] lg:w-[283.25px] lg:h-[151.06px]">
                <Link
                  href={`/series/${currentAnime.publicCode}/${currentAnime.slug}`}
                >
                  <img
                    alt={currentAnime.name}
                    className="object-contain w-full h-full"
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
              
              <div className='lg:max-w-[387.66px] lg:max-h-[216.94px] w-full h-auto mt-2 flex flex-col items-center text-center md:items-start md:text-left'>
                <div className="flex flex-col">
                  <div className='flex items-center mb-2'>
                    <MaturityRating rating={currentAnime.rating} size={5} />
                    <span className="flex items-center text-[0.8rem] relative pl-[14px] 
                      before:content-['◆'] before:text-[#A0A0A0] before:text-[0.5rem] 
                      before:absolute before:left-[4px] before:top-1/2 before:-translate-y-1/2 
                      before:mr-[8px] first:before:hidden">
                    </span>
                    <p className="text-sm text-[#A0A0A0] font-medium opacity-100">
                      {t(`audioTypes.${currentAnime.audioType}`)}
                    </p>
                  </div>
                  <p className="lg:w-[380px] lg:max-h-[96px] h-auto text-[#DADADA] text-base leading-6 overflow-hidden text-ellipsis [webkitLineClamp:4] [webkitBoxOrient:vertical] hidden lg:block">
                    {currentAnime.synopsis}
                  </p>
                </div>
                <div className="border-none flex items-center gap-2 mt-3 lg:mt-8">
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
            <div className="flex justify-center gap-[10px] mt-8 md:mt-10 lg:mt-0">
              {thumbnailAnimes.map((anime: Anime, index: number) => (
                <button
                  key={anime.id}
                  className={`
                     rounded-[5px] w-[20px] h-[8px] relative
                    bg-[#868789] cursor-pointer flex justify-center items-center
                    overflow-hidden transition-all duration-300 ease-in-out
                    hover:bg-[#FF4500] hover:border-[#FF4500]
                    ${currentIndex === index ? 'w-[40px]' : ''}
                  `}
                  onClick={() => navigateToPage(index)}
                >
                  <span
                    className={`
                      absolute top-0 left-0 h-full bg-[#FF640A] rounded-[5px]
                      ${currentIndex === index
                        ? 'transition-all duration-[10s] w-full opacity-100'
                        : 'transition-none w-0 opacity-100'}
                    `}
                  ></span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-0 h-full lg:max-h-[372px] w-auto lg:w-[64px] flex flex-col justify-center items-center z-[3]">
          <button
            className='cursor-pointer w-auto md:w-8 lg:w-16 h-full p-0 flex items-center justify-center z-[3]'
            onClick={nextPage}
            aria-label="Próximo"
          >
            <svg 
              className="text-[#FFFFFF] hover:text-[#A0A0A0] svg-size lg:w-11.5 lg:h-11.5" 
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