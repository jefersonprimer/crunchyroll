"use client";

import React, { useState, useEffect } from "react";
import { EpisodeCard } from "./EpisodeCard";
import styles from "./EpisodesSection.module.css";
import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";

interface EpisodesSectionProps {
  episodes: Episode[];
  anime: Anime;
}

export const EpisodesSection = ({ episodes, anime }: EpisodesSectionProps) => {
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([]);
  const [sortOrder, setSortOrder] = useState<"oldest" | "newest">("newest");
  const [showSortModal, setShowSortModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  // Efeito para filtrar e ordenar os episódios
  useEffect(() => {
    if (episodes && episodes.length > 0) {
      let filtered = episodes.filter(
        (episode) => episode.season === selectedSeason
      );

      // Ordenar episódios
      filtered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.releaseDate).getTime();
        const dateB = new Date(b.releaseDate).getTime();
        return sortOrder === "oldest" ? dateA - dateB : dateB - dateA;
      });

      setFilteredEpisodes(filtered);
    } else {
      setFilteredEpisodes([]);
    }
  }, [episodes, selectedSeason, sortOrder]);

  const getUniqueSeasons = () => {
    if (!episodes || episodes.length === 0) return [1];
    const seasons = [...new Set(episodes.map((episode) => episode.season))];
    return seasons.sort((a, b) => a - b);
  };

  const hasMultipleSeasons = getUniqueSeasons().length > 1;

  const getSeasonName = (seasonNumber: number) => {
    if (anime.seasonNames && anime.seasonNames[seasonNumber]) {
      return anime.seasonNames[seasonNumber];
    }
    return `${anime.name} - Temporada ${seasonNumber}`;
  };

  const handleSortSelection = (order: "oldest" | "newest") => {
    setSortOrder(order);
    setShowSortModal(false);
  };

  const markAllAsWatched = () => {
    // Aqui você implementaria a lógica para marcar todos os episódios como assistidos
    // Pode ser uma chamada API ou atualização de estado local
    console.log(
      `Marcar todos os episódios da temporada ${selectedSeason} como assistidos`
    );
    setShowOptionsModal(false);
  };

  return (
    <div className={styles.episodesContainer}>
      {/* Controles acima dos episódios */}
      <div className={styles.topControls}>
        {/* Título da temporada com seletor de temporada */}
        <div className={styles.seasonTitle}>
          {hasMultipleSeasons && (
            <div className={styles.seasonSelector}>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(parseInt(e.target.value))}
                className={styles.seasonDropdown}
              >
                {getUniqueSeasons().map((season) => (
                  <option key={season} value={season}>
                    S{season}:{" "}
                    {anime.seasonNames?.[season] || `Temporada ${season}`}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Botões */}
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
                {sortOrder === "oldest" ? "Oldest" : "Newest"}
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
                <title>More actions</title>
                <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-2 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm2 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
              </svg>
              <span className={styles.btnOptions}>Options</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtítulo com o nome da temporada selecionada */}
      {hasMultipleSeasons && (
        <div className={styles.seasonSubtitle}>
          {/* <h5>{getSeasonName(selectedSeason)}</h5> */}
        </div>
      )}

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
                Newest
              </button>
              <button
                className={`${styles.sortOption} ${
                  sortOrder === "oldest" ? styles.active : ""
                }`}
                onClick={() => handleSortSelection("oldest")}
              >
                Oldest
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
              <button
                className={styles.optionButton}
                onClick={markAllAsWatched}
              >
                Marcar a temporada como assistida
              </button>
            </div>
          
          </div>
        </div>
      )}
    </div>
  );
};
