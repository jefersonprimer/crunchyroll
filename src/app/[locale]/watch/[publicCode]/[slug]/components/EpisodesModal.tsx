import { useState } from "react";
import { Episode } from "../types/types";
import { Anime } from "@/types/anime";
import { extractEpisodeNumber } from "../utils/utils";
import { EpisodeCard } from "@/app/[locale]/series/[publicCode]/[slug]/components/EpisodeCard";

interface EpisodesModalProps {
  episodes: Episode[];
  currentEpisodePublicCode: string;
  anime: Anime;
  onClose: () => void;
}

const EpisodesModal: React.FC<EpisodesModalProps> = ({
  episodes,
  currentEpisodePublicCode,
  anime,
  onClose,
}) => {
  // Get all unique seasons from episodes
  const allSeasons = Array.from(
    new Set(episodes.map((episode) => episode.season))
  ).sort((a, b) => a - b);

  // State for selected season
  const [selectedSeason, setSelectedSeason] = useState<number | "all">(
    allSeasons.length === 1 ? allSeasons[0] : "all"
  );

  // Filter and sort episodes
  const filteredEpisodes = (
    selectedSeason === "all"
      ? episodes
      : episodes.filter((episode) => episode.season === selectedSeason)
  ).sort((a, b) => {
    if (a.season !== b.season) {
      return a.season - b.season;
    }
    return extractEpisodeNumber(a.title) - extractEpisodeNumber(b.title);
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-[1000]">
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000]">
      <div className="bg-[#23252B] w-[90%] max-w-[1000px] max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="m-0 text-2xl">
            {allSeasons.length === 1 ? `Todos os Episódios` : `Episódios`}
          </h2>
          <button
            onClick={onClose}
            className="bg-none border-none text-2xl cursor-pointer"
            aria-label="Fechar modal"
          >
            &times;
          </button>
        </div>
  
        {/* Season selector - only show if there are multiple seasons */}
        {allSeasons.length > 1 && (
          <div className="mb-6">
            <select
              value={selectedSeason}
              onChange={(e) =>
                setSelectedSeason(
                  e.target.value === "all" ? "all" : Number(e.target.value)
                )
              }
              className="w-full p-2 bg-gray-800 text-white rounded"
            >
              <option value="all">Todas as Temporadas</option>
              {allSeasons.map((season) => (
                <option key={season} value={season}>
                  Temporada {season}
                </option>
              ))}
            </select>
          </div>
        )}
  
        <div className="grid grid-cols-3 gap-4 md:grid-cols-3 sm:grid-cols-1">
          {filteredEpisodes.map((episode) => (
            <div
              key={episode.publicCode}
              className={`
                ${episode.publicCode === currentEpisodePublicCode ? 
                  '[&>div]:border-2 [&>div]:border-blue-500' : ''}
              `}
            >
              <EpisodeCard episode={episode} anime={anime} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default EpisodesModal;
