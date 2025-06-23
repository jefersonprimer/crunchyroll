"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./EpisodeCard.module.css";
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
      className={`${styles.wrapper} ${!hasVideoUrl ? styles.disabled : ""}`} title={episode.title}
      onClick={(e) => {
        if (!hasVideoUrl) {
          e.preventDefault();
        }
      }}
    >
      <div className={styles.episodeCard}>
        <div className={styles.episodeImageContainer}>
          {(!showImage || !imageLoaded) && <div className={`${styles.skeleton} ${styles.skeletonImage}`} />}
          <img
            src={episode.image || "/placeholder-episode.jpg"}
            alt={episode.title}
            className={styles.episodeImage}
            style={{ display: showImage && imageLoaded ? 'block' : 'none' }}
            onLoad={() => setImageLoaded(true)}
          />
          {showImage && imageLoaded && (
            <>
              {rating && (
                <div className={styles.ratingBadge}>
                  <MaturityRating rating={rating} size={4} />
                </div>
              )}
              {episode.duration && (
                <div className={styles.durationBadge}>{episode.duration}</div>
              )}
              {hasVideoUrl && (
                <div className={styles.playIconContainer}>
                  <svg
                    className={styles.playIcon}
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
                <div className={styles.comingSoonBadge}>Em breve</div>
              )}
            </>
          )}
        </div>
        <div className={styles.episodeInfo}>
          {showText ? (
            <>
              <h3 className={styles.name}>{anime.name}</h3>
              <p className={styles.episodeTitle}>
                {seasonNumber && <span className={styles.episodeNumber}>T{seasonNumber}</span>}
                {episodeNumber && <span className={styles.episodeNumber}>E{episodeNumber} - </span>}
                {episode.title.replace(/^E\d+\s*-\s*/, "")}
              </p>
        
              {watchedAt && (
                <div className={styles.watchDateContainer}>
                  <span className={styles.watchDate}>{formatWatchDate(watchedAt)}</span>
                  <button
                    onClick={handleDelete}
                    className={styles.deleteButton}
                    aria-label="Remover do histórico"
                  >
                    <svg
                      className={styles.trashIcon}
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
              <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
              <div className={`${styles.skeleton} ${styles.skeletonAudioType}`} style={{ marginTop: '8px' }} />
            </>
          )}
        </div>
      </div>
    </Link>
  );
};


