import React, { useState, useEffect } from 'react';
import styles from './FavoritesCard.module.css';
import { Anime } from '../../../types/anime';
import MaturityRating from '@/app/components/elements/MaturityRating';
import { useTranslations } from 'next-intl';
import { AudioType } from '../../../types/enums';

interface AnimeCardProps {
  anime: Anime;
  onRemove: (id: string) => void;
}

const FavoritesCard: React.FC<AnimeCardProps> = ({ anime, onRemove }) => {
  const t = useTranslations();
  const [showText, setShowText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 500);
    const imageTimer = setTimeout(() => setShowImage(true), 1000);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(imageTimer);
    };
  }, []);

  const getAudioTypeKey = (audioType?: AudioType) => {
    if (!audioType) return 'subtitled';
    return audioType.toLowerCase();
  };

  return (
    <div className={styles.animeItem} title={anime.name}>
      <div className={styles.imageContainer}>
        <div className={styles.ratingContainer}>
          <MaturityRating rating={Number(anime.rating) || 0} size={4} />
        </div>
        {(!showImage || !imageLoaded) && <div className={`${styles.skeleton} ${styles.skeletonImage}`} />}
        <img 
          src={anime.imageCardCompact} 
          alt={anime.name} 
          className={styles.animeImage}
          style={{ display: showImage && imageLoaded ? 'block' : 'none' }}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            console.error('Error loading image:', e);
            // Fallback to a default image if needed
            e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image';
            setImageLoaded(true);
          }}
        />
      </div>
      <div className={styles.texts}>
        {showText ? (
          <>
            <h3 className={styles.name}>{anime.name}</h3>
            <span className={styles.play}>Comecar a Assistir: E1</span>
            <div className={styles.buttons}>
              <span className={styles.audioType}>{t(`audioTypes.${getAudioTypeKey(anime.audioType)}`)}</span>
            </div>
          </>
        ) : (
          <>
            <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeleton} ${styles.skeletonAudioType}`} style={{ marginTop: '8px' }} />
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesCard; 