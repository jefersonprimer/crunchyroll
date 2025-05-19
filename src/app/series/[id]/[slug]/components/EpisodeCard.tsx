"use client";

import React from "react";
import Link from "next/link";
import styles from "./EpisodeCard.module.css";
import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";
import MaturityRating from "@/app/components/elements/MaturityRating";

interface EpisodeCardProps {
  episode: Episode;
  anime: Anime;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, anime }) => {
  const formatReleaseDate = (dateString?: string) => {
    if (!dateString) return "";

    try {
      const [year, month, day] = dateString.split("-");
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

  const episodeNumber = getEpisodeNumber(episode.title);
  const hasVideoUrl = episode.videoUrl || (episode.versions && episode.versions.length > 0);

  return (
    <Link
      href={hasVideoUrl ? `/watch/${episode.id}/${episode.slug}` : "#"}
      className={`${styles.episodeCard} ${!hasVideoUrl ? styles.disabled : ""}`}
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
        {anime.rating && (
          <div className={styles.ratingBadge}>
            <MaturityRating rating={anime.rating} />
          </div>
        )}
        {episode.duration && (
          <div className={styles.durationBadge}>{episode.duration}</div>
        )}
        {!hasVideoUrl && (
          <div className={styles.comingSoonBadge}>Em breve</div>
        )}
      </div>
      <div className={styles.episodeInfo}>
        <h3 className={styles.episodeTitle}>
          {episodeNumber && <span className={styles.episodeNumber}>Episódio {episodeNumber}</span>}
          {episode.title.replace(/^E\d+\s*-\s*/, "")}
        </h3>
        <div className={styles.episodeMeta}>
          {anime.audioType && (
            <span className={styles.audioType}>{anime.audioType}</span>
          )}
          {episode.season && (
            <span className={styles.seasonBadge}>
              Temporada {episode.season}
            </span>
          )}
          {episode.releaseDate && (
            <span className={styles.releaseDate}>
              {formatReleaseDate(episode.releaseDate)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
