"use client";

import { useTranslations } from 'next-intl';
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";
import MaturityRating from "@/app/components/elements/MaturityRating";

interface EpisodeCardProps {
  episode: Episode;
  anime: Anime;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, anime }) => {
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

  const formatReleaseDate = (dateString?: string) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  const getEpisodeNumber = (title: string) => {
    const match = title.match(/E(\d+)/);
    return match ? match[1] : "";
  };

  const getSeasonNumber = () => {
    if (!anime.seasons || anime.seasons.length === 0) return null;
    return anime.seasons[0].seasonNumber;
  };

  const parseRating = (rating?: string | number) => {
    if (rating === undefined) return undefined;
    if (typeof rating === 'number') return rating;
    const numRating = parseInt(rating.replace(/[^0-9]/g, ''));
    return isNaN(numRating) ? undefined : numRating;
  };
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const episodeNumber = getEpisodeNumber(episode.title);
  const hasVideoUrl = episode.videoUrl || (episode.versions && episode.versions.length > 0);
  const rating = parseRating(anime.rating);
  const seasonNumber = getSeasonNumber();

  return (
    <Link href={hasVideoUrl ? `/${locale}/watch/${episode.publicCode}/${episode.slug}` : "#"}
    className={`relative w-[303.25px] h-auto min-h-[269.33px] block text-inherit transition-all duration-300 overflow-hidden ${!hasVideoUrl ? 'cursor-not-allowed opacity-70 pointer-events-none' : 'cursor-pointer'}`}
    onClick={(e) => !hasVideoUrl && e.preventDefault()}
    >
      <div className="w-[283.25px] h-auto min-h-[249.33px]">
        <div className="relative w-full pt-[56.25%] bg-[#2a2a2a]">
          {(!showImage || !imageLoaded) && <div className="absolute top-0 left-0 w-full h-full bg-[#141519] animate-pulse" />}
          <img
            src={episode.image}
            alt={episode.title}
            className={`absolute top-0 left-0  w-[283.25px] h-[159.33px] object-cover transition-transform duration-300 ${showImage && imageLoaded ? 'block' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
          />
          {/* OVERLAYS */}
          {showImage && imageLoaded && (
            <>
              {rating && (
                <div className="absolute top-1 left-1 font-bold z-10">
                  <MaturityRating rating={rating} />
                </div>
              )}
              {episode.duration && (
                <div className="absolute bottom-1 right-1 px-2 py-1 text-sm bg-black/70 text-white font-bold z-10">
                  {episode.duration}
                </div>
              )}
              {hasVideoUrl ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-17 h-17 bg-black/40 rounded-full flex items-center justify-center z-10">
                  <svg className="w-11 h-11 fill-white" viewBox="0 0 24 24"><path d="m4 2 16 10L4 22z" /></svg>
                </div>
              ) : (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium z-10">
                  Em breve
                </div>
              )}
            </>
          )}
        </div>
        {/* EPISODE INFO */}
        <div className="p-0 relative z-10 flex flex-col gap-1 w-[283.25px] h-auto min-h-[90px]">
          {showText ? (
            <>
              <div>
                <small className="text-[0.625rem] font-semibold text-[#A0A0A0] uppercase">{anime.name}</small>
              </div>
              <h3 className="text-sm text-white mb-4 line-clamp-2">
                {seasonNumber && <span className="font-semibold text-[0.875rem] mr-1">T{seasonNumber}</span>}
                {episodeNumber && <span className="font-semibold text-[0.875rem] mr-1">E{episodeNumber} - </span>}
                {episode.title.replace(/^E\d+\s*-\s*/, '')}
              </h3>
              {anime.audioType && (
                <div className="flex justify-between items-center">
                  <div className="text-[#A0A0A0]">{t(`audioTypes.${anime.audioType}`)}</div>
                  <button>
                    <svg
                      className="text-[#A0A0A0] w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 24"
                      data-t="more-svg"
                      aria-hidden="true"
                      role="img"
                      fill='currentColor'
                    >
                      <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-2 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm2 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
                      </path>
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="bg-[#141519] w-4/5 h-5 my-2 animate-pulse" />
              <div className="bg-[#141519] w-1/2 h-4 animate-pulse" />
            </>
          )}
        </div>
        {/* HOVER CARD INFO */}
        <div className="absolute w-[303.25px] h-auto min-h-[269.33px] inset-0 p-2 text-white opacity-0 hover:opacity-1000 bg-[#23252b] transition-opacity duration-300 flex flex-col justify-between z-60">
          <div className="flex-1">
            <div>
              <small className="text-[0.625rem] font-semibold text-[#A0A0A0] uppercase">{anime.name}</small>
            </div>
            <h3 className="text-sm text-white mb-4 line-clamp-2">
              {seasonNumber && <span className="font-semibold text-[0.875rem] mr-1">T{seasonNumber}</span>}
              {episodeNumber && <span className="font-semibold text-[0.875rem] mr-1">E{episodeNumber} - </span>}
              {episode.title.replace(/^E\d+\s*-\s*/, '')}
            </h3>
            {episode.releaseDate && (
              <div className="flex items-center gap-2">
                {rating !== undefined && <MaturityRating rating={rating} size={4} />}
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 fill-[#A0A0A0]" viewBox="0 0 24 24"><path d="M4 20h16v-8H4v8zM6 6v1a1 1 0 0 0 2 0V6h8v1a1 1 0 1 0 2 0V6h2v4H4V6h2zm15-2h-3V3a1 1 0 1 0-2 0v1H8V3a1 1 0 0 0-2 0v1H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" /></svg>
                  <span className="text-sm text-[#A0A0A0]">{formatReleaseDate(episode.releaseDate)}</span>
                </span>
              </div>
            )}
            <p className="text-sm text-gray-100 line-clamp-5 mt-1">
              {episode.synopsis || anime.synopsis || 'Sinopse não disponível.'}
            </p>
          </div>
          {hasVideoUrl && (
            <div className="relative flex items-start justify-start w-full p-0">
              <button className="flex items-center gap-2 text-orange-500 font-semibold text-sm">
                <svg className="w-6 h-6 fill-orange-500" viewBox="0 0 24 24"><path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" /></svg>
                <span className="uppercase whitespace-nowrap">REPRODUZIR T{seasonNumber} E{episodeNumber}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
