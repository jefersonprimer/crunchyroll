'use client';

import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '@/lib/queries/getMovie';
import AnimeCarousel from './AnimeCarousel';
import { useTranslations } from 'next-intl';

interface MovieCarouselProps {
  itemsPerPage?: number;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  itemsPerPage = 5,
}) => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  const t = useTranslations();
  const movies = data?.movies || [];

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  return (
    <div className="w-[1351px] h-[508.89px] text-left flex flex-col items-center">
      {loading ? (
        <div className="w-[1223px] flex flex-col items-start justify-center mx-auto max-md:w-full max-md:px-5">
          <div className="h-8 w-[40%] mb-2 bg-[#141519] bg-[length:200%_100%] animate-[loading_1.5s_infinite]" />
          <div className="h-5 w-[40%] mb-4 bg-[#141519] bg-[length:200%_100%] animate-[loading_1.5s_infinite]" />
        </div>
      ) : (
        <div className="w-[1223px] flex flex-col items-start justify-center my-0 mx-auto">
          <h2 className="text-[1.74rem] mb-[4px] text-[#FFFFFF] font-bold">
            {t('carousels.movies.title')}
          </h2>
          <p className="text-[0.97rem] mb-[4px] text-[#A0A0A0] font-medium">
            {t('carousels.movies.subtitle')}
          </p>
        </div>
      )}
      <div className="w-[1351px] h-[436.89px] mx-auto flex justify-center items-center relative overflow-hidden max-md:w-full">
        <div className="w-full flex items-center justify-start overflow-x-hidden scroll-smooth mx-auto max-md:px-5 max-md:gap-2 max-md:items-start">
          <AnimeCarousel animes={movies} itemsPerPage={itemsPerPage} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;