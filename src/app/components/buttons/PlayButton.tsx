import React from 'react';
import Link from 'next/link';
import styles from './PlayButton.module.css';

interface PlayButtonProps {
  firstEpisode?: {
    id: string;
    slug: string;
  } | null;
}

const PlayButton: React.FC<PlayButtonProps> = ({ firstEpisode }) => {
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipText}>Play</span>
      {firstEpisode ? (
        <Link href={`/watch/${firstEpisode.id}/${firstEpisode.slug}`}>
          <svg className={styles.iconPlay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
          </svg>
        </Link>
      ) : (
        <span>
          <svg className={styles.iconPlay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
          </svg>
        </span>
      )}
    </div>
  );
};

export default PlayButton; 