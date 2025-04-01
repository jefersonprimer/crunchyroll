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
import HeroSection from "./components/HeroSection";

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

      <FavoritesProvider>
        <HeroSection
          anime={anime}
          expandedSynopsis={expandedSynopsis}
          toggleSynopsis={toggleSynopsis}
        />
      </FavoritesProvider>

      <PremiumUpsell />

      {/* Seção de Episódios */}
      <div className={styles.epidodesSection}>
        <EpisodesSection episodes={episodes} anime={anime} />
      </div>

      {/* Seção de Recomendações */}
      <div>
        <h2 className={styles.recommendationsTitle}>More Like This</h2>
        <div className={styles.recommendationsSection}>
          <FavoritesProvider>
            <AnimeCarousel animes={recommendations} />
          </FavoritesProvider>
        </div>
      </div>
    </div>
  );
};

export default Page;
