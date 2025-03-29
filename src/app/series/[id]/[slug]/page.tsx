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
import { ClientMetadata } from "./components/ClientMetadata";
import PremiumUpsell from "./components/PremiumUpsell";

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
    if (slug && animes.length > 0 && allEpisodes.length > 0) {
      const foundAnime = animes.find((anime) => anime.slug === slug);
      if (foundAnime) {
        // Normalizar os dados do anime
        const normalizedAnime = {
          ...foundAnime,
          subtitles: Array.isArray(foundAnime.subtitles)
            ? foundAnime.subtitles
            : typeof foundAnime.subtitles === "string"
            ? foundAnime.subtitles.split(", ")
            : [],
          contentAdvisory: Array.isArray(foundAnime.contentAdvisory)
            ? foundAnime.contentAdvisory
            : typeof foundAnime.contentAdvisory === "string"
            ? foundAnime.contentAdvisory.split(", ")
            : [],
        };

        setAnime(normalizedAnime);

        const relatedEpisodes = allEpisodes.filter(
          (episode) => episode.animeId === foundAnime.id
        );
        setEpisodes(relatedEpisodes);

        const filteredRecommendations = animes
          .filter(
            (recAnime) =>
              recAnime.id !== foundAnime.id &&
              recAnime.genres.some((genre) => foundAnime.genres.includes(genre))
          )
          .slice(0, 5);

        setRecommendations(filteredRecommendations);
      }
    }
  }, [slug, animes, allEpisodes]);

  const toggleSynopsis = () => {
    setExpandedSynopsis(!expandedSynopsis);
  };

  if (loadingAnimes || loadingEpisodes) {
    return <div className={styles.loadingContainer}>Carregando...</div>;
  }

  if (errorAnimes || errorEpisodes) {
    return (
      <div className={styles.errorContainer}>
        Erro ao carregar dados: {errorAnimes || errorEpisodes}
      </div>
    );
  }

  if (!anime) {
    return (
      <div className={styles.notFoundContainer}>Anime não encontrado.</div>
    );
  }

  return (
    <div className={styles.container}>
      <ClientMetadata
        title={`Assistir ${anime.name}`}
        description={`Assista ${anime.name}: ${anime.synopsis.substring(
          0,
          160
        )}...`}
      />

      {/* Seção Superior - Cabeçalho do Anime */}
      <div
        className={`${styles.heroSection} ${
          expandedSynopsis ? styles.heroSectionExpanded : ""
        }`}
      >
        <div
          className={styles.heroImage}
          style={{
            backgroundImage: `url(${anime.imageDesktop || anime.image})`,
          }}
        >
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.name}>{anime.name}</h1>
              <div className={styles.metaInfoContainer}>
                <span className={styles.metaItem}>
                  <MaturityRating rating={anime.rating} />
                </span>
                <span className={styles.metaItem}>{anime.audioType}</span>
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
                <div className={styles.metadata}>
                  {/* Áudio */}
                  <div className={styles.metadataItem}>
                      <strong>Áudio:</strong>
                    <span>
                      {anime.audio}
                    </span>
                  </div>

                  {/* Legendas */}
                  <div className={styles.metadataItem}>
                      <strong>Legendas:</strong>
                    <span>
                      {anime.subtitles && anime.subtitles.length > 0
                        ? anime.subtitles.join(", ")
                        : "Não disponível"}
                    </span>
                  </div>

                  {/* Classificação */}
                  <div className={styles.metadataItem}>
                      <strong>Classificação:</strong>
                    <span>
                      {anime.rating}+
                      {anime.contentAdvisory && anime.contentAdvisory.length > 0
                        ? ` (${anime.contentAdvisory.join(", ")})`
                        : ""}
                    </span>
                  </div>

                  {/* Gêneros */}
                  <div className={styles.metadataItem}>
                      <strong>Gêneros:</strong>
                    <span>
                      {" "}
                      {anime.genres.join(", ")}
                    </span>
                  </div>

                  {/* Baseado em */}
                  <div className={styles.metadataItem}>
                      <strong>Baseado em:</strong>
                    <span>
                      {anime.based.source === "original"
                        ? "Obra original"
                        : `${anime.based.source} "${anime.based.title}"`}
                      {anime.based.authors && anime.based.authors.length > 0
                        ? ` por ${anime.based.authors.join(", ")}`
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              onClick={toggleSynopsis}
              className={styles.moreDetailsButton}
              aria-expanded={expandedSynopsis}
            >
              {expandedSynopsis ? "MENOS DETALHES" : "MAIS DETALHES"}
            </button>
          </div>
        </div>
      </div>

      <PremiumUpsell />

      {/* Seção de Episódios */}
      <EpisodesSection episodes={episodes} anime={anime} />

      {/* Seção de Recomendações */}
      <div className={styles.recommendationsSection}>
        <h2>More Like This</h2>
        <FavoritesProvider>
          <AnimeCarousel animes={recommendations} />
        </FavoritesProvider>
      </div>
    </div>
  );
};

export default Page;
