import styles from "./AnimeCard.module.css";

const AnimeCardSkeleton: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.animeLink}>
        {/* Skeleton for image */}
        <div className={`${styles.animeImage} ${styles.skeleton}`} />
        
        <div className={styles.nomeDataContainer}>
          {/* Skeleton for name and audio type */}
          <div className={`${styles.nome} ${styles.skeleton}`} />
          <div className={`${styles.data} ${styles.skeleton}`} />
        </div>

        <div className={styles.cardInfo}>
          {/* Skeleton for title */}
          <div className={`${styles.name} ${styles.skeleton}`} />
          
          <div className={styles.flexContainer2}>
            {/* Skeleton for maturity rating and score */}
            <div className={`${styles.skeleton} ${styles.ratingSkeleton}`} />
            <div className={`${styles.score} ${styles.skeleton}`} />
          </div>

          {/* Skeleton for season and episodes info */}
          <div className={`${styles.infoText} ${styles.skeleton}`} />
          <div className={`${styles.infoText} ${styles.skeleton}`} />

          {/* Skeleton for synopsis */}
          <div className={`${styles.infoText} ${styles.synopsis} ${styles.skeleton}`} />
        </div>
      </div>

      <div className={styles.playButton}>
        {/* Skeleton for buttons */}
        <div className={`${styles.skeleton} ${styles.buttonSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.buttonSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.buttonSkeleton}`} />
      </div>
    </div>
  );
};

export default AnimeCardSkeleton; 

