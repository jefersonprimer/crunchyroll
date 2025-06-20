import styles from "./AnimeCard.module.css";

export const ImageSkeleton: React.FC = () => (
  <div className={`${styles.animeImage} ${styles.skeleton} ${styles.imageSkeleton}`} />
);

export const NameSkeleton: React.FC = () => (
  <div className={`my-2 ${styles.nome} ${styles.skeleton}`} style={{ width: '70%', height: '20px' }} />
);

export const AudioTypeSkeleton: React.FC = () => (
  <div className={`${styles.data} ${styles.skeleton}`} style={{ width: '40%', height: '16px' }} />
);

// Mantém export default para compatibilidade, mas não será mais usado diretamente
const AnimeCardSkeleton: React.FC = () => (
  <div className={styles.cardWrapper}>
    <div>
      <ImageSkeleton />
      <NameSkeleton />
      <AudioTypeSkeleton />
    </div>
  </div>
);

export default AnimeCardSkeleton; 

