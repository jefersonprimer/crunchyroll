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
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);

  const hasMultipleSeasons = anime.seasons.length > 1;

  // Efeito para filtrar e ordenar os episódios
  useEffect(() => {
    if (anime.episodes && anime.episodes.length > 0) {
      let filtered = anime.episodes;

      // Se tiver apenas uma temporada, mostra todos os episódios
      if (!hasMultipleSeasons) {
        filtered = anime.episodes;
      } else {
        // Se tiver múltiplas temporadas, filtra pelo seasonId
        filtered = anime.episodes.filter(episode => 
          episode.seasonId === selectedSeason
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
    return `${season.seasonName || `Temporada ${season.seasonNumber}`}`;
  };

  const getTotalEpisodesForSeason = (seasonId: string) => {
    // Se tiver apenas uma temporada, retorna o total de episódios do anime
    if (!hasMultipleSeasons) {
      return anime.episodes.length;
    }
    // Se tiver múltiplas temporadas, conta os episódios da temporada específica
    return anime.episodes.filter(episode => episode.seasonId === seasonId).length;
  };

  const handleSortSelection = (order: "oldest" | "newest") => {
    setSortOrder(order);
    setShowSortModal(false);
  };

  return (
    <div className={styles.episodesSection}>
      <div className={styles.controls}>
        <div className={styles.controlsLeft}>
          {hasMultipleSeasons ? (
            <div className={styles.seasonSelector}>
              <button
                className={styles.seasonDropdownTrigger}
                onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
              >
                <svg
                  className={styles.dropdownIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                   fill="currentColor"
                  >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
                  {getSeasonName(anime.seasons.find(season => season.id === selectedSeason))}
              </button>
              {showSeasonDropdown && (
                <div className={styles.seasonDropdownContent}>
                  {anime.seasons.map((season) => {
                    const seasonDisplayName = season.seasonName || `Temporada ${season.seasonNumber}`;
                    const totalEpisodes = getTotalEpisodesForSeason(season.id);
                    return (
                      <button
                        key={season.id}
                        className={`${styles.seasonOption} ${
                          selectedSeason === season.id ? styles.active : ""
                        }`}
                        onClick={() => {
                          setSelectedSeason(season.id);
                          setShowSeasonDropdown(false);
                        }}
                      >
                        {seasonDisplayName}
                        <span className={styles.episodeCount}>{totalEpisodes} Episódios</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.singleSeasonName}>
              {anime.name}
            </div>
          )}
        </div>

        <div className={styles.controlsRight}>
          <div className={styles.dropdown} data-t="episode-sort-select">
            <button
              className={styles.dropdownTrigger}
              role="button"
              tabIndex={0}
              onClick={() => setShowSortModal(!showSortModal)}
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
                {sortOrder === "oldest" ? "MAIS ANTIGOS" : "MAIS RECENTES"}
              </span>
            </button>
            {showSortModal && (
              <div className={styles.dropdownContent}>
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
            )}
          </div>

          <div className={styles.dropdown} data-t="episode-sort-select">
            <button
              className={styles.dropdownTrigger}
              role="button"
              tabIndex={0}
              onClick={() => setShowOptionsModal(!showOptionsModal)}
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
              <span className={styles.btnOptions}>OPÇÕES</span>
            </button>
            {showOptionsModal && (
              <div className={styles.dropdownContent}>
                <button className={styles.optionButton}>
                  Marcar todos como assistidos
                </button>
                <button className={styles.optionButton}>
                  Marcar todos como não assistidos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtítulo da temporada - apenas para animes com uma única temporada */}
      

      {/* Seção de episódios */}
      <div className={styles.episodesContainer}>
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
    </div>
  );
};
