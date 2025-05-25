// src/components/cards/AnimeCard.tsx
import styles from "./AnimeCard.module.css";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";

import { useFavorites } from "../../contexts/FavoritesContext";
import { useQuery } from '@apollo/client';

import AddToListModal from "../modal/AddToListModal";
import MaturityRating from '../utils/elements/SmallMaturityRating';
import PlayButton from '../buttons/PlayButton';
import BookmarkButton from '../buttons/BookmarkButton';
import AddButton from '../buttons/AddButton';
import { GET_EPISODES } from "@/lib/queries/getEpisodes";
import { Anime } from "@/types/anime";

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
    <div className={styles.card} title={anime.name}>
      <Link href={`/series/${anime.id}/${anime.slug}`} className={styles.animeLink}>
        <img src={anime.imagePoster} alt={anime.name} className={styles.animeImage} />
        
        {isFavorited && (
          <div className={styles.favoriteLabel}>
            <FontAwesomeIcon icon={bookmarkSolid} />
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
              <FontAwesomeIcon icon={faStar} className={styles.iconStar} />
            </span>
          </div>
          <p className={`${styles.infoText} ${styles.seasonText}`}>
            Temporada: {anime.seasons?.[0]?.seasonNumber ?? "N/A"}
          </p>
          <p className={`${styles.infoText} ${styles.episodesText}`}>
            Episódios: {anime.totalEpisodes ?? "N/A"}
          </p>

          <p className={`${styles.infoText} ${styles.synopsis}`}>{anime.synopsis}</p>
        </div>
      </Link>      

      <div className={styles.playButton}>
        <PlayButton firstEpisode={firstEpisode} />
        <BookmarkButton isFavorited={isFavorited} onToggle={handleFavoriteClick} />
        <AddButton onClick={() => setShowModal(true)} />
      </div>

      {showModal && <AddToListModal anime={anime} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AnimeCard;