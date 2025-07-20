"use client";

import { useQuery } from "@apollo/client";
import { GET_ANIME_OF_DAY } from "@/lib/queries/getAnimeOfTheDay";
import { Anime } from "@/types/anime";
import AnimeCarousel from "./AnimeCarousel";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface AnimeCarouselByDayProps {
  itemsPerPage?: number;
  className?: string;
}

interface GetAnimeOfTheDayData {
  animeOfTheDay: Anime | Anime[];
}

const AnimeCarouselByDay: React.FC<AnimeCarouselByDayProps> = ({
  itemsPerPage = 5,
  className = "",
}) => {
  const t = useTranslations("carousels.animeOfTheDay");
  const { loading, error, data } = useQuery<GetAnimeOfTheDayData>(GET_ANIME_OF_DAY);
  
  // Timer para skeleton
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loading) {
      setShowSkeleton(true);
      timeout = setTimeout(() => setShowSkeleton(false), 1000);
    } else {
      setShowSkeleton(false);
    }
    return () => clearTimeout(timeout);
  }, [loading]);

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  if (!data?.animeOfTheDay && !showSkeleton) {
    return <div></div>;
  }

  // Normalize data to always work with an array
  const animes: Anime[] = Array.isArray(data?.animeOfTheDay)
    ? data.animeOfTheDay
    : data?.animeOfTheDay
    ? [data.animeOfTheDay]
    : [];

  if (animes.length === 0 && !showSkeleton) {
    return <div className="w-full h-[508.89px] flex items-center justify-center"></div>;
  }

  // Get day from first anime (assuming all have the same airingDay)
  const airingDay = animes[0]?.airingDay || "Unknown";

  // Conditional text based on number of animes
  const titleText = animes.length === 1
    ? t("title", { day: airingDay })
    : t("titlePlural", { day: airingDay });

  const subtitleText = animes.length === 1
    ? t("subtitle")
    : t("subtitlePlural");

  return (
    <div className={`w-[1351px] h-[508.89px] text-left flex flex-col items-center ${className}`}>
      {/* Header: mostra skeleton ou real */}
      {loading ? (
        <div className="w-[1223px] flex flex-col items-start justify-center mx-auto max-md:w-full max-md:px-5">
          <div className="h-8 w-[40%] mb-2 bg-[#141519] bg-[length:200%_100%] animate-[loading_1.5s_infinite]" />
          <div className="h-5 w-[40%] mb-4 bg-[#141519] bg-[length:200%_100%] animate-[loading_1.5s_infinite]" />
        </div>
      ) : (
        <div className="w-[1223px] flex flex-col items-start justify-center my-0 mx-auto">
          <h2 className="text-[1.74rem] mb-[4px] text-[#FFFFFF] font-bold">
            {titleText}
          </h2>
          <p className="text-[0.97rem] mb-[4px] text-[#A0A0A0] font-medium">
            {subtitleText}
          </p>
        </div>
      )}
      {/* Cards: apenas AnimeCarousel com loading controlado por prop */}
      <div className="w-[1351px] h-[436.89px] mx-auto flex justify-center items-center relative overflow-hidden max-md:w-full">
        <div className="w-full flex items-center justify-start overflow-x-hidden scroll-smooth mx-auto max-md:px-5 max-md:gap-2 max-md:items-start">
          <AnimeCarousel animes={animes} itemsPerPage={itemsPerPage} loading={showSkeleton} />
        </div>
      </div>
    </div>
  );
};

export default AnimeCarouselByDay;