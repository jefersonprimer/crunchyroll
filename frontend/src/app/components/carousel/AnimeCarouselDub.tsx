'use client';

import { useQuery } from "@apollo/client";
import { GET_DUBBED_ANIMES } from "@/lib/queries/getDubbedAnimes";
import AnimeCarousel from "./AnimeCarousel";
import { useTranslations } from 'next-intl';
import { Anime } from "@/types/anime";

interface AnimeCarouselDubProps {
  itemsPerPage?: number;
}

interface GetDubbedAnimesData {
  dubbedAnimes: Anime[];
}

const AnimeCarouselDub: React.FC<AnimeCarouselDubProps> = ({
  itemsPerPage = 5,
}) => {
  const { loading, error, data } = useQuery<GetDubbedAnimesData>(GET_DUBBED_ANIMES);
  const dubbedAnimes = data?.dubbedAnimes || [];
  const t = useTranslations();

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  return (
    <div  className="w-auto lg:w-[1351px] h-auto lg:h-[508.89px] text-left flex flex-col lg:items-center">
      {loading ? (
        <div className="w-[1223px] flex flex-col items-start justify-center mx-auto max-md:w-full max-md:px-5">
          <div className="h-8 w-[40%] mb-2 bg-[#141519] bg-[length:200%_100%] animate-[loading_1.5s_infinite]" />
          <div className="h-5 w-[40%] mb-4 bg-[#141519] bg-[length:200%_100%] animate-[loading_1.5s_infinite]" />
        </div>
      ) : (
        <div className="w-auto lg:w-[1223px] flex flex-col items-start justify-center my-0 lg:mx-auto px-4 lg:px-0">
          <h2 className="text-[1.74rem] lg:mb-[4px] text-[#FFFFFF] font-bold">
            {t('carousels.dubbed.title')}
          </h2>
          <p className="text-[0.97rem] lg:mb-[4px] text-[#A0A0A0] font-medium">
            {t('carousels.dubbed.subtitle')}
          </p>
        </div>
      )}
      
      <div className="w-auto lg:w-[1351px] h-auto lg:h-[436.89px] mx-auto flex justify-center items-center relative overflow-hidden max-md:w-full">
        <div className="w-full flex items-center justify-start overflow-x-hidden scroll-smooth mx-auto">
          <AnimeCarousel animes={dubbedAnimes} itemsPerPage={itemsPerPage} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default AnimeCarouselDub;
