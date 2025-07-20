"use client";

import { useQuery } from "@apollo/client";
import { GET_ANIME_OF_DAY } from "@/lib/queries/getAnimeOfTheDay";
import { Anime } from "@/types/anime";
import AnimeCarousel from "./AnimeCarousel";
import { useTranslations } from "next-intl";

interface AnimeCarouselByDayProps {
  itemsPerPage?: number;
}

interface GetAnimeOfTheDayData {
  animeOfTheDay: Anime | Anime[];
}

const AnimeCarouselByDay: React.FC<AnimeCarouselByDayProps> = ({
  itemsPerPage = 5
}) => {
  const t = useTranslations("carousels.animeOfTheDay");
  const { loading, error, data } = useQuery<GetAnimeOfTheDayData>(GET_ANIME_OF_DAY);
  
  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  if (!data?.animeOfTheDay && !loading) {
    return <div></div>;
  }

  // Normalize data to always work with an array
  const animes: Anime[] = Array.isArray(data?.animeOfTheDay)
    ? data.animeOfTheDay
    : data?.animeOfTheDay
    ? [data.animeOfTheDay]
    : [];

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
    <div className="w-full max-w-[1351px] h-auto text-left flex flex-col lg:items-center">
      {loading ? (
        <div className="w-full max-w-[1223px] flex flex-col items-start justify-center mx-auto max-md:w-full max-md:px-5">
          <div className="h-8 w-[40%] mb-2 bg-[#141519] bg-[length:200%_100%] animate-[loading_1.5s_infinite]" />
          <div className="h-5 w-[40%] mb-4 bg-[#141519] bg-[length:200%_100%] animate-[loading_1.5s_infinite]" />
        </div>
      ) : (
        <div className="w-full max-w-[1223px] flex flex-col items-start justify-center my-0 lg:mx-auto px-4 lg:px-0">
          <h2 className="text-[1.74rem] lg:mb-[4px] text-[#FFFFFF] font-bold">
            {titleText}
          </h2>
          <p className="text-[0.97rem] lg:mb-[4px] text-[#A0A0A0] font-medium">
            {subtitleText}
          </p>
        </div>
      )}
     
      <div className="w-full max-w-[1351px] h-auto mx-auto flex justify-center items-center relative overflow-hidden">
        <div className="w-full flex items-center justify-start overflow-x-hidden scroll-smooth mx-auto">
          <AnimeCarousel animes={animes} itemsPerPage={itemsPerPage} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default AnimeCarouselByDay;