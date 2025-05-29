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
              href={`/series/${anime.id}/${anime.slug}`}
             
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
                      <MaturityRating rating={Number(anime.rating) || 0} />
                      <span className={styles.score}>
                        {anime.score}
                        <FontAwesomeIcon icon={faStar} className={styles.iconStar} />
                      </span>
                    </div>
                  </div>

                  <p className={styles.seasonText}>
                    Season: {anime.seasons?.[0]?.seasonNumber ?? "N/A"}
                  </p>
                  <p className={styles.episodesText}>
                    Episódios: {anime.totalEpisodes ?? "N/A"}
                  </p>

                  <p className={`${styles.infoText} ${styles.synopsis}`}>
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
