import { useState } from "react";
import { Episode } from "../types/types";
import { Anime } from "@/types/anime";
import { extractEpisodeNumber } from "../utils/utils";
import styles from "./EpisodesModal.module.css";
import { EpisodeCard } from "@/app/series/[id]/[slug]/components/EpisodeCard";

interface EpisodesModalProps {
  episodes: Episode[];
  currentEpisodeId: string;
  anime: Anime; // Adicionando o anime como propriedade necessária
  onClose: () => void;
}

const EpisodesModal: React.FC<EpisodesModalProps> = ({
  episodes,
  currentEpisodeId,
  anime, // Recebendo o anime como prop
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
      return a.season - b.season; // Ordena pelas temporadas (crescente)
    }
    return extractEpisodeNumber(a.title) - extractEpisodeNumber(b.title); // Ordena pelos episódios (crescente)
  });

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>
              {allSeasons.length === 1 ? `Todos os Episódios` : `Episódios`}
            </h2>
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Fechar modal"
            >
              &times;
            </button>
          </div>

          {/* Season selector - only show if there are multiple seasons */}
          {allSeasons.length > 1 && (
            <div className={styles.seasonSelector}>
              <select
                value={selectedSeason}
                onChange={(e) =>
                  setSelectedSeason(
                    e.target.value === "all" ? "all" : Number(e.target.value)
                  )
                }
                className={styles.seasonSelect}
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

          <div className={styles.episodesGrid}>
            {filteredEpisodes.map((episode) => (
              <div
                key={episode.id}
                className={`${styles.episodeGridItem} ${
                  episode.id === currentEpisodeId ? styles.currentEpisode : ""
                }`}
              >
                {/* Substituindo o card anterior pelo EpisodeCard */}
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
