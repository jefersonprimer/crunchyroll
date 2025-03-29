"use client";

import React from "react";
import Link from "next/link";
import styles from "./EpisodeCard.module.css";
import MaturityRating from "@/app/components/elements/MaturityRating";
import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";

interface EpisodeCardProps {
  episode: Episode;
  anime: Anime;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, anime }) => {
  const formatReleaseDate = (dateString: string) => {
    if (!dateString) return "";

    try {
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <div className={styles.cardContainer}>
      <Link href={`/watch/${episode.id}/${episode.slug}`}>
        <div className={styles.card}>
          {/* Container da Imagem */}
          <div className={styles.imageWrapper}>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${
                  episode.image || "https://placewaifu.com/image/1200/364"
                })`,
              }}
            >
              {/* Play Button */}
              <div className={styles.playButton}>
                <svg viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Rating e Duração */}
              <div className={styles.rating}>
                <MaturityRating rating={anime.rating} />
              </div>
              <div className={styles.duration}>{episode.duration}</div>
            </div>
          </div>

          {/* Overlay */}
          <div className={styles.overlay}>
            <h3>{anime.name}</h3>
            <p className={styles.slug}>{episode.title}</p>
            <div className={styles.ratingAndDate}>
              <MaturityRating rating={anime.rating} />
              <span className={styles.releaseDate}>
                {formatReleaseDate(episode.releaseDate)}
              </span>
            </div>
            <p className={styles.synopsis}>
              {episode.synopsis || "Sinopse não disponível."}
            </p>
            <Link
              href={`/watch/${episode.id}/${episode.slug}`}
              className={styles.watchButton}
            >
              <div className={styles.playableCardHoverFooter}>
                <div className={styles.playableCardHoverPlay}>
                  <svg
                    className={styles.playableCardHoverPlayIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    role="img"
                    fill="#F58220"
                  >
                    <title>Play</title>
                    <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006"></path>
                  </svg>
                  <span className={styles.callToAction}>PLAY</span>
                </div>

                <div
                  className={styles.moreOptionsButton}
                  role="button"
                  tabIndex={0}
                >
                  <svg
                    className={styles.moreOptionsIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-hidden="true"
                    role="img"
                    fill="#A0A0A0"
                  >
                    <title>More actions</title>
                    <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-2 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm2 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Informações do Episódio */}
          <div className={styles.infoContainer}>
            <div className={styles.info}>
              <h4 className={styles.name}>{anime.name}</h4>
              <p className={styles.slug}>{episode.title}</p>
              <div className={styles.audioContainer}>
                <p className={styles.audio}>{anime.audioType || "Legendado"}</p>

                <div
                  className={styles.moreOptionsButton}
                  role="button"
                  tabIndex={0}
                >
                  <svg
                    className={styles.moreOptionsIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-hidden="true"
                    role="img"
                    fill="#A0A0A0"
                  >
                    <title>More actions</title>
                    <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-2 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm2 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
