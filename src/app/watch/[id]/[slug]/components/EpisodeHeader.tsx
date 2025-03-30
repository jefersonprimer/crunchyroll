import { Anime, Episode } from "../types/types";
import MaturityRating from "@/app/components/elements/MaturityRating";
import styles from "../styles.module.css";

interface EpisodeHeaderProps {
  anime: Anime;
  episode: Episode;
}

const EpisodeHeader: React.FC<EpisodeHeaderProps> = ({ anime, episode }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.animeTitle}>{anime.name}</h1>
        {anime.score && (
          <span className={styles.animeScore}>{anime.score}</span>
        )}
      </div>

      <h2 className={styles.episodeTitle}>{episode.title}</h2>

      <div className={styles.metaInfo}>
        {anime.rating && (
          <span className={styles.ratingBadge}>
            <MaturityRating rating={anime.rating} />
          </span>
        )}

        {anime.audioType && (
          <span className={styles.audioType}>{anime.audioType}</span>
        )}

        {anime.releaseDate && (
          <span className={styles.releaseDate}>
            Lançado em {anime.releaseDate}
          </span>
        )}
      </div>
    </div>
  );
};

export default EpisodeHeader;
