"use client";

import { useTranslations } from 'next-intl';
import { useRouter, useParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import styles from "./EpisodeCard.module.css";
import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";
import MaturityRating from "@/app/components/utils/elements/SmallMaturityRating";

interface EpisodeCardProps {
  episode: Episode;
  anime: Anime;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, anime }) => {
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
    <Link
      href={hasVideoUrl ? `/${locale}/watch/${episode.publicCode}/${episode.slug}` : "#"}
      className={`${styles.episodeCard} ${!hasVideoUrl ? styles.disabled : ""}`} title={episode.title}
      onClick={(e) => {
        if (!hasVideoUrl) {
          e.preventDefault();
        }
      }}
    >
      <div className={styles.episodeImageContainer}>
        <img
          src={episode.image || "/placeholder-episode.jpg"}
          alt={episode.title}
          className={styles.episodeImage}
        />
        {rating && (
          <div className={styles.ratingBadge}>
            <MaturityRating rating={rating} />
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
      </div>

      <div className={styles.episodeInfo}>
        <h3 className={styles.name}>{anime.name.toUpperCase()}</h3>
        <p className={styles.episodeTitle}>
          {seasonNumber && <span className={styles.episodeNumber}>T{seasonNumber}</span>}
          {episodeNumber && <span className={styles.episodeNumber}>E{episodeNumber} - </span>}
          {episode.title.replace(/^E\d+\s*-\s*/, "")}
        </p>
        {anime.audioType && (
          <span className={styles.audioType}>{t(`audioTypes.${anime.audioType}`)}</span>
        )}
      </div>

      <div className={styles.cardInfo}>
        <div className={styles.cardInfoContent}>
          <h3>{anime.name.toUpperCase()}</h3>
          <p className={styles.episodeTitle}>
            {seasonNumber && <span className={styles.episodeNumber}>T{seasonNumber}</span>}
            {episodeNumber && <span className={styles.episodeNumber}>E - {episodeNumber}</span>}
            {episode.title.replace(/^E\d+\s*-\s*/, "")}
          </p>
          {episode.releaseDate && (
            <div className={styles.releaseDateContainer}>
               {rating !== undefined && <MaturityRating rating={rating} />}
              <svg  className={styles.calendarIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="calendar-svg" aria-labelledby="calendar-svg" aria-hidden="true" role="img"><path d="M4 20h16v-8H4v8zM6 6v1a1 1 0 0 0 2 0V6h8v1a1 1 0 1 0 2 0V6h2v4H4V6h2zm15-2h-3V3a1 1 0 1 0-2 0v1H8V3a1 1 0 0 0-2 0v1H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" fillRule="evenodd"></path></svg>
              <span className={styles.releaseDate}>
                {formatReleaseDate(episode.releaseDate)}
              </span>
            </div>
          )}
          <p className={styles.synopsis}>
            {episode.synopsis || anime.synopsis || "Sinopse não disponível."}
          </p>
        </div>

        {hasVideoUrl && (
          <div className={styles.cardInfoFooter}>
            <button className={styles.playButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="play-svg"
                aria-labelledby="play-svg"
                aria-hidden="true"
                role="img"
              >
                <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
              </svg>
              <span>REPRODUZIR T{seasonNumber} E{episodeNumber}</span>
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};
