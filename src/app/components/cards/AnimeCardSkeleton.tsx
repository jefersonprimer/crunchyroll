import styles from "./AnimeCard.module.css";

const AnimeCardSkeleton: React.FC = () => {
  return (
    <div className={styles.card}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
        {/* Skeleton for image */}
        <div className={`${styles.animeImage} ${styles.skeleton}`} />
        {/* Skeleton for name */}
        <div className={`${styles.nome} ${styles.skeleton}`} style={{ width: '70%', height: '20px' }} />
        {/* Skeleton for data */}
        <div className={`${styles.data} ${styles.skeleton}`} style={{ width: '40%', height: '16px' }} />
      </div>
    </div>
  );
};

export default AnimeCardSkeleton; 

