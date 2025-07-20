"use client";

import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { EpisodeCard } from "./EpisodeCard";
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
  const t = useTranslations('EpisodeSection');

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
    return `${season.seasonName || `${t('season.label')} ${season.seasonNumber}`}`;
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
    <div className="py-6 w-[1351px] mx-auto">
      <div className="flex justify-between items-center mb-3.5 w-[1254px] h-[46px]">
        <div className="flex gap-4 items-center">
          {hasMultipleSeasons ? (
            <div className="relative mr-4">
              <button
                className={`flex items-center gap-2 px-4 py-2 bg-transparent rounded text-white cursor-pointer text-base transition-all duration-200 font-semibold hover:text-[#2ABDBB]`}
                onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
                style={{ color: showSeasonDropdown ? '#2ABDBB' : undefined }}
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
                <span>
                  {getSeasonName(anime.seasons.find(season => season.id === selectedSeason))}
                </span>
              </button>
              {showSeasonDropdown && (
                <div className="absolute top-full left-5 mt-1 py-2.5 bg-[#23252B] border border-[#2a2a2a] w-[474.08px] h-28 z-[1000] flex flex-col justify-center items-center">
                  {anime.seasons.map((season) => {
                    const seasonDisplayName = season.seasonName || `Temporada ${season.seasonNumber}`;
                    const totalEpisodes = getTotalEpisodesForSeason(season.id);
                    return (
                      <button
                        key={season.id}
                        className={`flex items-center justify-between w-full px-4 py-3 bg-transparent border-none text-[#A0A0A0] cursor-pointer text-sm text-left transition-all duration-200 hover:bg-[#121214] hover:text-white ${
                          selectedSeason === season.id ? "text-[#F8F8F8]" : ""
                        }`}
                        onClick={() => {
                          setSelectedSeason(season.id);
                          setShowSeasonDropdown(false);
                        }}
                      >
                        {seasonDisplayName}
                        <span className="text-xs text-[#A0A0A0] ml-2">
                          {t('season.episodeCount', { count: totalEpisodes })}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-white py-2 text-sm">
              {anime.name}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <div className="relative inline-block" data-t="episode-sort-select">
            <button
              className="flex items-center gap-2 px-4 py-2 border-none text-[#a0a0a0] cursor-pointer text-sm transition-colors duration-200 hover:bg-[#3a3a3a] hover:text-white"
              role="button"
              tabIndex={0}
              onClick={() => setShowSortModal(!showSortModal)}
            >
              <svg
                className="w-5 h-5"
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
              <span className="text-sm text-[#A0A0A0] font-extrabold hover:text-white">
                {sortOrder === "oldest" ? t('sort.oldest') : t('sort.newest')}
              </span>
            </button>
            {showSortModal && (
              <div className="absolute top-full right-0 bg-[#1A1A1A] min-w-[200px] shadow-lg z-[1000] mt-1">
                <button
                  className={`block w-full px-4 py-3 text-left bg-none border-none text-white cursor-pointer text-sm transition-colors duration-200 hover:bg-[#2A2A2A] ${
                    sortOrder === "newest" ? "bg-[#2A2A2A] text-white" : ""
                  }`}
                  onClick={() => handleSortSelection("newest")}
                >
                  {t('sort.newestLabel')}
                </button>
                <button
                  className={`block w-full px-4 py-3 text-left bg-none border-none text-white cursor-pointer text-sm transition-colors duration-200 hover:bg-[#2A2A2A] ${
                    sortOrder === "oldest" ? "bg-[#2A2A2A] text-white" : ""
                  }`}
                  onClick={() => handleSortSelection("oldest")}
                >
                  {t('sort.oldestLabel')}
                </button>
              </div>
            )}
          </div>

          <div className="relative inline-block" data-t="episode-sort-select">
            <button
              className="flex items-center gap-2 px-4 py-2 border-none text-[#a0a0a0] cursor-pointer text-sm transition-colors duration-200 hover:bg-[#3a3a3a] hover:text-white"
              role="button"
              tabIndex={0}
              onClick={() => setShowOptionsModal(!showOptionsModal)}
            >
              <svg
                className="w-5 h-5"
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
              <span className="text-sm text-[#A0A0A0] font-extrabold hover:text-white">
                {t('options.label')}
              </span>
            </button>
            {showOptionsModal && (
              <div className="absolute top-full right-0 bg-[#1A1A1A] min-w-[200px] shadow-lg z-[1000] mt-1">
                <button className="block w-full px-4 py-3 text-left bg-none border-none text-white cursor-pointer text-sm transition-colors duration-200 hover:bg-[#2A2A2A]">
                  {t('options.markAllWatched')}
                </button>
                <button className="block w-full px-4 py-3 text-left bg-none border-none text-white cursor-pointer text-sm transition-colors duration-200 hover:bg-[#2A2A2A]">
                  {t('options.markAllUnwatched')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="flex w-[1313px] gap-6 mx-auto items-center justify-self-center">
          {filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} anime={anime} />
            ))
          ) : (
            <p>{t('episodes.noEpisodes')}</p>
          )}
        </div>
      </div>
    </div>
  );
};
