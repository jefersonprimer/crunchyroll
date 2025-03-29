"use client";

import React from "react";
import { EpisodeCard } from "./EpisodeCard";
import styles from "./EpisodesSection.module.css";
import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode"; // Importando o tipo Episode definido

interface EpisodesSectionProps {
  episodes: Episode[]; // Usando o tipo Episode importado
  anime: Anime; // Anime é obrigatório agora
}

export const EpisodesSection = ({ episodes, anime }: EpisodesSectionProps) => {
  return (
    <div className={styles.episodesContainer}>
      {/* Controles acima dos episódios */}
      <div className={styles.topControls}>
        {/* Título da temporada */}
        <div className={styles.seasonTitle}>
          <h4>{anime.name}</h4> {/* Usando anime.name diretamente */}
        </div>

        {/* Botões */}
        <div className={styles.controlsRight}>
          <div className={styles.dropdown} data-t="episode-sort-select">
            <button
              className={styles.dropdownTrigger}
              role="button"
              tabIndex={0}
            >
              <svg
                className={styles.dropdownIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="sort-svg"
                aria-hidden="true"
                role="img"
                fill="white"
              >
                <title>Sort</title>
                <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z"></path>
              </svg>
              <span>Oldest</span>
            </button>
          </div>

          <div className={styles.dropdown} data-t="episode-sort-select">
            <button
              className={styles.dropdownTrigger}
              role="button"
              tabIndex={0}
            >
              <svg
                className={styles.dropdownIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 24"
                data-t="more-svg"
                aria-hidden="true"
                role="img"
                fill="white"
              >
                <title>More actions</title>
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
              <EpisodeCard
                key={episode.id}
                episode={episode} // Passando o episódio completo
                anime={anime} // Passando o anime completo
              />
            ))
          ) : (
            <p>Nenhum episódio encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};
