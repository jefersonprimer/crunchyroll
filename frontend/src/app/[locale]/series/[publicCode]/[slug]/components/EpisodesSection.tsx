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
  // Controle local dos dropdowns
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const toggleDropdown = (dropdownId: string) => {
    setActiveDropdown(prev => prev === dropdownId ? null : dropdownId);
  };
  const isDropdownOpen = (dropdownId: string) => activeDropdown === dropdownId;
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
    setActiveDropdown(null);
  };

  return (
    <div className="flex flex-col items-center py-6 w-full lg:w-[1351px] mx-auto">
      <div className="w-full flex justify-center mb-3.5">
        <div className="flex justify-between items-center  w-full lg:w-[1223px] h-[46px]">
          <div className="flex gap-4 items-center">
            {hasMultipleSeasons ? (
              <div className="relative">
                <button
                  className={`flex items-center gap-2 px-2 py-2 bg-transparent text-white cursor-pointer transition-all duration-200 font-semibold hover:text-[#2ABDBB] ${isDropdownOpen('season') ? 'bg-[#23252B] text-[#2ABDBB]' : ''}`}
                  onClick={() => toggleDropdown('season')}
                  style={{ color: isDropdownOpen('season') ? '#2ABDBB' : undefined }}
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                  <span className="text-base">
                    {getSeasonName(anime.seasons.find(season => season.id === selectedSeason))}
                  </span>
                </button>
                {isDropdownOpen('season') && (
                  <div className="absolute top-full mt-1 py-2.5 bg-[#23252B] text-[#A0A0A0] text-base border border-[#2a2a2a] w-[474.08px] h-28 z-[1000] flex flex-col justify-center items-center">
                    {anime.seasons.map((season) => {
                      const seasonDisplayName = season.seasonName || `Temporada ${season.seasonNumber}`;
                      const totalEpisodes = getTotalEpisodesForSeason(season.id);
                      return (
                        <button
                          key={season.id}
                          className={`flex items-center justify-between w-full px-4 py-3 bg-transparent border-none  cursor-pointer  text-base text-left transition-all duration-200 hover:bg-[#121214] hover:text-white ${selectedSeason === season.id ? "text-[#F8F8F8]" : ""}`}
                          onClick={() => {
                            setSelectedSeason(season.id);
                            setActiveDropdown(null);
                          }}
                        >
                          {seasonDisplayName}
                          <span className="text-xs ml-2">
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

          <div className="flex">
            <div className="relative inline-block" data-t="episode-sort-select">
              <button
                className={`flex items-center justify-between gap-2 px-2 py-3 border-none text-[#A0A0A0] cursor-pointer text-sm transition-colors duration-200 hover:bg-[#23252B] hover:text-white 
              ${isDropdownOpen('sort') ? "bg-[#23252B] text-white" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => toggleDropdown('sort')}
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="sort-svg"
                  aria-hidden="true"
                  role="img"
                  fill="currentColor"
                >
                  <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z"></path>
                </svg>
                <span className="text-sm font-extrabold uppercase">
                  {sortOrder === "oldest" ? t('sort.oldest') : t('sort.newest')}
                </span>
              </button>
              {isDropdownOpen('sort') && (
                <div className="absolute py-2 top-full right-0 bg-[#23252B] min-w-[200px] shadow-lg z-[1000]">
                  <button
                    className={`block w-full px-4 py-3 text-left bg-none border-none text-white cursor-pointer text-sm transition-colors duration-200 hover:bg-[#141519] ${sortOrder === "newest" ? "text-white" : ""}`}
                    onClick={() => { handleSortSelection("newest"); setActiveDropdown(null); }}
                  >
                    {t('sort.newestLabel')}
                  </button>
                  <button
                    className={`block w-full px-4 py-3 text-left bg-none border-none text-white cursor-pointer text-sm transition-colors duration-200 hover:bg-[#141519] ${sortOrder === "oldest" ? "text-white" : ""}`}
                    onClick={() => { handleSortSelection("oldest"); setActiveDropdown(null); }}
                  >
                    {t('sort.oldestLabel')}
                  </button>
                </div>
              )}
            </div>

            <div className="relative inline-block" data-t="episode-sort-select">
              <button
                className={`flex items-center justify-between gap-2 px-2 py-3 border-none text-[#A0A0A0] cursor-pointer transition-colors duration-200 hover:bg-[#23252B] hover:text-white 
              ${isDropdownOpen('options') ? "bg-[#23252B] text-white" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => toggleDropdown('options')}
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 12 24"
                  data-t="more-svg"
                  aria-hidden="true"
                  role="img"
                  fill="currentColor"
                >
                  <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-2 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm2 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                </svg>
                <span className="text-sm font-extrabold uppercase">
                  {t('options.label')}
                </span>
              </button>
              {isDropdownOpen('options') && (
                <div className="absolute top-full py-2 right-0 bg-[#23252B] min-w-[200px] shadow-lg z-[1000]">
                  <button className="block w-full px-4 py-3 text-left bg-none border-none text-white cursor-pointer text-sm transition-colors duration-200 hover:bg-[#141519]">
                    {t('options.markAllWatched')}
                  </button>
                  <button className="block w-full px-4 py-3 text-left bg-none border-none text-white cursor-pointer text-sm transition-colors duration-200 hover:bg-[#141519]">
                    {t('options.markAllUnwatched')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="flex w-[1223px] gap-6 items-center mx-auto">
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
