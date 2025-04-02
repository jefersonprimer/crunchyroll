import { Anime, Episode } from "../types/types";
import { safeJoin } from "../utils/utils";
import MaturityRating from "@/app/components/elements/MaturityRating";
import styles from "./EpisodeSynopsis.module.css";

interface EpisodeSynopsisProps {
  episode: Episode;
  anime: Anime;
  expanded: boolean;
  onToggle: () => void;
}

const EpisodeSynopsis: React.FC<EpisodeSynopsisProps> = ({
  episode,
  anime,
  expanded,
  onToggle,
}) => {
  return (
    <div className={styles.synopsisContainer}>
      <div
        className={`${styles.synopsisWrapper} ${
          expanded ? styles.expanded : ""
        }`}
      >
        <div className={styles.synopsisColumns}>
          <div className={styles.synopsisColumn}>
            <p>{episode.synopsis || "Sinopse não disponível"}</p>
          </div>

          <div className={styles.synopsisColumn}>
            <div className={styles.metadata}>
              {/* Áudio */}
              <div className={styles.metadataItem}>
                <strong>Áudio:</strong>
                <span>{anime.audio || "Não disponível"}</span>
              </div>

              {/* Legendas */}
              <div className={styles.metadataItem}>
                <strong>Legendas:</strong>
                <span>{safeJoin(anime.subtitles)}</span>
              </div>

              {/* Classificação */}
              <div className={styles.metadataItem}>
                <strong>Classificação:</strong>
                <span>
                  {anime.rating ? `${anime.rating}+` : "Não classificado"}
                  {anime.contentAdvisory
                    ? ` (${safeJoin(anime.contentAdvisory)})`
                    : ""}
                </span>
              </div>

              {/* Gêneros */}
              <div className={styles.metadataItem}>
                <strong>Gêneros:</strong>
                <span>{safeJoin(anime.genres)}</span>
              </div>

              {/* Baseado em */}
              <div className={styles.metadataItem}>
                <strong>Baseado em:</strong>
                <span>
                  {anime.based?.source === "original"
                    ? "Obra original"
                    : anime.based?.source && anime.based?.title
                    ? `${anime.based.source} "${anime.based.title}"`
                    : "Não especificado"}
                  {anime.based?.authors
                    ? ` por ${safeJoin(anime.based.authors)}`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onToggle}
        className={styles.moreDetailsButton}
        aria-expanded={expanded}
      >
        {expanded ? "MENOS DETALHES" : "MAIS DETALHES"}
      </button>
    </div>
  );
};

export default EpisodeSynopsis;
