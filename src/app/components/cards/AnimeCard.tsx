import styles from "./AnimeCard.module.css";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";

import { useFavorites } from "../../contexts/FavoritesContext";
import useFetchEpisodes from '@/app/hooks/useFetchEpisodes';

import { Anime } from "@/types/anime";
import { Episode } from '@/types/episode';

import AddToListModal from "../modal/AddToListModal";
import MaturityRating from '../elements/MaturityRating';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [showModal, setShowModal] = useState(false);
  const isFavorited = favorites.some((fav) => fav.id === anime.id);
  
  const [firstEpisode, setFirstEpisode] = useState<Episode | null>(null);
  const { episodes, isLoading } = useFetchEpisodes(); 

  useEffect(() => {
    if (!isLoading && episodes) {
      const animeEpisodes = episodes.filter((ep) => ep.animeId === anime.id);
      if (animeEpisodes.length > 0) {
        setFirstEpisode(animeEpisodes[0]); 
      }
    }
  }, [episodes, isLoading, anime.id]);


  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  return (
    <div className={styles.card}>
      <Link href={`/series/${anime.id}/${anime.slug}`} key={anime.id} className={styles.animeLink}>
        <img src={anime.image} alt={anime.name} className={styles.animeImage} />
        
        <div className={styles.nomeDataContainer}>
          <p className={styles.nome}>{anime.name}</p>
          <p className={styles.data}>{anime.audioType}</p>
        </div>

        <div className={styles.cardInfo}>
          <h3 className={styles.name}>{anime.name}</h3>
          <div className={styles.flexContainer2}>
            <MaturityRating rating={anime.rating} />
            <span className={styles.score}>
              {anime.score}
              <FontAwesomeIcon icon={faStar} className={styles.iconStar} />
            </span>
          </div>
          <p className={`${styles.infoText} ${styles.seasonText}`}>
            Temporada: {anime.season}
          </p>
          <p className={`${styles.infoText} ${styles.episodesText}`}>
            Episódios: {anime.episodes}
          </p>
          <p className={`${styles.infoText} ${styles.synopsis}`}>{anime.synopsis}</p>
        </div>
        </Link>      
        <div className={styles.playButton}>

        <div className={styles.tooltip}>
            <span className={styles.tooltipText}>Play</span>
            {firstEpisode ? (
              <Link href={`/watch/${firstEpisode.id}/${firstEpisode.slug}`}>
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
              </Link>
            ) : (
              <span> <svg
              className={styles.iconPlay}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-labelledby="play-svg"
              aria-hidden="false"
              role="img"
            >
              <title id="play-svg">Play</title>
              <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
            </svg></span> 
            )}
        </div>

        <div className={styles.tooltip} onClick={handleFavoriteClick}>
          <span className={styles.tooltipText}>
            {isFavorited ? "Remover da Fila" : "Adicionar à Fila"}
          </span>
          <FontAwesomeIcon
            icon={isFavorited ? bookmarkSolid : bookmarkOutline}
            style={{ color: isFavorited ? "#FF640A" : "#FF640A", transition: "color 0.3s ease-in-out" }}
            className={`${styles.iconBookmark} ${isFavorited ? "filled" : "outline"}`}
          />
        </div>

        <div className={styles.tooltip} onClick={() => setShowModal(true)}>
          <span className={styles.tooltipText}>Adicionar à Primerlist</span>
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

      {/* Mostrar o modal */}
      {showModal && (
        <AddToListModal
          anime={anime}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AnimeCard;
