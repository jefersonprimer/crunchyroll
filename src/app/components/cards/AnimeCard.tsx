import styles from "./AnimeCard.module.css";
import { ImageSkeleton, NameSkeleton, AudioTypeSkeleton } from './AnimeCardSkeleton';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from "next/navigation";
import { useFavorites } from "../../[locale]/contexts/FavoritesContext";
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import { Anime } from "@/types/anime";
import { useLists } from "../../[locale]/contexts/ListsContext";
import CreateModal from "../../[locale]/crunchylists/[listId]/components/CreateModal";

import MaturityRating from '../elements/MaturityRating';
import AddToListModal from "../modals/AddToListModal";
import PlayButton from '../buttons/PlayButton';
import BookmarkButton from '../buttons/BookmarkButton';
import AddButton from '../buttons/AddButton';

const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => {
  const t = useTranslations();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { lists, createList } = useLists();
  const [showModal, setShowModal] = useState(false);
  const [showAddToListModal, setShowAddToListModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const isFavorited = favorites.some((fav) => fav.id === anime.id);
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [firstEpisode, setFirstEpisode] = useState<any | null>(null);
  const [showText, setShowText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { loading, data } = useQuery(GET_ANIMES);

  useEffect(() => {
    if (!loading && data?.animes) {
      const currentAnime = data.animes.find((a: Anime) => a.id === anime.id);
      if (currentAnime?.episodes && currentAnime.episodes.length > 0) {
        const firstEp = currentAnime.episodes[0];
        console.log('Setting first episode:', firstEp);
        setFirstEpisode({
          id: firstEp.id,
          slug: firstEp.slug,
          videoUrl: firstEp.videoUrl,
          publicCode: firstEp.publicCode
        });
      }
    }
  }, [data, loading, anime.id]);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 500);
    const imageTimer = setTimeout(() => setShowImage(true), 1000);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(imageTimer);
    };
  }, []);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  const handleAddButtonClick = () => {
    if (lists.length === 0) {
      setShowCreateModal(true);
    } else {
      setShowAddToListModal(true);
    }
  };

  const handleCreateList = () => {
    if (newListName.trim()) {
      createList(newListName);
      setShowCreateModal(false);
      setNewListName("");
      setShowAddToListModal(true);
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <Link href={`/${locale}/series/${anime.publicCode}/${anime.slug}`} className={styles.animeLink}>
          <div style={{ position: 'relative', width: '100%', height: '330.89px' }}>
            {(!showImage || !imageLoaded) && (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
                <ImageSkeleton />
              </div>
            )}
            <img
              src={anime.imagePoster}
              alt={anime.name}
              className={styles.animeImage}
              style={{ display: showImage ? (imageLoaded ? 'block' : 'none') : 'none' }}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
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
            {showText ? (
              <>
                <p className={styles.nome}>{anime.name}</p>
                <p className={styles.data}>{t(`audioTypes.${anime.audioType}`)}</p>
              </>
            ) : (
              <>
                <NameSkeleton />
                <AudioTypeSkeleton />
              </>
            )}
          </div>

          <div className={styles.cardInfo}>
            <h3 className={styles.name}>{anime.name}</h3>
            <div className={styles.flexContainer2}>
              <MaturityRating rating={anime.rating} size={4} />
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
              {anime.seasons?.length ?? "N/A"} {t(`seasons.${anime.seasons?.length === 1 ? 'singular' : 'plural'}`)}
            </span>
            <span className={styles.episodesText}>
              {anime.totalEpisodes ?? "N/A"} {t(`episodes.${anime.totalEpisodes === 1 ? 'singular' : 'plural'}`)}
            </span>

            <p className={styles.synopsis}>{anime.synopsis}</p>
          </div>
        </Link>      

        <div className={styles.playButton}>
          <PlayButton firstEpisode={firstEpisode} />
          <BookmarkButton isFavorited={isFavorited} onToggle={handleFavoriteClick} />
          <AddButton onClick={handleAddButtonClick} />
        </div>

        {showAddToListModal && (
          <AddToListModal 
            anime={anime} 
            onClose={() => setShowAddToListModal(false)} 
          />
        )}
        {showCreateModal && (
          <CreateModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreateList}
            newListName={newListName}
            onNameChange={setNewListName}
            characterCount={newListName.length}
            maxCharacters={50}
          />
        )}
      </div>
    </div>
  );
};

export default AnimeCard;