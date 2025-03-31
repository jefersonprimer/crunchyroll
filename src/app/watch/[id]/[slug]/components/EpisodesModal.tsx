import Link from "next/link";
import { useState } from "react";
import { Episode } from "../types/types";
import { extractEpisodeNumber } from "../utils/utils";
import styles from "../styles.module.css";

interface EpisodesModalProps {
  episodes: Episode[];
  currentEpisodeId: string;
  onClose: () => void;
}

const EpisodesModal: React.FC<EpisodesModalProps> = ({
  episodes,
  currentEpisodeId,
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
              <Link
                key={episode.id}
                href={`/watch/${episode.id}/${episode.slug}`}
                className={`${styles.episodeGridItem} ${
                  episode.id === currentEpisodeId ? styles.currentEpisode : ""
                }`}
              >
                <div className={styles.episodeGridCard}>
                  <img
                    src={episode.image || "https://via.placeholder.com/300x169"}
                    alt={episode.title}
                    className={styles.episodeGridImage}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/300x169";
                    }}
                  />
                  <div className={styles.episodeGridInfo}>
                    <span className={styles.episodeNumber}>
                      Ep {extractEpisodeNumber(episode.title)}
                    </span>
                    {allSeasons.length > 1 && (
                      <span className={styles.episodeSeason}>
                        Temp. {episode.season}
                      </span>
                    )}
                    <h3>{episode.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodesModal;
