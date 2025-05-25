import React, { useState, useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";
import MaturityRating from "@/app/components/elements/MaturityRating";
import SmallMaturityRating from "@/app/components/utils/elements/SmallMaturityRating";
import ShareButton from "@/app/components/buttons/ShareButton";
import { Anime } from "@/types/anime";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFavorites } from "@/app/contexts/FavoritesContext";
import AddToListModal from "@/app/components/modal/AddToListModal";
import Link from "next/link";

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
          <div style={{ width: '283px', height: '151px' }}>
            <img src={anime.imageLogo} alt={anime.name} />
          </div>
          <div className={styles.metaInfoContainer}>
           
            <MaturityRating rating={Number(anime.rating) || 0} />
            
            <span className={styles.metaItem}>{anime.audioType}</span>
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
            {anime.episodes && anime.episodes.length > 0 ? (
              <Link 
                href={`/watch/${anime.episodes[0].id}/${anime.episodes[0].slug}`}
                className={styles.playButton}
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
                  COMEÇAR A ASSISTIR E1
                </span>
              </Link>
            ) : (
              <div className={styles.playButton}>
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
                  EPISÓDIO INDISPONÍVEL/
                </span>
              </div>
            )}
            <div className={styles.tooltipContainer}>
              <button
                className={styles.buttonBookmark}
                onClick={handleFavoriteClick}
                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
              >
                <div className={styles.tooltip}>
                  <span className={styles.tooltipText}>
                    {isFavorited ? "Remover da Fila" : "Adicionar à Fila"}
                  </span>
                  <FontAwesomeIcon
                    icon={isFavorited ? bookmarkSolid : bookmarkOutline}
                    className={`${styles.iconBookmark} ${isFavorited ? "filled" : "outline"}`}
                    style={{ color: "#FF640A" }}
                  />
                </div>
              </button>
            </div>

            <div className={styles.tooltipContainer}>
              <button
                tabIndex={0}
                className={styles.actionTooltip}
                data-t="custom-list-btn"
                onClick={() => setShowModal(true)}
              >
                <div className={styles.tooltip}>
                  <span className={styles.tooltipText}>
                    Minha Lista
                  </span>
                  <svg
                    className={styles.actionIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 3v8h8v2h-8v8h-2v-8H3v-2h8V3z" />
                  </svg>
                </div>
              </button>
            </div>

            <ShareButton 
              url={`${window.location.origin}/series/${anime.id}/${anime.slug}`}
              title={anime.name}
            />

            <div className={styles.tooltipContainer}>
              <button
                tabIndex={0}
                className={styles.actionTooltip}
                data-t="more-btn"
              >
                <div className={styles.tooltip}>
                  <span className={styles.tooltipText}>Mais opções</span>
                  <svg
                    className={styles.moreIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                  >
                    <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-2 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm2 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

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
                  <strong>Áudio:</strong>
                  <span>
                    {Array.isArray(anime.audioLanguages) 
                      ? anime.audioLanguages.join(', ')
                      : anime.audioLanguages || "Não disponível"}
                  </span>
                </div>
                <div className={styles.metadataItem}>
                  <strong>Legendas:</strong>
                  <span>{anime.subtitles || "Não disponível"}</span>
                </div>

                <div className={styles.metadataItem}>
                  <strong>Classificação de Conteúdo:</strong>
                  <SmallMaturityRating rating={Number(anime.rating) || 0} /> {anime.contentAdvisory}
                </div>

                <div className={styles.metadataItem}>
                  <strong>Gêneros:</strong>
                  <span> {anime.genres?.map(g => g.name).join(", ") || "Não disponível"}</span>
                </div>

                <div className={styles.metadataItem}>
                  <span> {anime.contentSources?.[0]?.copyright || "Não disponível"} </span>
                </div>

              </div>
            </div>
          </div>
        </div>
        <button
          className={styles.moreDetailsButton}
          onClick={toggleSynopsis}
        >
          {expandedSynopsis ? "Mostrar menos" : "Mostrar mais"}
        </button>
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
