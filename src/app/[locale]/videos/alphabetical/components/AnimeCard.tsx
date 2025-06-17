import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { useFavorites } from "../../../contexts/FavoritesContext";
import MaturityRating from "../../../../components/utils/elements/SmallMaturityRating";
import { Anime } from "@/types/anime";
import styles from "../styles.module.css";
import { useTranslations } from "next-intl";

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  const t = useTranslations('alphabetical');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const router = useRouter();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorited = favorites.some((fav) => fav.id === anime.id);
  const firstEpisode = anime.episodes?.[0];

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  return (
    <div
      className={styles.anime_card}
      onMouseEnter={() => setHoveredCard(anime.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <Link href={`/series/${anime.publicCode}/${anime.slug}`}>
        <div className={styles.anime_content} title={anime.name}>
          <div className={styles.imageContainer}>
            <img
              src={anime.imageCardCompact}
              alt={anime.name}
              className={styles.anime_image}
            />
            {isFavorited && (
              <div className={styles.favoriteLabel}>
                <FontAwesomeIcon icon={bookmarkSolid} />
              </div>
            )}
            <div className={styles.ratingContainer}>
              <MaturityRating rating={Number(anime.rating)} />
            </div>
          </div>
          <div className={styles.anime_details}>
            <h3 className={styles.anime_name}>{anime.name}</h3>
            <p className={styles.anime_synopsis}>{anime.synopsis}</p>
            <p className={styles.anime_audio}>{anime.audioType ? t(`filters.${anime.audioType}`) : ''}</p>
            {hoveredCard === anime.id && (
              <div className={styles.cardInfo}>
                <h3 className={styles.name}>{anime.name}</h3>
                <div className={styles.infoText}>
                  <div className={styles.flexContainer}>
                    <span className={styles.score}>
                      {anime.score}
                    </span>
                    <svg className={styles.iconStar} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      data-t="star-svg" 
                      aria-labelledby="star-svg" 
                      aria-hidden="false" 
                      role="img"
                      fill="#f1f1f1"
                    >
                      <title id="star-svg">Avaliação</title>
                      <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z">
                      </path>
                    </svg>
                  </div>
                </div>
                <p className={styles.synopsis}>{anime.synopsis}</p>
                <div className={styles.playButton}>
                  <div className={styles.tooltip}>
                    <span className={styles.tooltipText}>{t('actions.play')}</span>
                    {firstEpisode ? (
                      <div onClick={(e) => {
                        e.preventDefault();
                        router.push(`/watch/${firstEpisode.id}/${firstEpisode.slug}`);
                      }}>
                        <svg className={styles.iconPlay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
                        </svg>
                      </div>
                    ) : (
                      <span>
                        <svg className={styles.iconPlay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className={styles.tooltip} onClick={handleFavoriteClick}>
                    <span className={styles.tooltipText}>
                      {isFavorited ? t('actions.removeFromQueue') : t('actions.addToQueue')}
                    </span>
                    <FontAwesomeIcon
                      icon={isFavorited ? bookmarkSolid : bookmarkOutline}
                      style={{ color: "#FF640A", transition: "color 0.3s ease-in-out" }}
                      className={`${styles.iconBookmark} ${isFavorited ? "filled" : "outline"}`}
                    />
                  </div>
                  <div className={styles.tooltip}>
                    <span className={styles.tooltipText}>{t('actions.addToPrimerlist')}</span>
                    <svg
                      className={styles.iconPlus}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-labelledby="add-svg"
                      role="img"
                    >
                      <title id="add-svg">Add</title>
                      <path d="M13 3v8h8v2h-8v8h-2v-8H3v-2h8V3z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AnimeCard; 