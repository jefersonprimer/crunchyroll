import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Episode, Anime } from "../types/types";
import styles from "../styles.module.css";

interface EpisodeNavigationProps {
  prevEpisode: Episode | null;
  nextEpisode: Episode | null;
  anime: Anime; // Adicionamos anime nas props
  onShowAllEpisodes: () => void;
}

const EpisodeNavigation: React.FC<EpisodeNavigationProps> = ({
  prevEpisode,
  nextEpisode,
  anime,
  onShowAllEpisodes,
}) => {
  // Componente de card reutilizável movido para dentro para acessar anime
  const EpisodeCard: React.FC<{ episode: Episode }> = ({ episode }) => (
    <div className={styles.episodeCard}>
      <Link
        href={`/watch/${episode.id}/${episode.slug}`}
        className={styles.watchButton}
      >
        <div className={styles.cardContent}>
          <img
            src={episode.image}
            alt={episode.title}
            className={styles.episodeImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300x169";
            }}
          />
          <div className={styles.textContent}>
            <h3 className={styles.episodeTitle}>{episode.title}</h3>
            {anime.audioType && (
              <span className={styles.audioType}>{anime.audioType}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <div className={styles.episodeNavigation}>
      {/* Seção do Episódio Anterior */}
      {prevEpisode && (
        <div className={`${styles.episodeSection} ${styles.previousEpisode}`}>
          <h2 className={styles.sectionTitle}>
           Episódio Anterior
          </h2>
          <EpisodeCard episode={prevEpisode} />
        </div>
      )}

      {/* Seção do Próximo Episódio */}
      {nextEpisode ? (
        <div className={`${styles.episodeSection} ${styles.nextEpisode}`}>
          <h2 className={styles.sectionTitle}>
            Próximo Episódio
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

export default EpisodeNavigation;
