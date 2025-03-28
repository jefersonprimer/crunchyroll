"use client";

import React from "react";
import Link from "next/link";
import styles from "./EpisodesSection.module.css";

interface Episode {
  id: string;
  title: string;
  image: string;
  slug: string;
  releaseDate: string;
}

interface EpisodesSectionProps {
  episodes: Episode[];
  animeName: string;
}

export const EpisodesSection = ({ episodes, animeName }: EpisodesSectionProps) => {
  return (
    <div className={styles.episodesContainer}>
      {/* Controles acima dos episódios */}
      <div className={styles.topControls}>
        {/* Título da temporada (ESQUERDA) */}
        <div className={styles.seasonTitle}>
          <h4>{animeName}</h4>
        </div>

        {/* Botões (DIREITA) */}
        <div className={styles.controlsRight}>
          {/* Botão "Oldest" (CANTO DIREITO) */}
          <div className={styles.dropdown} data-t="episode-sort-select">
            <button
              className={styles.dropdownTrigger}
              role="button"
              tabIndex="0"
            >
              <svg
                className={styles.dropdownIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="sort-svg"
                aria-labelledby="sort-svg"
                aria-hidden="true"
                role="img"
                fill="white"
              >
                <title id="sort-svg">Sort</title>
                <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z"></path>
              </svg>
              <span>Oldest</span>
            </button>
          </div>

          {/* Botão "Options" (CANTO DIREITO) */}
          <div className={styles.dropdown} data-t="episode-sort-select">
            <button
              className={styles.dropdownTrigger}
              role="button"
              tabIndex="0"
            >
              <svg
                className={styles.dropdownIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 24"
                data-t="more-svg"
                aria-labelledby="more-svg"
                aria-hidden="true"
                role="img"
                fill="white"
              >
                <title id="more-svg">More actions</title>
                <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-2 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm2 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
              </svg>
              <span>Options</span>
            </button>
          </div>
        </div>
      </div>

      {/* Seção de episódios */}
      <div className={styles.episodesSection}>
        <div className={styles.episodesGrid}>
          {episodes.length > 0 ? (
            episodes.map((episode) => (
              <div key={episode.id} className={styles.episodeCard}>
                <img
                  src={episode.image}
                  alt={`Episódio ${episode.id}`}
                  className={styles.episodeImage}
                />
                <div className={styles.episodeInfo}>
                  <Link href={`/watch/${episode.id}/${episode.slug}`}>
                    {episode.title}
                  </Link>
                  <span>{episode.releaseDate}</span>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum episódio encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};
