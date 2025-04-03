import { Anime, Episode } from "../types/types";
import MaturityRating from "@/app/components/elements/MaturityRating";
import styles from "./EpisodeHeader.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { useFavorites } from "@/app/contexts/FavoritesContext";
import { MouseEvent } from "react";

interface EpisodeHeaderProps {
  anime: Anime;
  episode: Episode;
}

const EpisodeHeader: React.FC<EpisodeHeaderProps> = ({ anime, episode }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorited = favorites.some((fav) => fav.id === anime.id);

  const handleFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

   const formatDate = (dateString: string) => {
     const months = [
       "Jan",
       "Feb",
       "Mar",
       "Apr",
       "May",
       "Jun",
       "Jul",
       "Aug",
       "Sep",
       "Oct",
       "Nov",
       "Dec",
     ];
     const [year, month, day] = dateString.split("-");
     return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
   };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleRow}>
        <div className={styles.titleContainer}>
          <Link href={`/series/${anime.id}/${anime.slug}`} key={anime.id}>
            <h1 className={styles.animeTitle}>{anime.name}</h1>
          </Link>
          {anime.score && (
            <div className={styles.scoreContainer}>
              <span className={styles.animeScore}>{anime.score}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={styles.starIcon}
                aria-hidden="true"
              >
                <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z" />
              </svg>
            </div>
          )}
        </div>

        <div className={styles.tooltipContainer}>
          <button
            tabIndex={0}
            className={styles.buttonSecondary}
            data-t="add-to-watchlist-btn"
            onClick={handleFavoriteClick}
          >
            <span className={styles.callToAction}>
              <div className={styles.tooltip}>
                <span className={styles.tooltipText}>
                  {isFavorited ? "Remover da Fila" : "Adicionar à Fila"}
                </span>
                <FontAwesomeIcon
                  icon={isFavorited ? bookmarkSolid : bookmarkOutline}
                  style={{
                    color: isFavorited ? "#FF640A" : "#FF640A",
                    transition: "color 0.3s ease-in-out",
                  }}
                  className={`${styles.iconBookmark} ${
                    isFavorited ? "filled" : "outline"
                  }`}
                />
              </div>
            </span>
          </button>
        </div>
      </div>

      <h2 className={styles.episodeTitle}>{episode.title}</h2>

      <div className={styles.metaInfo}>
        <div className={styles.metaLine}>
          {anime.rating && (
            <span className={styles.ratingBadge}>
              <MaturityRating rating={anime.rating} />
            </span>
          )}
          <span className={styles.metaItem}></span>
          {anime.audioType && (
            <span className={styles.audioType}>{anime.audioType}</span>
          )}
        </div>

        {episode.releaseDate && (
          <div className={styles.releaseDate}>
            Released on {formatDate(episode.releaseDate)}
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodeHeader;
