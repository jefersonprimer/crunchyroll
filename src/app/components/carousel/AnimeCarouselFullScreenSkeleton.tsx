import styles from "./AnimeCarouselFullScreen.module.css";

const AnimeCarouselFullScreenSkeleton = () => {
  return (
    <div className={`${styles.carouselContainer}`}>
      <div className={styles.skeletonBackground}></div>
      <div className={styles.gradientOverlay}></div>
      <div className={styles.blurOverlay}></div>
      
      <div className={styles.cardContainer}>
        <div className={styles.cardContent}>
          {/* Logo skeleton */}
          <div className={styles.skeletonLogo}></div>
          
          <div className={styles.leftColumn}>
            {/* Rating and audio type skeleton */}
            <div className={styles.ratingAndAudioType}>
              <div className={styles.skeletonRating}></div>
              <div className={styles.skeletonAudioType}></div>
            </div>

            {/* Synopsis skeleton */}
            <div className={styles.skeletonSynopsis}>
              <div className={styles.skeletonLine}></div>
              <div className={styles.skeletonLine}></div>
              <div className={styles.skeletonLine}></div>
            </div>

            {/* Buttons skeleton */}
            <div className={styles.buttonsContainer}>
              <div className={styles.skeletonPlayButton}></div>
              <div className={styles.skeletonBookmarkButton}></div>
            </div>
          </div>

          {/* Page indicator skeleton */}
          <div className={styles.pageIndicator}>
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className={styles.skeletonPageDot}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation buttons skeleton */}
      <div className={styles.navigationButtons}>
        <div className={styles.skeletonArrowButton}></div>
        <div className={styles.skeletonArrowButton}></div>
      </div>
    </div>
  );
};

export default AnimeCarouselFullScreenSkeleton; 