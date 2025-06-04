"use client";

import React, { useState, useEffect } from "react";
import { EpisodeCard } from "./EpisodeCard";
import styles from "./EpisodesSection.module.css";
import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";

interface EpisodesSectionProps {
  anime: Anime;
}

export const EpisodesSection = ({ anime }: EpisodesSectionProps) => {
  console.log('Anime seasons:', anime.seasons); // Debug log

  const [selectedSeason, setSelectedSeason] = useState<string>(
    anime.seasons[0]?.id || ""
  );
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([]);
  const [sortOrder, setSortOrder] = useState<"oldest" | "newest">("newest");
  const [showSortModal, setShowSortModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const hasMultipleSeasons = anime.seasons.length > 1;

  // Efeito para filtrar e ordenar os episódios
  useEffect(() => {
    if (anime.episodes && anime.episodes.length > 0) {
      let filtered = anime.episodes;

      // Se tiver apenas uma temporada, mostra todos os episódios
      if (!hasMultipleSeasons) {
        filtered = anime.episodes;
      } else {
        // Se tiver múltiplas temporadas, filtra pelo season_id
        filtered = anime.episodes.filter(episode => 
          episode.season_id === selectedSeason
        );
      }

      // Ordenar episódios
      filtered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.releaseDate || "").getTime();
        const dateB = new Date(b.releaseDate || "").getTime();
        return sortOrder === "oldest" ? dateA - dateB : dateB - dateA;
      });

      setFilteredEpisodes(filtered);
    } else {
      setFilteredEpisodes([]);
    }
  }, [anime.episodes, sortOrder, selectedSeason, hasMultipleSeasons]);

  const getSeasonName = (season: any) => {
    return `${anime.name} - ${season.seasonName || `Temporada ${season.seasonNumber}`}`;
  };

  const getTotalEpisodesForSeason = (seasonId: string) => {
    // Se tiver apenas uma temporada, retorna o total de episódios do anime
    if (!hasMultipleSeasons) {
      return anime.episodes.length;
    }
    // Se tiver múltiplas temporadas, conta os episódios da temporada específica
    return anime.episodes.filter(episode => episode.season_id === seasonId).length;
  };

  const handleSortSelection = (order: "oldest" | "newest") => {
    setSortOrder(order);
    setShowSortModal(false);
  };

  return (
    <div className={styles.episodesSection}>
      <div className={styles.controls}>
        <div className={styles.controlsLeft}>
          {hasMultipleSeasons && (
            <div className={styles.seasonSelector}>
              {anime.seasons.map((season) => {
                const seasonDisplayName = season.seasonName || `Temporada ${season.seasonNumber}`;
                const totalEpisodes = getTotalEpisodesForSeason(season.id);
                return (
                  <button
                    key={season.id}
                    className={`${styles.seasonButton} ${
                      selectedSeason === season.id ? styles.active : ""
                    }`}
                    onClick={() => setSelectedSeason(season.id)}
                  >
                    {seasonDisplayName}
                    <span className={styles.episodeCount}>({totalEpisodes} eps)</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className={styles.controlsRight}>
          <div className={styles.dropdown} data-t="episode-sort-select">
            <button
              className={styles.dropdownTrigger}
              role="button"
              tabIndex={0}
              onClick={() => setShowSortModal(true)}
            >
              <svg
                className={styles.dropdownIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="sort-svg"
                aria-hidden="true"
                role="img"
                fill="#A0A0A0"
              >
                <title>Sort</title>
                <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z"></path>
              </svg>
              <span className={styles.btnOldest}>
                {sortOrder === "oldest" ? "Mais antigos" : "Mais recentes"}
              </span>
            </button>
          </div>

          <div className={styles.dropdown} data-t="episode-sort-select">
            <button
              className={styles.dropdownTrigger}
              role="button"
              tabIndex={0}
              onClick={() => setShowOptionsModal(true)}
            >
              <svg
                className={styles.dropdownIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 24"
                data-t="more-svg"
                aria-hidden="true"
                role="img"
                fill="#A0A0A0"
              >
                <title>Mais ações</title>
                <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-2 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm2 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
              </svg>
              <span className={styles.btnOptions}>Opções</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtítulo da temporada */}
      <div className={styles.seasonSubtitle}>
        <h5>
          {hasMultipleSeasons
            ? getSeasonName(anime.seasons.find(season => season.id === selectedSeason))
            : anime.name}
        </h5>
      </div>

      {/* Seção de episódios */}
      <div className={styles.episodesSection}>
        <div className={styles.episodesGrid}>
          {filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} anime={anime} />
            ))
          ) : (
            <p>Nenhum episódio encontrado para esta temporada.</p>
          )}
        </div>
      </div>

      {/* Modal de ordenação */}
      {showSortModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowSortModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalOptions}>
              <button
                className={`${styles.sortOption} ${
                  sortOrder === "newest" ? styles.active : ""
                }`}
                onClick={() => handleSortSelection("newest")}
              >
                Mais recentes
              </button>
              <button
                className={`${styles.sortOption} ${
                  sortOrder === "oldest" ? styles.active : ""
                }`}
                onClick={() => handleSortSelection("oldest")}
              >
                Mais antigos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de opções */}
      {showOptionsModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowOptionsModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalOptions}>
              <button className={styles.optionButton}>
                Marcar todos como assistidos
              </button>
              <button className={styles.optionButton}>
                Marcar todos como não assistidos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
