'use client';

import styles from "./AnimeGrid.module.css";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import { Anime } from "@/types/anime";
import { useFavorites } from "@/app/[locale]/contexts/FavoritesContext";
import Link from "next/link";

import MaturityRating from '../elements/MaturityRating';
import PlayButton from '../buttons/PlayButton';
import BookmarkButton from '../buttons/BookmarkButton';
import AddButton from '../buttons/AddButton';
import AddToListModal from '../modals/AddToListModal';
import AnimeGridSkeleton from './AnimeGridSkeleton';

interface AnimeGridProps {
  animes: Anime[];
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animes }) => {
  const t = useTranslations();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [firstEpisodes, setFirstEpisodes] = useState<{ [key: string]: any }>({});
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const { loading, data } = useQuery(GET_ANIMES);

  useEffect(() => {
    if (!loading && data?.animes) {
      const episodesMap: { [key: string]: any } = {};
      
      animes.forEach((anime) => {
        const currentAnime = data.animes.find((a: Anime) => a.id === anime.id);
        if (currentAnime?.episodes && currentAnime.episodes.length > 0) {
          const firstEp = currentAnime.episodes[0];
          episodesMap[anime.id] = {
            id: firstEp.id,
            slug: firstEp.slug,
            videoUrl: firstEp.videoUrl,
            publicCode: firstEp.publicCode
          };
        }
      });
      
      setFirstEpisodes(episodesMap);
    }
  }, [data, loading, animes]);

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
      {loading
        ? Array.from({ length: 12 }).map((_, i) => <AnimeGridSkeleton key={i} />)
        : animes.map((anime) => {
            const isFavorited = favorites.some((fav) => fav.id === anime.id);
            const firstEpisode = firstEpisodes[anime.id] || null;
            
            return (
              <div key={anime.id} className={styles.animeCard}
              onMouseEnter={() => setHoveredCard(anime.id)}
              onMouseLeave={() => setHoveredCard(null)}
              >
                <Link
                  title={anime.name}
                  href={`/series/${anime.publicCode}/${anime.slug}`}
                 
                >
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

                  <div className={styles.nomeDataContainer}>
                    <p className={styles.nome}>{anime.name}</p>
                    <p className={styles.data}>{t(`audioTypes.${anime.audioType}`)}</p>
                  </div>

                  {hoveredCard === anime.id && (
                    <div className={styles.cardInfo}>
                      <h3 className={styles.name}>{anime.name}</h3>
                      <div>
                        <div className={styles.flexContainer}>
                          <MaturityRating rating={Number(anime.rating) || 0} size={4} />
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
                      <span className={styles.seasonText}>
                        {anime.seasons?.length ?? "N/A"} {t(`seasons.${anime.seasons?.length === 1 ? 'singular' : 'plural'}`)}
                      </span>
                      <span className={styles.episodesText}>
                        {anime.totalEpisodes ?? "N/A"} {t(`episodes.${anime.totalEpisodes === 1 ? 'singular' : 'plural'}`)}
                      </span>
                      
                      <p className={styles.synopsis}>
                        {anime.synopsis}
                      </p>
                    </div>
                  )}
                </Link>
                
                <div className={styles.playButton}>
                  <PlayButton firstEpisode={firstEpisode} />
                  <BookmarkButton isFavorited={isFavorited} onToggle={() => handleFavoriteClick(anime)} />
                  <AddButton onClick={() => {
                    setSelectedAnime(anime);
                    setShowModal(true);
                  }} />
                </div>
                
              </div>
            );
          })
      }
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


