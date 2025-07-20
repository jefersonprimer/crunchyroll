'use client';

import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '@/lib/queries/getMovie';
import AnimeCarousel from './AnimeCarousel';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface MovieCarouselProps {
  itemsPerPage?: number;
  className?: string;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  itemsPerPage = 5,
}) => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  const t = useTranslations();
  const movies = data?.movies || [];

  const [showSkeleton, setShowSkeleton] = useState(true);
  const [loadingStart, setLoadingStart] = useState<number | null>(null);
  const MIN_SKELETON_TIME = 1000;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loading) {
      setShowSkeleton(true);
      setLoadingStart(Date.now());
    } else {
      if (loadingStart) {
        const elapsed = Date.now() - loadingStart;
        if (elapsed < MIN_SKELETON_TIME) {
          timeout = setTimeout(() => setShowSkeleton(false), MIN_SKELETON_TIME - elapsed);
        } else {
          setShowSkeleton(false);
        }
      } else {
        setShowSkeleton(false);
      }
    }
    return () => clearTimeout(timeout);
  }, [loading]);

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  return (
    <div className="w-[1351px] h-[508.89px] text-left flex flex-col items-center">
      {/* Header: mostra skeleton ou real */}
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
      {/* Cards: apenas AnimeCarousel com loading controlado por prop */}
      <div className="w-[1351px] h-[436.89px] mx-auto flex justify-center items-center relative overflow-hidden max-md:w-full">
        <div className="w-full flex items-center justify-start overflow-x-hidden scroll-smooth mx-auto max-md:px-5 max-md:gap-2 max-md:items-start">
          <AnimeCarousel animes={movies} itemsPerPage={itemsPerPage} loading={showSkeleton} />
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;