"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";
import MaturityRating from "@/app/components/elements/MaturityRating";
import { useHistory } from '@/app/[locale]/contexts/HistoryContext';
import RemoveButton from "@/app/components/buttons/RemoveButton";

interface EpisodeCardProps {
  episode: Episode;
  anime: Anime;
  watchedAt?: string;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, anime, watchedAt }) => {
  const { removeFromHistory } = useHistory();
  const [imageLoaded, setImageLoaded] = useState(false);



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

  const episodeNumber = getEpisodeNumber(episode.title);
  const hasVideoUrl = episode.videoUrl || (episode.versions && episode.versions.length > 0);
  const rating = parseRating(anime.rating);
  const seasonNumber = getSeasonNumber();

  const formatWatchDate = (dateString: string) => {
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

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromHistory(episode.id);
  };

  // Função sem argumento para RemoveButton
  const handleDeleteNoEvent = () => {
    removeFromHistory(episode.id);
  };

  return (
    <Link
      href={hasVideoUrl ? `/watch/${episode.publicCode}/${episode.slug}` : "#"}
      className={`relative lg:w-auto  w-[445px] lg:w-[254px md:max-w-[254px] h-auto overflow-hidden transition-all duration-300 ease-in-out cursor-pointer no-underline text-inherit box-border mx-auto flex justify-center items-center ${
        !hasVideoUrl ? "pointer-events-none" : "hover:bg-[#141519]"
      }`}
      onClick={(e) => {
        if (!hasVideoUrl) {
          e.preventDefault();
        }
      }}
    >
      <div className="relative p-2 w-[445px] lg:w-[254px] h-auto overflow-hidden transition-all duration-300 ease-in-out cursor-pointer no-underline text-inherit box-border flex justify-center items-center flex-row md:flex-col gap-3 md:gap-0">
        {/* Imagem */}
        <div className="relative flex-shrink-0 w-[151px] h-[85px] md:w-full md:h-[135px] mx-auto box-border">
          <img
            src={episode.image || "/placeholder-episode.jpg"}
            alt={episode.title}
            width={240}
            height={135}
            className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-transform duration-300 ease-in-out block`}
            onLoad={() => setImageLoaded(true)}
          />
          {rating && (
            <div className="absolute top-1 left-1 z-10">
              <MaturityRating rating={rating} size={4} />
            </div>
          )}
          {episode.duration && (
            <div className="absolute bottom-px right-0.5 bg-black/80 text-white px-2 py-1 text-xs z-10">
              {episode.duration}
            </div>
          )}
          {hasVideoUrl && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40px] lg:w-[68px] h-[40px] lg:h-[68px] bg-black/40 rounded-full flex items-center justify-center z-10 transition-opacity duration-300 ease-in-out">
              <svg
                className="w-8 h-8 lg:w-11 lg:h-11 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="play-filled-svg"
                aria-labelledby="play-filled-svg"
                aria-hidden="true"
                role="img"
              >
                <path d="m4 2 16 10L4 22z" />
              </svg>
            </div>
          )}
          {!hasVideoUrl && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ff640a] text-white px-4 py-2 rounded text-sm font-medium z-30">
              Em breve
            </div>
          )}
        </div>
        {/* Textos */}
        <div className="flex-1 w-full h-auto mx-auto flex flex-col gap-1 relative z-10 justify-center">
          <div className="">
            <small className="text-[#A0A0A0] font-bold text-[0.625rem] py-1 uppercase">{anime.name}</small>
          </div>
          <p className="m-0 text-sm font-medium text-white line-clamp-2">
            {seasonNumber && (
              <span className="text-white mr-1">T{seasonNumber}</span>
            )}
            {episodeNumber && (
              <span className="text-white mr-1">E{episodeNumber} - </span>
            )}
            {episode.title.replace(/^E\d+\s*-\s*/, "")}
          </p>

          {watchedAt && (
            <div className="w-full flex items-center justify-between mt-2 box-border">
              <span className="text-sm text-[#A0A0A0]">
                {formatWatchDate(watchedAt)}
              </span>
              <RemoveButton onClick={handleDeleteNoEvent}/>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};