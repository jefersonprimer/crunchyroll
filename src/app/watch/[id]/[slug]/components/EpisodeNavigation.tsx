import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Episode } from "../types/types";
import styles from "../styles.module.css";

interface EpisodeNavigationProps {
  prevEpisode: Episode | null;
  nextEpisode: Episode | null;
  onShowAllEpisodes: () => void;
}

const EpisodeNavigation: React.FC<EpisodeNavigationProps> = ({
  prevEpisode,
  nextEpisode,
  onShowAllEpisodes,
}) => {
  return (
    <div className={styles.episodeNavigation}>
      {/* Seção do Episódio Anterior */}
      {prevEpisode && (
        <div className={`${styles.episodeSection} ${styles.previousEpisode}`}>
          <h2 className={styles.sectionTitle}>
            <FontAwesomeIcon icon={faChevronLeft} /> Episódio Anterior
          </h2>
          <EpisodeCard episode={prevEpisode} />
        </div>
      )}

      {/* Seção do Próximo Episódio */}
      {nextEpisode ? (
        <div className={`${styles.episodeSection} ${styles.nextEpisode}`}>
          <h2 className={styles.sectionTitle}>
            Próximo Episódio <FontAwesomeIcon icon={faChevronRight} />
          </h2>
          <EpisodeCard episode={nextEpisode} />
        </div>
      ) : (
        <div className={styles.noEpisodes}>
          <p>Este é o último episódio disponível</p>
        </div>
      )}

      <button onClick={onShowAllEpisodes} className={styles.seeAllButton}>
        Ver Todos os Episódios
      </button>
    </div>
  );
};

// Componente de card reutilizável
const EpisodeCard: React.FC<{ episode: Episode }> = ({ episode }) => (
  <div className={styles.episodeCard}>
    <img
      src={episode.image || "https://via.placeholder.com/300x169"}
      alt={episode.title}
      className={styles.episodeImage}
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          "https://via.placeholder.com/300x169";
      }}
    />
    <div className={styles.episodeInfo}>
      <h3 className={styles.episodeTitle}>{episode.title}</h3>
      <Link
        href={`/watch/${episode.id}/${episode.slug}`}
        className={styles.watchButton}
      >
        <FontAwesomeIcon icon={faPlay} /> Assistir
      </Link>
    </div>
  </div>
);

export default EpisodeNavigation;
