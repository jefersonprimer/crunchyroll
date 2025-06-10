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
import PlayButton from '../buttons/PlayButton';
import BookmarkButton from '../buttons/BookmarkButton';
import AddButton from '../buttons/AddButton';
import AddToListModal from '../modals/AddToListModal';

interface AnimeGridProps {
  animes: Anime[];
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animes }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteClick = (anime: Anime) => {
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
          <div key={anime.id} className={styles.animeCard}
          onMouseEnter={() => setHoveredCard(anime.id)}
          onMouseLeave={() => setHoveredCard(null)}
          >
            <Link
              title={anime.name}
              href={`/series/${anime.publicCode}/${anime.slug}`}
             
            >
              {/* Imagem do anime */}
              <img
                src={anime.imagePoster}
                alt={anime.name}
                className={styles.animeImage}
              />

              {isFavorited && (
                <div className={styles.favoriteLabel}>
                  <svg className={styles.favoriteIcon} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 16 16" data-t="watchlist-filled-small-svg" 
                    aria-hidden="true" 
                    role="img">
                      <path d="M4 2h8a1 1 0 0 1 1 1v9.92a1 1 0 0 1-1.625.78L8 11l-3.375 2.7A1 1 0 0 1 3 12.92V3a1 1 0 0 1 1-1z">
                      </path>
                  </svg>
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
                      <MaturityRating rating={Number(anime.rating) || 0} />
                      <span className={styles.score}>
                        {anime.score}
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
                      </span>
                    </div>
                  </div>

                  <p className={styles.seasonText}>
                    {anime.seasons?.[0]?.seasonNumber ?? "N/A"} Temporada
                  </p>
                  <p className={styles.episodesText}>
                    {anime.totalEpisodes ?? "N/A"} Episódios
                  </p>

                  <p className={styles.synopsis}>
                    {anime.synopsis}
                  </p>
                </div>
              )}
            </Link>
            {/* Botões de ação */}
            <div className={styles.playButton}>
              <PlayButton firstEpisode={null} />
              <BookmarkButton isFavorited={isFavorited} onToggle={() => handleFavoriteClick(anime)} />
              <AddButton onClick={() => {
                setSelectedAnime(anime);
                setShowModal(true);
              }} />
            </div>
            
          </div>
        );
      })}
      {showModal && selectedAnime && (
        <AddToListModal 
          anime={selectedAnime} 
          onClose={() => {
            setShowModal(false);
            setSelectedAnime(null);
          }} 
        />
      )}
    </div>
  );
};

export default AnimeGrid;
