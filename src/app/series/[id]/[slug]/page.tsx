//  style={{ backgroundImage: `url(${anime.image})` }}


"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";
import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";
import useFetchAnimes from "../../../hooks/useFetchAnimes";
import useFetchEpisodes from "../../../hooks/useFetchEpisodes";
import { FavoritesProvider } from "@/app/contexts/FavoritesContext";
import AnimeCarousel from "../../../components/cards/AnimeCarousel";
import { EpisodesSection } from "./components/EpisodesSection";
import MaturityRating from "@/app/components/elements/MaturityRating";

const Page = () => {
  const { slug } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [recommendations, setRecommendations] = useState<Anime[]>([]);
  const [expandedSynopsis, setExpandedSynopsis] = useState(false);

  const {
    animes,
    loading: loadingAnimes,
    error: errorAnimes,
  } = useFetchAnimes();
  const {
    episodes: allEpisodes,
    loading: loadingEpisodes,
    error: errorEpisodes,
  } = useFetchEpisodes();

  useEffect(() => {
    if (slug) {
      const foundAnime = animes.find((anime) => anime.slug === slug);
      if (foundAnime) {
        setAnime(foundAnime);

        const relatedEpisodes = allEpisodes.filter(
          (episode) => episode.animeId === foundAnime.id
        );
        setEpisodes(relatedEpisodes);

        const filteredRecommendations = animes.filter(
          (recAnime) =>
            recAnime.id !== foundAnime.id &&
            recAnime.genres.some((genre) => foundAnime.genres.includes(genre))
        );

        setRecommendations(filteredRecommendations.slice(0, 5));
      }
    }
  }, [slug, animes, allEpisodes]);

  const toggleSynopsis = () => {
    setExpandedSynopsis(!expandedSynopsis);
  };

  if (loadingAnimes || loadingEpisodes) {
    return <p>Carregando...</p>;
  }

  if (errorAnimes || errorEpisodes) {
    return <p>Erro ao carregar dados: {errorAnimes || errorEpisodes}</p>;
  }

  if (!anime) {
    return <p>Anime não encontrado.</p>;
  }

  return (
    <div className={styles.container}>
      {/* Seção Superior - Cabeçalho do Anime */}
      <div
        className={`${styles.heroSection} ${
          expandedSynopsis ? styles.heroSectionExpanded : ""
        }`}
      >
        <div
          className={styles.heroImage}
          style={{
            backgroundImage: "url(https://placewaifu.com/image/1200/364)",
          }}
        >
          <div className={styles.heroContent}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1 className={styles.name}>{anime.name}</h1>
                <div className={styles.metaInfoContainer}>
                  <span className={styles.metaItem}>
                    {" "}
                    <MaturityRating rating={anime.rating} />
                  </span>
                  <span className={styles.metaItem}>{anime.audioType}</span>
                  <span className={styles.metaItem}></span>
                  <div className={styles.genresList}>
                    {anime.genres.map((genre, index) => (
                      <React.Fragment key={genre}>
                        <span className={styles.genreName}>{genre}</span>
                        {index < anime.genres.length - 1 && (
                          <span className={styles.comma}>,</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Sinopse */}
        <div className={styles.synopsisContainer}>
          <div
            className={`${styles.synopsisWrapper} ${
              expandedSynopsis ? styles.expanded : ""
            }`}
          >
            <div className={styles.synopsisColumns}>
              <div className={styles.synopsisColumn}>
                <p>{anime.synopsis}</p>
              </div>
              <div className={styles.synopsisColumn}>
                <p>{anime.synopsis}</p>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              onClick={toggleSynopsis}
              className={styles.moreDetailsButton}
            >
              {expandedSynopsis ? "MENOS DETALHES" : "MAIS DETALHES"}
            </button>
          </div>
        </div>
      </div>

      {/* Seção de Episódios */}
      <EpisodesSection episodes={episodes} />

      {/* Seção de Recomendações */}
      <div className={styles.recommendationsSection}>
        <h2>Veja também!</h2>
        <FavoritesProvider>
          <AnimeCarousel animes={recommendations} />
        </FavoritesProvider>
      </div>
    </div>
  );
};

export default Page;
