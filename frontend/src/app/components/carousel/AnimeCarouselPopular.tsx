'use client';

import { useQuery } from '@apollo/client';
import { GET_POPULAR_ANIMES } from '@/lib/queries/getPopularAnimes';
import AnimeCarousel from "./AnimeCarousel";
import { useTranslations } from "next-intl"; 

interface AnimeCarouselPopularProps {
  itemsPerPage?: number;
}

const AnimeCarouselPopular: React.FC<AnimeCarouselPopularProps> = ({
  itemsPerPage = 5,
}) => {
  const { loading, error, data } = useQuery(GET_POPULAR_ANIMES);
  const popularAnimes = data?.popularAnimes || [];
  const t = useTranslations();

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  return (
    <div className="w-full max-w-[1351px] h-auto text-left flex flex-col lg:items-center z-20 relative">
      {loading ? (
        <div className="w-full max-w-[1223px] flex flex-col items-start justify-center mx-auto max-md:w-full max-md:px-5">
          <div className="h-8 w-[40%] mb-2 bg-[#141519] bg-[length:200%_100%] animate-[loading_1.5s_infinite]" />
          <div className="h-5 w-[40%] mb-4 bg-[#141519] bg-[length:200%_100%] animate-[loading_1.5s_infinite]" />
        </div>
      ) : (
        <div className="w-full max-w-[1223px] flex flex-col items-start justify-center my-0 lg:mx-auto px-4 lg:px-0">
          <h2 className="text-[1.375rem] sm:text-[1.75rem] lg:mb-[4px] text-white font-bold">
            {t('carousels.popular.title')}
          </h2>
          <p className="text-sm sm:text-base lg:mb-[4px] text-[#A0A0A0] font-medium">
            {t('carousels.popular.subtitle')}
          </p>
        </div>
      )}
      <div className="w-full max-w-[1351px] h-auto mx-auto flex justify-center items-center relative overflow-hidden">
        <div className="w-full flex items-center justify-start overflow-x-hidden scroll-smooth mx-auto">
          <AnimeCarousel animes={popularAnimes} itemsPerPage={itemsPerPage} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default AnimeCarouselPopular;
