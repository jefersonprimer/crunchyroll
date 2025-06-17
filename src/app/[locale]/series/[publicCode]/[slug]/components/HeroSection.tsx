import { useTranslations } from 'next-intl';
import React, { useState, useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";
import MaturityRating from "@/app/components/elements/MaturityRating";
import SmallMaturityRating from "@/app/components/utils/elements/SmallMaturityRating";
import { Anime } from "@/types/anime";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFavorites } from "@/app/[locale]/contexts/FavoritesContext";
import AddToListModal from "@/app/components/modals/AddToListModal";
import Link from "next/link";
import { useParams } from 'next/navigation';
import EpisodePlayButton from "./buttons/EpisodePlayButton";
import ShareButton from "@/app/components/buttons/ShareButton";
import BookmarkButton from './buttons/BookmarkButton';
import AddToListButton from './buttons/AddToListButton';
import MoreOptionsButton from './buttons/MoreOptionsButton';

interface HeroSectionProps {
  anime: Anime;
  expandedSynopsis: boolean;
  toggleSynopsis: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  anime,
  expandedSynopsis,
  toggleSynopsis,
}) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [showModal, setShowModal] = useState(false);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const isFavorited = favorites.some((fav) => fav.id === anime.id);
  const t = useTranslations('HeroSection');
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    const updateBackgroundImage = () => {
      if (heroImageRef.current) {
        const isMobile = window.innerWidth <= 768;
        const imageUrl = isMobile 
          ? (anime.imageBannerMobile || anime.imagePoster)
          : (anime.imageBannerDesktop || anime.imagePoster);
        
        heroImageRef.current.style.backgroundImage = `url(${imageUrl})`;
      }
    };

    // Initial update
    updateBackgroundImage();

    // Add resize listener
    window.addEventListener('resize', updateBackgroundImage);

    // Cleanup
    return () => window.removeEventListener('resize', updateBackgroundImage);
  }, [anime.imageBannerMobile, anime.imageBannerDesktop, anime.imagePoster]);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  if (!anime) {
    return null;
  }

  return (
    <div
      className={`${styles.heroSection} ${
        expandedSynopsis ? styles.heroSectionExpanded : ""
      }`}
    >
      <div
        ref={heroImageRef}
        className={styles.heroImage}
      >
        <div className={styles.heroContent}>
          <div style={{ width: '283.25px', height: 'auto', marginTop: '-60px', marginBottom: '60px' }}>
            <img src={anime.imageLogo} alt={anime.name} />
          </div>
          <div className={styles.metaInfoContainer}>
            <MaturityRating rating={Number(anime.rating) || 0} />
            <span className={styles.metaItem}>{t(`audioTypes.${anime.audioType}`)}</span>
            <span className={styles.metaItem}></span>
            <div className={styles.genresList}>
              {anime.genres?.map((genre, index) => (
                <React.Fragment key={genre.id}>
                  <span className={styles.genreName}>{genre.name}</span>
                  {index < (anime.genres?.length || 0) - 1 && (
                    <span className={styles.comma}>,</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className={styles.ratingContainer}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={styles.starIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z" />
                </svg>
              ))}
            </div>
            <span className={styles.scoreText}>
              {anime.score?.toFixed(1) || "N/A"}
            </span>
          </div>

          <div className={styles.seriesHeroActionsWrapper}>
            <EpisodePlayButton 
              episode={anime.episodes && anime.episodes.length > 0 ? anime.episodes[0] : null}
            />
            
            <BookmarkButton 
              isFavorited={isFavorited}
              onFavoriteClick={handleFavoriteClick}
            />

            <AddToListButton 
              onClick={() => setShowModal(true)}
            />

            <ShareButton 
              url={`${window.location.origin}/series/${anime.id}/${anime.slug}`}
              title={anime.name}
            />

            <MoreOptionsButton />
          </div>
        </div>
      </div>

      <div className={styles.synopsisContainerMain}>
        <div className={styles.synopsisContainer}>
          <div
            className={`${styles.synopsisWrapper} ${
              expandedSynopsis ? styles.expanded : ""
            }`}
          >
            <div className={styles.synopsisColumns}>
              <div className={styles.synopsisColumn}>
                <p>{anime.synopsis}</p>
              </div>
              <div className={styles.synopsisColumn}>
                <div className={styles.metadata}>
                  <div className={styles.metadataItem}>
                    <strong>{t('metadata.audio')}:</strong>
                    <span>
                      {Array.isArray(anime.audioLanguages)
                        ? anime.audioLanguages.join(', ')
                        : anime.audioLanguages || t('metadata.notAvailable')}
                    </span>
                  </div>
                  <div className={styles.metadataItem}>
                    <strong>{t('metadata.subtitles')}:</strong>
                    <span>{anime.subtitles || t('metadata.notAvailable')}</span>
                  </div>
                  <div className={styles.metadataItem}>
                    <strong>{t('metadata.contentRating')}:</strong>
                    <SmallMaturityRating rating={Number(anime.rating) || 0} /> {anime.contentAdvisory}
                  </div>
                  <div className={styles.metadataItem}>
                    <strong>{t('metadata.genres')}:</strong>
                    <span> {anime.genres?.map(g => g.name).join(", ") || t('metadata.notAvailable')}</span>
                  </div>
                  <div className={styles.metadataItem}>
                    <span> {anime.contentSources?.[0]?.copyright || t('metadata.notAvailable')} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className={styles.moreDetailsButton}
            onClick={toggleSynopsis}
          >
            {expandedSynopsis ? t('buttons.showLess') : t('buttons.showMore')}
          </button>
        </div>
      </div>

      {showModal && (
        <AddToListModal
          anime={anime}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default HeroSection;
