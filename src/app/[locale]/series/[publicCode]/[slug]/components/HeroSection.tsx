import { useTranslations } from 'next-intl';
import React, { useState, useEffect, useRef } from "react";
import { useFavorites } from "@/app/[locale]/contexts/FavoritesContext";
import { useParams } from 'next/navigation';
import { Anime } from "@/types/anime";

import MaturityRating from "@/app/components/elements/MaturityRating";
import AddToListModal from "@/app/components/modals/AddToListModal";

import ShareButton from "@/app/components/buttons/ShareButton";
import MoreOptionsButton from '@/app/components/buttons/MoreOptionsButton';
import EpisodePlayButton from '@/app/components/buttons/EpisodePlayButton';
import BookmarkButton from '@/app/components/buttons/BookmarkButton';
import AddButton from '@/app/components/buttons/AddButton';

interface HeroSectionProps {
  anime: Anime;
  expandedSynopsis: boolean;
  toggleSynopsis: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  anime,
  expandedSynopsis,
  toggleSynopsis,
}) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [showModal, setShowModal] = useState(false);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const isFavorited = favorites.some((fav) => fav.id === anime.id);
  const t = useTranslations('HeroSection');
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    const updateBackgroundImage = () => {
      if (heroImageRef.current) {
        const isMobile = window.innerWidth <= 768;
        const imageUrl = isMobile 
          ? (anime.imageBannerMobile || anime.imagePoster)
          : (anime.imageBannerDesktop || anime.imagePoster);
        
        heroImageRef.current.style.backgroundImage = `url(${imageUrl})`;
      }
    };

    // Initial update
    updateBackgroundImage();

    // Add resize listener
    window.addEventListener('resize', updateBackgroundImage);

    // Cleanup
    return () => window.removeEventListener('resize', updateBackgroundImage);
  }, [anime.imageBannerMobile, anime.imageBannerDesktop, anime.imagePoster]);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  if (!anime) {
    return null;
  }

  return (
    <div className={`w-full mb-[30px] transition-[height] duration-300 ease-in-out overflow-hidden bg-black ${
      expandedSynopsis ? 'h-auto' : ''
    }`}>
      <div
        ref={heroImageRef}
        className="relative w-full h-[540px] bg-cover bg-center flex items-center justify-start before:content-[''] before:absolute before:inset-0 before:bg-inherit before:bg-cover before:bg-center before:blur-[150px] before:z-[-1] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-[rgba(0,0,0,0.05)] after:via-[rgba(0,0,0,0.5)] after:to-[rgba(0,0,0,0.9)] after:z-0"
      >
        <div className="relative z-[1] text-left text-white p-[60px] mb-[60px]">
          <div className="w-[283.25px] h-auto mt-[-60px] mb-[60px]">
            <img src={anime.imageLogo} alt={anime.name} />
          </div>
          
          <div className="flex items-center flex-wrap gap-y-2 mt-0">
            <MaturityRating rating={Number(anime.rating) || 0} size={5} />
            <span className="flex items-center text-sm relative pl-[14px]">
              {t(`audioTypes.${anime.audioType}`)}
            </span>
            <div className="flex flex-wrap items-center">
              {anime.genres?.map((genre, index) => (
                <React.Fragment key={genre.id}>
                  <span className="text-white underline underline-offset-[3px] text-sm">
                    {genre.name}
                  </span>
                  {index < (anime.genres?.length || 0) - 1 && (
                    <span className="mr-1">,</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-[26px] h-[26px] fill-[#DADADA]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-[#ddd]">
              {anime.score?.toFixed(1) || "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-[30px] flex-wrap">
            <EpisodePlayButton
              episode={anime.episodes && anime.episodes.length > 0 ? anime.episodes[0] : null}
            />
            <BookmarkButton isFavorited={isFavorited} onToggle={handleFavoriteClick} outline />
            <AddButton onClick={() => setShowModal(true)}/>
            <ShareButton 
              url={`${window.location.origin}/series/${anime.id}/${anime.slug}`}
              title={anime.name}
            />
            <MoreOptionsButton />
          </div>
        </div>
      </div>

      <div className="w-full h-full relative z-[1] pb-[24px] bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0.9)] to-[rgba(0,0,0,1)]">
        <div className="pb-[60px] mx-[60px] relative mt-[-18vh] border-b-2 border-[#23252B]">
          <div className={`relative transition-[max-height] duration-300 ease-in-out ${
            expandedSynopsis ? 'max-h-[1000px]' : 'max-h-[100px]'
          } overflow-hidden`}>
            <div className="flex w-full gap-5">
              <div className="flex-1 rounded-lg">
                <p>{anime.synopsis}</p>
              </div>
              <div className="flex-1 rounded-lg">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-1">
                    <strong className="text-white text-sm">{t('metadata.audio')}:</strong>
                    <span className="text-[#A0A0A0] text-[0.95rem] leading-snug">
                      {Array.isArray(anime.audioLanguages)
                        ? anime.audioLanguages.join(', ')
                        : anime.audioLanguages || t('metadata.notAvailable')}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <strong className="text-white text-sm">{t('metadata.subtitles')}:</strong>
                    <span className="text-[#A0A0A0] text-[0.95rem] leading-snug">
                      {anime.subtitles || t('metadata.notAvailable')}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    <strong className="text-white text-sm whitespace-nowrap">{t('metadata.contentRating')}:</strong>
                    <MaturityRating rating={Number(anime.rating) || 0} size={4} />
                    <span className="text-[#A0A0A0] text-[0.95rem] leading-snug">
                      {anime.contentAdvisory}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <strong className="text-white text-sm">{t('metadata.genres')}:</strong>
                    <span className="text-[#A0A0A0] text-[0.95rem] leading-snug">
                      {anime.genres?.map(g => g.name).join(", ") || t('metadata.notAvailable')}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-[#A0A0A0] text-[0.95rem] leading-snug">
                      {anime.contentSources?.[0]?.copyright || t('metadata.notAvailable')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="absolute bottom-0 text-[#FF6408] border-none py-2 px-0 cursor-pointer transition-colors duration-200 inline-block hover:text-white"
            onClick={toggleSynopsis}
          >
            {expandedSynopsis ? t('buttons.showLess') : t('buttons.showMore')}
          </button>
        </div>
      </div>

      {showModal && (
        <AddToListModal
          anime={anime}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default HeroSection;
