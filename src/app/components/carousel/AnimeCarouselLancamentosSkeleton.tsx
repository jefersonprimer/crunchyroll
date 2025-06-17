import styles from './AnimeCarouselLancamentosSkeleton.module.css';
import AnimeCardSkeleton from '../cards/AnimeCardSkeleton';

interface AnimeCarouselLancamentosSkeletonProps {
  itemsPerPage?: number;
}

const AnimeCarouselLancamentosSkeleton: React.FC<AnimeCarouselLancamentosSkeletonProps> = ({
  itemsPerPage = 5,
}) => {
  return (
    <div className="anime-carousel-lancamentos">
      <div className={styles.titleSkeleton} />
      <div className={styles.subtitleSkeleton} />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <AnimeCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default AnimeCarouselLancamentosSkeleton; 

