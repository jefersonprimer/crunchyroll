"use client";

import React from "react";
import Link from "next/link";
import styles from "./FavoritesCard.module.css";
import MaturityRating from "@/app/components/elements/MaturityRating";
import { Anime, AudioType } from "@/types/anime";
import { Episode } from "@/types/episode";

interface FavoritesCardProps {
  episode: Episode;
  anime: Anime;
}

export const FavoritesCard: React.FC<FavoritesCardProps> = ({
  episode,
  anime,
}) => {
  const formatReleaseDate = (dateString: string | undefined): string => {
    if (!dateString) return "Data não disponível";

    try {
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  const getAudioTypeDisplay = (audioType: AudioType | undefined): string => {
    if (!audioType) return "Legendado";
    if (audioType === "Dub | Leg") return "Dublado e Legendado";
    return audioType;
  };

  const getEpisodeTitle = (): string => {
    if (episode.title) return episode.title;
    if (episode.isLancamento) return "Lançamento";
    return "Episódio 1";
  };

  const getImageUrl = (): string => {
    return (
      episode.image ||
      anime.thumbnailImage ||
      anime.image ||
      "https://placewaifu.com/image/1200/364"
    );
  };

  return (
    <div className={styles.cardContainer}>
      <Link
        href={`/watch/${episode.id}/${episode.slug}`}
        passHref
        legacyBehavior
      >
        <a>
          <div className={styles.card}>
            {/* Container da Imagem */}
            <div className={styles.imageWrapper}>
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(${getImageUrl()})`,
                }}
                aria-label={`Capa de ${anime.name}`}
              >
                {/* Play Button */}
                <div className={styles.playButton} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Rating e Duração */}
                <div className={styles.rating}>
                  <MaturityRating rating={anime.rating} />
                </div>
                <div className={styles.duration}>
                  {episode.duration || "24 min"}
                </div>
              </div>
            </div>

            {/* Overlay no hover */}
            <div className={styles.overlay}>
              <h3>{anime.name}</h3>
              <p className={styles.slug}>{getEpisodeTitle()}</p>
              <div className={styles.ratingAndDate}>
                <MaturityRating rating={anime.rating} />
                <span className={styles.releaseDate}>
                  {formatReleaseDate(episode.releaseDate)}
                </span>
              </div>
              <p className={styles.synopsis}>
                {episode.synopsis ||
                  anime.synopsis ||
                  "Sinopse não disponível."}
              </p>

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
                  <span className={styles.callToAction}>ASSISTIR</span>
                </div>
              </div>
            </div>

            {/* Informações do Episódio */}
            <div className={styles.infoContainer}>
              <div className={styles.info}>
                <h4 className={styles.name}>{anime.name}</h4>
                <p className={styles.slug}>{getEpisodeTitle()}</p>
                <div className={styles.audioContainer}>
                  <p className={styles.audio}>
                    {getAudioTypeDisplay(anime.audioType)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
