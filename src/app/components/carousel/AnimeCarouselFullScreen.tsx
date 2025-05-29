"use client";

import Loading from "../../loading";
import styles from "./AnimeCarouselFullScreen.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import MaturityRating from "../elements/MaturityRating";
import { useFavorites } from "../../contexts/FavoritesContext";

// GraphQL query to fetch animes with thumbnails
import { GET_HAS_THUMBNAIL } from "../../../lib/queries/getHasThumbnail";
import { GET_EPISODES } from "../../../lib/queries/getEpisodes";

import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";

interface AnimeCarouselFullScreenProps {
  className?: string;
}

const AnimeCarouselFullScreen: React.FC<AnimeCarouselFullScreenProps> = ({
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [firstEpisode, setFirstEpisode] = useState<Episode | null>(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  // Fetch animes with thumbnails using GraphQL
  const { 
    data: animesData, 
    loading: animesLoading, 
    error: animesError 
  } = useQuery(GET_HAS_THUMBNAIL);

  // Fetch episodes using GraphQL
  const { 
    data: episodesData, 
    loading: episodesLoading 
  } = useQuery(GET_EPISODES);

  // Get the thumbnailAnimes from the query result
  const thumbnailAnimes = animesData?.hasThumbnail || [];
  const episodes = episodesData?.episodes || [];

  useEffect(() => {
    if (!episodesLoading && thumbnailAnimes.length > 0) {
      const currentAnime = thumbnailAnimes[currentIndex];
      if (currentAnime && currentAnime.episodes && currentAnime.episodes.length > 0) {
        setFirstEpisode(currentAnime.episodes[0]);
      } else {
        setFirstEpisode(null);
      }
    }
  }, [episodesLoading, thumbnailAnimes, currentIndex, episodes]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (thumbnailAnimes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnailAnimes.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [thumbnailAnimes]);

  const nextPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnailAnimes.length);
  };

  const prevPage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + thumbnailAnimes.length) % thumbnailAnimes.length
    );
  };

  const navigateToPage = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const touchDistance = touchStartX - touchEndX;

    if (touchDistance > 50) {
      nextPage(); // Swipe left
    } else if (touchDistance < -50) {
      prevPage(); // Swipe right
    }

    // Reset touch values
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleFavoriteClick = (e: React.MouseEvent, anime: Anime) => {
    e.preventDefault();
    const isFavorited = favorites.some((fav) => fav.id === anime.id);
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  if (animesLoading) {
    return <Loading />;
  }

  if (animesError) {
    return <div>Erro ao carregar os dados: {animesError.message}</div>;
  }

  if (!thumbnailAnimes || thumbnailAnimes.length === 0) {
    return <div>Nenhum anime disponível.</div>;
  }

  const currentAnime = thumbnailAnimes[currentIndex];
  const isFavorited = favorites.some((fav) => fav.id === currentAnime.id);

  return (
    <div
      className={`${styles.carouselContainer} ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        className={styles.backgroundImage}
        src={isMobile
          ? currentAnime.imagePoster
          : currentAnime.imageThumbnail}
        alt="Background"
      />
      <div className={styles.gradientOverlay}></div>

      <div className={styles.blurOverlay}></div>
      <div className={styles.cardContainer}>
        <div className={styles.cardContent}>
          <div className={styles.logoAnime}>
            {currentAnime && (
              <Link href={`/series/${currentAnime.id}/${currentAnime.slug}`}>
                <img
                  className={styles.logoAnime}
                  src={currentAnime.imageLogo}
                  alt={currentAnime.name}
                />
              </Link>
            )}
          </div>
          <div className={styles.leftColumn}>
            <div className={styles.ratingAndAudioType}>
            <MaturityRating rating={currentAnime.rating} />
            <span className={styles.metaItem}></span>
              <p className={styles.audioType}>
                {currentAnime.audioType}
              </p>
            </div>
            <p className={styles.synopsis}>
              {currentAnime.synopsis}
            </p>

            <div className={styles.buttonsContainer}>
              {currentAnime.episodes && currentAnime.episodes.length > 0 ? (
                <Link 
                  href={`/watch/${currentAnime.episodes[0].id}/${currentAnime.episodes[0].slug}`}
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
                    EPISÓDIO INDISPONÍVEL
                  </span>
                </div>
              )}

              <div className={styles.buttonBookmark} onClick={(e) => handleFavoriteClick(e, currentAnime)}>
                <div className={styles.tooltip}>
                  <span className={styles.tooltipText}>
                    {isFavorited ? "Remover da Fila" : "Adicionar à Fila"}
                  </span>
                  <FontAwesomeIcon
                    icon={isFavorited ? bookmarkSolid : bookmarkOutline}
                    className={`${styles.iconBookmark} ${isFavorited ? "filled" : "outline"}`}
                    style={{ color: "#FF640A" }}
                    title="Fila"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.pageIndicator}>
            {thumbnailAnimes.map((anime: Anime, index: number) => (
              <button
                key={anime.id}
                className={`${styles.pageDot} ${
                  currentIndex === index ? styles.active : ""
                }`}
                onClick={() => navigateToPage(index)}
              >
                <span className={styles.pageLoader}></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.navigationButtons}>
        <button
          className={styles.arrowButton}
          onClick={prevPage}
          aria-label="Anterior"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          className={styles.arrowButton}
          onClick={nextPage}
          aria-label="Próximo"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default AnimeCarouselFullScreen;