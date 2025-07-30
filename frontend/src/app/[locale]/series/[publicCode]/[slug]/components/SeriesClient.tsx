"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import RecommendationCarousel from "./RecommendationCarousel";
import { EpisodesSection } from "./EpisodesSection";
import PremiumUpsell from "./PremiumUpsell";
import HeroSection from "./HeroSection";
import { useTranslations } from "next-intl";
import Loading from "@/app/[locale]/loading";

const SeriesClient = (props: any) => {
  const t = useTranslations('Series');
  const { slug } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [recommendations, setRecommendations] = useState<Anime[]>([]);
  const [expandedSynopsis, setExpandedSynopsis] = useState(false);
  const { data, loading, error, refetch } = useQuery(GET_ANIMES);

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

  if (error) {
    return (
      <div>
        Erro ao carregar dados: {error.message}
      </div>
    );
  }

  if (loading) {
    return (
      <Loading />
    );
  }

  if (!anime) {
    return (
      <div></div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <HeroSection
        anime={anime}
        expandedSynopsis={expandedSynopsis}
        toggleSynopsis={toggleSynopsis}
        refetchAnime={refetch}
      />
      <PremiumUpsell />
      <EpisodesSection anime={anime} />
      <div className="py-6 w-full lg:w-[1351px] mx-auto justify-center items-center">
        <div className="w-full flex lg:w-[1223px] mx-auto my-2">
          <h2 className="text-2xl text-white">{t('recommendationsTitle')}</h2>
        </div>
        <div className="flex flex-col items-center justify-center text-center mx-auto">
          <RecommendationCarousel animes={recommendations} />
        </div>
      </div>
    </div>
  );
};

export default SeriesClient; 