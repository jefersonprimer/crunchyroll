'use client';

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import styles from "./AnimeGrid.module.css";
import MaturityRating from '../utils/elements/SmallMaturityRating';
import { Anime } from "@/types/anime";
import { useFavorites } from "../../contexts/FavoritesContext";

interface AnimeGridProps {
  animes: Anime[];
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animes }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent, anime: Anime) => {
    e.preventDefault(); // Previne a navegação do Link
    const isFavorited = favorites.some((fav) => fav.id === anime.id);
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  return (
    <div className={styles.gridContainer}>
      {animes.map((anime) => {
        const isFavorited = favorites.some((fav) => fav.id === anime.id);
        
        return (
          <Link
            className={styles.animeCard} title={anime.name}
            href={`/series/${anime.id}/${anime.slug}`}
            key={anime.id}
            onMouseEnter={() => setHoveredCard(anime.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Imagem do anime */}
            <img
              src={anime.imagePoster}
              alt={anime.name}
              className={styles.animeImage}
            />

            {isFavorited && (
              <div className={styles.favoriteLabel}>
                <FontAwesomeIcon icon={bookmarkSolid} />
              </div>
            )}

            {/* Nome e informações adicionais */}
            <div className={styles.nomeDataContainer}>
              <p className={styles.nome}>{anime.name}</p>
              <p className={styles.data}>{anime.audioType}</p>
            </div>

            {/* Informações detalhadas no hover */}
            {hoveredCard === anime.id && (
              <div className={styles.cardInfo}>
                <h3 className={styles.name}>{anime.name}</h3>
                <div className={styles.infoText}>
                  <div className={styles.flexContainer}>
                    <MaturityRating rating={anime.rating} />
                    <span className={styles.score}>
                      {anime.score}
                      <FontAwesomeIcon icon={faStar} className={styles.iconStar} />
                    </span>
                  </div>
                </div>

                <p className={`${styles.infoText} ${styles.seasonText}`}>
                  Season: {anime.seasons?.[0]?.seasonNumber ?? "N/A"}
                </p>
                <p className={`${styles.infoText} ${styles.episodesText}`}>
                  Episódios: {anime.totalEpisodes ?? "N/A"}
                </p>

                <p className={`${styles.infoText} ${styles.synopsis}`}>
                  {anime.synopsis}
                </p>
              </div>
            )}

            {/* Botões de ação */}
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

              <div className={styles.tooltip} onClick={(e) => handleFavoriteClick(e, anime)}>
                <span className={styles.tooltipText}>
                  {isFavorited ? "Remover da Fila" : "Adicionar à Fila"}
                </span>
                <FontAwesomeIcon
                  icon={isFavorited ? bookmarkSolid : bookmarkOutline}
                  className={`${styles.iconBookmark} ${isFavorited ? "filled" : "outline"}`}
                  style={{ color: "#FF640A" }}
                />
              </div>

              <div className={styles.tooltip}>
                <span className={styles.tooltipText}>Add to Primerlist</span>
                <svg
                  className={styles.iconPlus}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-labelledby="add-svg"
                  aria-hidden="false"
                  role="img"
                >
                  <title id="add-svg">Add</title>
                  <path d="M13 3v8h8v2h-8v8h-2v-8H3v-2h8V3z" />
                </svg>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AnimeGrid;
