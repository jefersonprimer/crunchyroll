import { useTranslations } from 'next-intl';
import React, { useState, useEffect, useRef } from "react";
import { useFavorites } from "@/app/[locale]/contexts/FavoritesContext";
import { useParams } from 'next/navigation';
import { Anime } from "@/types/anime";

import MaturityRating from "@/app/components/elements/MaturityRating";
import AddToListModal from "@/app/components/modals/AddToListModal";
import AuthModal from "@/app/components/modals/AuthModal";
import ShareModal from '@/app/components/modals/ShareModal';

import ShareButton from "@/app/components/buttons/ShareButton";
import MoreOptionsButton from '@/app/components/buttons/MoreOptionsButton';
import EpisodePlayButton from '@/app/components/buttons/EpisodePlayButton';
import BookmarkButton from '@/app/components/buttons/BookmarkButton';
import AddButton from '@/app/components/buttons/AddButton';
import useVoteAnime from '@/app/[locale]/hooks/useVoteAnime';
import { useUserAnimeVote } from '@/app/[locale]/hooks/useVoteAnime';
import { useAuth } from '@/app/[locale]/hooks/useAuth';
import Link from 'next/link';

interface HeroSectionProps {
  anime: Anime;
  expandedSynopsis: boolean;
  toggleSynopsis: () => void;
  refetchAnime: () => Promise<any>;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  anime,
  expandedSynopsis,
  toggleSynopsis,
  refetchAnime,
}) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [showModal, setShowModal] = useState(false);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const isFavorited = favorites.some((fav) => fav.id === anime.id);
  const t = useTranslations('HeroSection');
  const params = useParams();
  const locale = params.locale as string;
  const { voteAnime, loading: voting, error: voteError, success: voteSuccess } = useVoteAnime();
  const { userProfile } = useAuth();
  const { score: userVoteScore } = useUserAnimeVote(anime.id, userProfile?.id ?? null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [localScore, setLocalScore] = useState<number | null>(anime.score ?? null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleVote = async (rating: number) => {
    if (!userProfile) {
      setShowAuthModal(true);
      return;
    }
    setSelectedRating(rating);
    await voteAnime(anime.id, rating, userProfile?.id);
    if (refetchAnime) {
      const result = await refetchAnime();
      if (result?.data?.animes) {
        const updated = result.data.animes.find((a: Anime) => a.id === anime.id);
        if (updated) setLocalScore(updated.score);
      }
    }
  };

  useEffect(() => {
    if (userVoteScore !== null && userVoteScore !== undefined) {
      setSelectedRating(userVoteScore);
    }
  }, [userVoteScore]);

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
    <div className={`w-full transition-[height] duration-300 ease-in-out overflow-hidden bg-black ${
      expandedSynopsis ? 'h-auto' : ''
    }`}>
      <div
        ref={heroImageRef}
        className="relative w-full h-[548px] bg-cover bg-center flex my-0 mx-auto items-center justify-center before:content-[''] before:absolute before:inset-0 before:bg-inherit before:bg-cover before:bg-center before:blur-[150px] before:z-[-1] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-[rgba(0,0,0,0.05)] after:via-[rgba(0,0,0,0.5)] after:to-[rgba(0,0,0,0.9)] after:z-0"
      >
        
   
        <div className="absolute z-[1] text-white w-[1223px] h-auto max-h-[384px] top-0 flex items-center">
          <div className="relative z-[1] text-white w-auto max-w-[492.08px] h-auto max-h-[254.13px]  py-[40px]">
            <div className="max-h-[151.06px] max-w-[283.25px] w-auto h-auto">
              {anime.imageLogo ? (
                <img
                alt={anime.name}
                className="max-h-[151.06px] max-w-[283.25px] w-auto h-auto object-contain mx-auto"
                loading="eager"
                sizes="(max-width: 960px) 320px, (max-width: 1260px) 480px, 600px"
                src={anime.imageLogo}
                srcSet={`
                  ${anime.imageLogo} 320w,
                  ${anime.imageLogo} 480w,
                  ${anime.imageLogo} 600w
                `}
              />
              ) : (
                <h1 className="font-medium text-white text-[34px] text-center">{anime.name}</h1>
              )}
            </div>
          
            <div className="items-center flex-wrap w-auto max-w-[492.08px] h-auto max-h-[192.94px] my-6">
              <div className="flex items-center">
                <MaturityRating rating={Number(anime.rating) || 0} size={5} />
                <span className="flex items-center text-[0.9rem] relative
                  before:content-['◆'] before:text-[#DADADA] before:text-[0.5rem]
                  before:absolute before:left-[4px] before:top-1/2 before:-translate-y-1/2
                  before:mr-[4px] first:before:hidden">
                </span>
                <span className="flex items-center text-sm relative pl-[14px] text-[#DADADA] font-medium">
                  {t(`audioTypes.${anime.audioType}`)}
                </span>
                <span className="flex items-center text-[0.9rem] relative pl-[14px]
                  before:content-['◆'] before:text-[#DADADA] before:text-[0.5rem]
                  before:absolute before:left-[4px] before:top-1/2 before:-translate-y-1/2
                  before:mr-[4px] first:before:hidden">
                </span>
                <div className="flex flex-wrap items-center">
                  {anime.genres?.map((genre, index) => (
                    <React.Fragment key={genre.id}>
                      <Link
                        href={`/${locale}/videos/${genre.name.toLowerCase()}`}
                        className="text-[#DADADA] underline underline-offset-[3px] text-sm font-medium hover:text-white transition-colors"
                      >
                        {genre.name}
                      </Link>
                      {index < (anime.genres?.length || 0) - 1 && (
                        <span className="mr-1">,</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {/* Votação por estrelas */}
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`p-0 m-0 bg-transparent border-none cursor-pointer ${selectedRating === star ? 'text-yellow-400' : 'text-gray-400'} ${voting ? 'opacity-50 pointer-events-none' : ''}`}
                      onClick={() => handleVote(star)}
                      aria-label={`Votar ${star} estrela${star > 1 ? 's' : ''}`}
                      disabled={voting}
                    >
                      <svg
                        className="w-[26px] h-[26px]"
                        fill={selectedRating && star <= selectedRating ? '#FF640A' : '#DADADA'}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z" />
                      </svg>
                    </button>
                  ))}
                </div>
                <div className="w-[1px] h-[20px] bg-[#4A4E58] my-0 mx-[4px]" />
                <span className="text-sm text-white font-bold hover:underline cursor-pointer">
                  {localScore !== null ? localScore.toFixed(1) : "N/A"}
                </span>
              </div>
            </div>

            <div className="flex items-center w-[452.67px] h-[52px] gap-6 flex-wrap">
              <div className="flex items-center gap-2.5">
                <EpisodePlayButton
                  episode={anime.episodes && anime.episodes.length > 0 ? anime.episodes[0] : null}
                />
                <BookmarkButton isFavorited={isFavorited} onToggle={handleFavoriteClick} outline />
              </div>
              <div className="flex items-center gap-4">
                <AddButton onClick={() => setShowModal(true)}/>
                <ShareButton
                  url={`${window.location.origin}/series/${anime.id}/${anime.slug}`}
                  title={anime.name}
                  onOpen={() => setShowShareModal(true)}
                />
                <MoreOptionsButton />
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none z-[1] [background:linear-gradient(180deg,#0000_10%,rgba(0,0,0,.749)_90%,#000_90%)]"
        />
      </div>

      <div className="flex items-center justify-center my-0 mx-auto w-full h-full relative z-[1] pb-[60px]">
        <div className="pb-[40px] w-[1223px] relative mt-[-22vh] border-b-2 border-[#23252B]">
          {/* Overlay de opacidade na metade inferior */}
          {!expandedSynopsis && (
            <div className="absolute left-0 bottom-0 w-full z-[2] h-full pointer-events-none" 
            // style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1), rgba(0,0,0,0.1), rgba(0,0,0,0.6), rgba(0,0,0,0.1), rgba(0,0,0,0.1) 100%)'}}
            />
          )}
          <div className={`relative transition-[max-height] duration-300 ease-in-out ${
            expandedSynopsis ? 'max-h-[1000px]' : 'max-h-[100px]'
          } overflow-hidden`}>
            <div className="flex w-full gap-8">
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
            <span className="uppercase font-semibold text-[0.75rem]">{expandedSynopsis ? t('buttons.showLess') : t('buttons.showMore')}</span>
          </button>
        </div>
        
      </div>

      {showModal && (
        <AddToListModal
          anime={anime}
          onClose={() => setShowModal(false)}
        />
      )}
      {showAuthModal && (
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      )}
      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          url={`${window.location.origin}/series/${anime.id}/${anime.slug}`}
          title={anime.name}
        />
      )}
    </div>
  );
};

export default HeroSection;
