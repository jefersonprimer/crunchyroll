"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import { FavoritesProvider } from "@/app/contexts/FavoritesContext";
import RecommendationCarousel from "../../components/RecommendationCarousel";
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

  const { data, loading, error } = useQuery(GET_ANIMES);

  useEffect(() => {
    if (slug && data?.animes) {
      const foundAnime = data.animes.find((anime: Anime) => anime.slug === slug);
      if (foundAnime) {
        setAnime(foundAnime);
        setEpisodes(foundAnime.episodes || []);

        const filteredRecommendations = data.animes
          .filter(
            (recAnime: Anime) =>
              recAnime.id !== foundAnime.id &&
              recAnime.genres?.some((genre) => 
                foundAnime.genres?.some((foundGenre: { name: string }) => foundGenre.name === genre.name)
              )
          )
          .slice(0, 5);

        setRecommendations(filteredRecommendations);
      }
    }
  }, [slug, data]);

  const toggleSynopsis = () => {
    setExpandedSynopsis(!expandedSynopsis);
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Carregando...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        Erro ao carregar dados: {error.message}
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
        description={`Assista ${anime.synopsis?.substring(0, 160) || ''}...`}
      />

      <FavoritesProvider>
        <HeroSection
          anime={anime}
          expandedSynopsis={expandedSynopsis}
          toggleSynopsis={toggleSynopsis}
        />
      </FavoritesProvider>

      <PremiumUpsell />

      <div className={styles.epidodesSection}>
        <EpisodesSection anime={anime} />
      </div>

      <div>
        <h2 className={styles.recommendationsTitle}>Similares a Este</h2>
        <div className={styles.recommendationsSection}>
          <FavoritesProvider>
            <RecommendationCarousel animes={recommendations} />
          </FavoritesProvider>
        </div>
      </div>
    </div>
  );
};

export default Page;
