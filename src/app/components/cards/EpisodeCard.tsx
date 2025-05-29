import React from 'react';
import Link from 'next/link';
import styles from './EpisodeCard.module.css';
import { Episode } from '../../../types/episode';

interface EpisodeCardProps {
  episode: Episode;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const hasVideoUrl = episode.videoUrl || (episode.versions && episode.versions.length > 0);
  
  const getEpisodeNumber = (title: string) => {
    const match = title.match(/E(\d+)/);
    return match ? match[1] : "";
  };

  const episodeNumber = getEpisodeNumber(episode.title);

  return (
    <div className={styles.episodeCard} title={episode.title}>
      <div className={styles.episodeImageContainer}>
        <Link 
          href={hasVideoUrl ? `/watch/${episode.id}/${episode.slug}` : "#"}
          className={`${styles.episodeLink} ${!hasVideoUrl ? styles.disabled : ""}`}
          onClick={(e) => {
            if (!hasVideoUrl) {
              e.preventDefault();
            }
          }}
        >
          <img src={episode.image} alt={`Episódio ${episode.title}`} className={styles.episodeImage} />
          {hasVideoUrl && (
            <div className={styles.playIconContainer}>
              <svg
                className={styles.playIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="play-filled-svg"
                aria-labelledby="play-filled-svg"
                aria-hidden="true"
                role="img"
              >
                <path d="m4 2 16 10L4 22z" />
              </svg>
            </div>
          )}
          {!hasVideoUrl && (
            <div className={styles.comingSoonBadge}>Em breve</div>
          )}
        </Link>
      </div>
      <div className={styles.episodeDetails}>
        <div className={styles.episodeInfo}>
          {episode.anime && (
            <h3 className={styles.animeName}>{episode.anime.name.toUpperCase()}</h3>
          )}
          <p className={styles.episodeTitle}>
            {episodeNumber && <span className={styles.episodeNumber}>E{episodeNumber}</span>}
            {episode.title.replace(/^E\d+\s*-\s*/, "")}
          </p>
          <p><strong>Duração:</strong> {episode.duration}</p>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard; 