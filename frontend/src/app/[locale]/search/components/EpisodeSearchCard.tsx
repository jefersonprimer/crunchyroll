"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Anime } from '@/types/anime';
import { Episode } from '@/types/episode';
import MaturityRating from '@/app/components/elements/MaturityRating';

interface EpisodeSearchCardProps {
  episode: Episode;
  anime: Anime;
}

export const EpisodeSearchCard: React.FC<EpisodeSearchCardProps> = ({ episode, anime }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const locale = useLocale();
  const t = useTranslations('EpisodeSearchCard');

  const hasVideoUrl = episode.videoUrl && episode.videoUrl.trim() !== '';
  
  const episodeNumber = episode.title.match(/E(\d+)/)?.[1];
  
  const getSeasonNumber = () => {
    if (anime.seasons && anime.seasons.length > 0) {
      return anime.seasons[0]?.seasonNumber || null;
    }
    return null;
  };
  
  const seasonNumber = getSeasonNumber();
  
  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'pt-BR' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link 
      href={hasVideoUrl ? `/${locale}/watch/${episode.publicCode}/${episode.slug}` : "#"}
      className={`group block w-full p-2 hover:bg-[#141519] transition-all duration-300 ${!hasVideoUrl ? 'cursor-not-allowed opacity-70 pointer-events-none' : 'cursor-pointer'}`}
      onClick={(e) => !hasVideoUrl && e.preventDefault()}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="relative w-[156.44px] h-[88px] bg-[#2a2a2a] overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-[#141519] animate-pulse" />
            )}
            <img
              src={episode.image}
              alt={episode.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
            {anime.rating !== undefined && (
              <div className="absolute top-1 left-1">
                <MaturityRating rating={anime.rating} size={4} />
              </div>
            )}
            {episode.duration && (
              <div className="absolute bottom-1 right-1 bg-black/70 bg-opacity-75 px-1 py-0.5 text-sm text-white">
                {episode.duration}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-1">
            <small className="text-xs font-semibold text-[#A0A0A0] uppercase truncate block">
              {anime.name}
            </small>
          </div>
          <h3 className="text-sm font-medium text-white mb-2 line-clamp-2">
            {seasonNumber && <span className="font-semibold text-sm mr-1">T{seasonNumber}</span>}
            {episodeNumber && <span className="font-semibold text-sm mr-1">E{episodeNumber} - </span>}
            {episode.title.replace(/^E\d+\s*-\s*/, '')}
          </h3>

          <div className="flex items-center gap-4 text-xs text-[#A0A0A0]">
            <div className="relative group">
              {anime.audioType && (
                <span className="text-xs font-medium group-hover:opacity-0 transition-opacity duration-200">
                  <span className="text-[#a0a0a0] text-sm">{t(`audioTypes.${anime.audioType}`)}</span>
                </span>
              )}
              {hasVideoUrl && (
                <div className="absolute justify-center flex items-center gap-1 text-base font-medium text-[#ff640a] opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-labelledby="play-svg"
                    aria-hidden="false"
                    role="img"
                  >
                    <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
                  </svg>
                  <span>Reproduzir</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}; 