import Link from "next/link";
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
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Todos os Episódios</h2>
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Fechar modal"
            >
              &times;
            </button>
          </div>

          <div className={styles.episodesGrid}>
            {episodes.map((episode) => (
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
