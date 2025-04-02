import Link from "next/link";
import { Episode, Anime } from "../types/types";
import styles from "./EpisodeNavigation.module.css";

interface EpisodeNavigationProps {
  currentEpisode: Episode;
  allEpisodes: Episode[];
  anime: Anime;
  onShowAllEpisodes: () => void;
  selectedSeason?: number;
}

const EpisodeNavigation: React.FC<EpisodeNavigationProps> = ({
  currentEpisode,
  allEpisodes = [],
  anime,
  onShowAllEpisodes,
  selectedSeason,
}) => {
  // Filter episodes by season
  const seasonEpisodes = allEpisodes.filter((ep) => {
    const targetSeason = selectedSeason ?? currentEpisode?.season;
    return ep?.season === targetSeason;
  });

  // Sort episodes by number
  const sortedEpisodes = [...seasonEpisodes].sort((a, b) => {
    const getEpisodeNumber = (title: string) => {
      const match = title?.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    };
    return getEpisodeNumber(a.title) - getEpisodeNumber(b.title);
  });

  // Find current episode index
  const currentIndex = sortedEpisodes.findIndex(
    (ep) => ep?.id === currentEpisode?.id
  );

  // Get previous and next episodes
  const prevEpisode =
    currentIndex > 0 ? sortedEpisodes[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex < sortedEpisodes.length - 1
      ? sortedEpisodes[currentIndex + 1]
      : null;

  // Episode card component
  const EpisodeCard: React.FC<{ episode: Episode | null }> = ({ episode }) => {
    if (!episode) return null;

    return (
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
              {anime?.audioType && (
                <span className={styles.audioType}>{anime.audioType}</span>
              )}
              {anime?.seasonNames && (
                <span className={styles.seasonInfo}>
                  {anime.seasonNames[episode.season] ||
                    `Temporada ${episode.season}`}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className={styles.episodeNavigation}>
      {anime?.seasonNames && (
        <div className={styles.currentSeasonInfo}>
          <h3>
            {anime.seasonNames[currentEpisode.season] ||
              `Temporada ${currentEpisode.season}`}
          </h3>
        </div>
      )}

      {prevEpisode ? (
        <div className={`${styles.episodeSection} ${styles.previousEpisode}`}>
          <h2 className={styles.sectionTitle}>Episódio Anterior</h2>
          <EpisodeCard episode={prevEpisode} />
        </div>
      ) : (
        <div className={styles.noEpisodes}>
          <p>Este é o primeiro episódio desta temporada</p>
        </div>
      )}

      {nextEpisode ? (
        <div className={`${styles.episodeSection} ${styles.nextEpisode}`}>
          <h2 className={styles.sectionTitle}>Próximo Episódio</h2>
          <EpisodeCard episode={nextEpisode} />
        </div>
      ) : (
        <div className={styles.noEpisodes}>
          <p>Este é o último episódio desta temporada</p>
        </div>
      )}

      <button onClick={onShowAllEpisodes} className={styles.seeAllButton}>
        Ver Todos os Episódios
      </button>
    </div>
  );
};

export default EpisodeNavigation;
