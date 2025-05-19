import React, { useState } from "react";
import styles from "./HeroSection.module.css";
import MaturityRating from "@/app/components/elements/MaturityRating";
import { Anime } from "@/types/anime";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFavorites } from "@/app/contexts/FavoritesContext";
import AddToListModal from "@/app/components/modal/AddToListModal";

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
  const isFavorited = favorites.some((fav) => fav.id === anime.id);

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
        className={styles.heroImage}
        style={{
          backgroundImage: `url(${anime.imageBannerDesktop || anime.imagePoster})`,
        }}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.name}>{anime.name}</h1>
          <div className={styles.metaInfoContainer}>
            <span className={styles.metaItem}>
              <MaturityRating rating={anime.rating} />
            </span>
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
              Average Rating: {anime.score?.toFixed(1) || "N/A"}
            </span>
          </div>

          <div className={styles.seriesHeroActionsWrapper}>
            <button
              className={styles.actionButton}
              onClick={handleFavoriteClick}
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <FontAwesomeIcon
                icon={isFavorited ? bookmarkSolid : bookmarkOutline}
                className={styles.actionIcon}
              />
            </button>

            <div className={styles.tooltipContainer}>
              <button
                tabIndex={0}
                className={styles.actionTooltip}
                data-t="custom-list-btn"
                onClick={() => setShowModal(true)}
              >
                <div className={styles.tooltip}>
                  <span className={styles.tooltipText}>
                    Adicionar à Primerlist
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

            <div className={styles.tooltipContainer}>
              <button
                tabIndex={0}
                className={styles.actionTooltip}
                data-t="share-btn"
              >
                <div className={styles.tooltip}>
                  <span className={styles.tooltipText}>Compartilhar</span>
                  <svg
                    className={styles.actionIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2c2.21 0 4 1.79 4 4s-1.79 4-4 4c-1.385 0-2.606-.704-3.323-1.773l-5.02 2.151c.22.496.343 1.045.343 1.622 0 .577-.122 1.126-.342 1.622l5.019 2.151C15.394 14.703 16.615 14 18 14c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4c0-.113.005-.225.014-.335L8.35 15.238C7.69 15.718 6.878 16 6 16c-2.21 0-4-1.79-4-4s1.79-4 4-4c.878 0 1.69.283 2.35.762l5.664-2.427C14.004 6.225 14 6.113 14 6c0-2.21 1.79-4 4-4zm0 14c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zM6 10c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm12-6c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z" />
                  </svg>
                </div>
              </button>
            </div>

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
                  <span>{anime.audioType || "Não disponível"}</span>
                </div>

                <div className={styles.metadataItem}>
                  <strong>Classificação:</strong>
                  <span>
                    {anime.rating}+
                  </span>
                </div>

                <div className={styles.metadataItem}>
                  <strong>Gêneros:</strong>
                  <span> {anime.genres?.map(g => g.name).join(", ") || "Não disponível"}</span>
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
