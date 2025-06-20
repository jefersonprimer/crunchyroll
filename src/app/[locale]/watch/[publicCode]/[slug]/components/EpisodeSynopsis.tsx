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
              <strong>Áudio</strong>
                  <span>
                    {Array.isArray(anime.audioLanguages) 
                      ? anime.audioLanguages.join(', ')
                      : anime.audioLanguages || "Não disponível"}
                  </span>
              </div>

              {/* Legendas */}
              <div className={styles.metadataItem}>
                <strong>Legendas</strong>
                <span>{safeJoin(Array.isArray(anime.subtitles) ? anime.subtitles : [])}</span>
              </div>

              {/* Classificação */}
              <div className={styles.metadataItem}>
                <strong>Classificação de Conteúdo</strong>
                <span>
                <MaturityRating rating={Number(anime.rating) || 0} size={4} /> {anime.contentAdvisory}
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
