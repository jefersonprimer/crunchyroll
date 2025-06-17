import React from 'react';
import Link from 'next/link';
import styles from './EpisodePlayButton.module.css';
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from 'next-intl';

interface EpisodePlayButtonProps {
  episode?: {
    publicCode: string;
    slug: string;
  } | null;
  className?: string;
}

const EpisodePlayButton: React.FC<EpisodePlayButtonProps> = ({ episode, className = '' }) => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  return episode ? (
    <Link 
      href={`/${locale}/watch/${episode.publicCode}/${episode.slug}`}
      className={`${styles.playButton} ${className}`}
    >
      <div className={styles.tooltip}>
        <span className={styles.tooltipText}>Play</span>
        <svg
          className={styles.iconPlay}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-labelledby="play-svg"
          aria-hidden="false"
          role="img"
        >
          <title id="play-svg">Play</title>
          <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
        </svg>
      </div>
      <span className={styles.titleName}>
        {t("buttons.watch_episode")}
      </span>
      
    </Link>
  ) : (
    <div className={`${styles.playButton} ${className}`}>
      <div className={styles.tooltip}>
        <span className={styles.tooltipText}>Play</span>
        <svg
          className={styles.iconPlay}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-labelledby="play-svg"
          aria-hidden="false"
          role="img"
        >
          <title id="play-svg">Play</title>
          <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
        </svg>
      </div>
      <span className={styles.titleName}>
        EPISÓDIO INDISPONÍVEL
      </span>
    </div>
  );
};

export default EpisodePlayButton; 