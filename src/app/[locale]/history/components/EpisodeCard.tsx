"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";
import MaturityRating from "@/app/components/elements/MaturityRating";
import { useHistory } from '@/app/[locale]/contexts/HistoryContext';

interface EpisodeCardProps {
  episode: Episode;
  anime: Anime;
  watchedAt?: string;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, anime, watchedAt }) => {
  const { removeFromHistory } = useHistory();
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

  return (
    <Link
      href={hasVideoUrl ? `/watch/${episode.publicCode}/${episode.slug}` : "#"}
      className={`relative w-64 h-auto min-h-[264px] overflow-hidden transition-all duration-300 ease-in-out cursor-pointer no-underline text-inherit box-border mx-auto flex justify-center items-center ${
        !hasVideoUrl ? "pointer-events-none" : "hover:bg-[#23252B]"
      }`}
      title={episode.title}
      onClick={(e) => {
        if (!hasVideoUrl) {
          e.preventDefault();
        }
      }}
    >
      <div className="relative w-[240px] h-auto min-h-[249px] overflow-hidden transition-all duration-300 ease-in-out cursor-pointer no-underline text-inherit block box-border">
        <div className="relative w-full h-[135px] mx-auto bg-[#2a2a2a] box-border">
          {(!showImage || !imageLoaded) && (
            <div className="absolute top-0 left-0 w-full h-full bg-[#141519] animate-pulse" />
          )}
          <img
            src={episode.image || "/placeholder-episode.jpg"}
            alt={episode.title}
            width={240}
            height={135}
            className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-transform duration-300 ease-in-out ${
              showImage && imageLoaded ? "block" : "hidden"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {showImage && imageLoaded && (
            <>
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68px] h-[68px] bg-black/40 rounded-full flex items-center justify-center z-10 transition-opacity duration-300 ease-in-out">
                  <svg
                    className="w-11 h-11 fill-white"
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
            </>
          )}
        </div>
        <div className="w-full h-[114px] mx-auto flex flex-col gap-1 relative z-10">
          {showText ? (
            <>
              <h3 className="text-[#A0A0A0] font-bold text-xs py-1 uppercase">
                {anime.name}
              </h3>
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
                  <button
                    onClick={handleDelete}
                    className="bg-none border-none cursor-pointer flex items-center justify-center p-1 ml-2"
                    aria-label="Remover do histórico"
                  >
                    <svg
                      className="w-6 h-6 text-[#A0A0A0]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      role="img"
                      fill="#A0A0A0"
                    >
                      <title>Remover</title>
                      <path d="M13 2h-2a1 1 0 0 0-1 1v1H4a1 1 0 0 0 0 2h1v15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6h1a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1m-1 2v2h5v14H7V6h5V4zm-2 5a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1z" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="w-4/5 h-5 bg-[#141519] animate-pulse mt-2.5 mb-2" />
              <div className="w-1/2 h-4 bg-[#141519] animate-pulse mt-2" />
            </>
          )}
        </div>
      </div>
    </Link>
  );
};