import styles from "./AnimeCard.module.css";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useFavorites } from "../../contexts/FavoritesContext";
import { useQuery } from '@apollo/client';
import { GET_EPISODES } from "@/lib/queries/getEpisodes";
import { Anime } from "@/types/anime";

import MaturityRating from '../utils/elements/SmallMaturityRating';
import AddToListModal from "../modals/AddToListModal";
import PlayButton from '../buttons/PlayButton';
import BookmarkButton from '../buttons/BookmarkButton';
import AddButton from '../buttons/AddButton';

const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [showModal, setShowModal] = useState(false);
  const isFavorited = favorites.some((fav) => fav.id === anime.id);
  
  const [firstEpisode, setFirstEpisode] = useState<any | null>(null);
  const { loading: isLoading, data } = useQuery(GET_EPISODES);
  const episodes = data?.episodes || [];

  useEffect(() => {
    if (!isLoading && episodes) {
      const animeEpisodes = episodes.filter((ep: any) => ep.animeId === anime.id);
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
    <div className={styles.cardWrapper}>
      <div className={styles.card} title={anime.name}>
        <Link href={`/series/${anime.publicCode}/${anime.slug}`} className={styles.animeLink}>
          <img src={anime.imagePoster} alt={anime.name} className={styles.animeImage} />
          
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
            <span className={styles.seasonText}>
              {anime.seasons?.length ?? "N/A"} Temporada{anime.seasons?.length !== 1 ? "s" : ""}
            </span>
            <span className={styles.episodesText}>
              {anime.totalEpisodes ?? "N/A"} Episódio{anime.totalEpisodes !== 1 ? "s" : ""}
            </span>

            <p className={styles.synopsis}>{anime.synopsis}</p>
          </div>
        </Link>      

        <div className={styles.playButton}>
          <PlayButton firstEpisode={firstEpisode} />
          <BookmarkButton isFavorited={isFavorited} onToggle={handleFavoriteClick} />
          <AddButton onClick={() => setShowModal(true)} />
        </div>

        {showModal && <AddToListModal anime={anime} onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
};

export default AnimeCard;