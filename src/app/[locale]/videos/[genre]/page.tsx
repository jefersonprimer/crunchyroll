"use client"

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POPULAR_ANIMES } from "@/lib/queries/getPopularAnimes";
import { GET_LATEST_RELEASES } from "@/lib/queries/getLatestReleases";
import AnimeCarouselGenre from "../../../components/carousel/AnimeCarouselGenre";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { ClientMetadata } from "@/app/components/metadata/ClientMetadata";
interface Genre {
  id: string;
  name: string;
}

interface Anime {
  id: string;
  slug: string;
  name: string;
  audioType?: string;
  imagePoster?: string;
  imageCardCompact?: string;
  genres?: Genre[];
  isPopular: boolean;
  isNewRelease: boolean;
}

const genreMapping: Record<string, { en: string; pt: string }> = {
  action: { en: "Action", pt: "Ação" },
  adventure: { en: "Adventure", pt: "Aventura" },
  comedy: { en: "Comedy", pt: "Comédia" },
  drama: { en: "Drama", pt: "Drama" },
  fantasy: { en: "Fantasy", pt: "Fantasia" },
  historical: { en: "Historical", pt: "Histórico" },
  "post-apocalyptic": { en: "Post-Apocalyptic", pt: "Pós-Apocalíptico" },
  "sci-fi": { en: "Sci-Fi", pt: "Ficção Científica" },
  supernatural: { en: "Supernatural", pt: "Sobrenatural" },
  thriller: { en: "Thriller", pt: "Suspense" },
  romance: { en: "Romance", pt: "Romance" },
  shonen: { en: "Shonen", pt: "Shonen" },
  shojo: { en: "Shojo", pt: "Shojo" },
};

interface GenrePageProps {
  params: Promise<{ genre: string }>;
}

const GenrePage: React.FC<GenrePageProps> = ({ params }) => {
  const t = useTranslations('genre');
  const resolvedParams = React.use(params);
  const genre = resolvedParams.genre;
  const genreInfo = genreMapping[genre];

  // Query para animes populares
  const { data: popularData, loading: popularLoading, error: popularError } = useQuery(GET_POPULAR_ANIMES);
  // Query para animes novos
  const { data: newData, loading: newLoading, error: newError } = useQuery(GET_LATEST_RELEASES);

  if (!genreInfo) {
    return <p>{t('genreNotFound', { genre })}</p>;
  }

  if (popularLoading || newLoading) return <p>{t('loading')}</p>;
  if (popularError) return <p>{t('error', { error: popularError.message })}</p>;
  if (newError) return <p>{t('error', { error: newError.message })}</p>;

  const popularAnimes = popularData?.popularAnimes || [];
  const newAnimes = newData?.latestReleases || [];

  // Filtra os animes populares pelo gênero selecionado
  const filteredPopularAnimes = popularAnimes.filter((anime: Anime) =>
    anime.genres?.some((g: Genre) => g.name === genreInfo.en)
  );

  // Filtra os animes novos pelo gênero selecionado
  const filteredNewAnimes = newAnimes.filter((anime: Anime) =>
    anime.genres?.some((g: Genre) => g.name === genreInfo.en)
  );

  // Filtra os outros gêneros
  const otherGenresAnimes = Object.entries(genreMapping)
    .filter(([key]) => key !== genre)
    .map(([key, value]) => {
      const otherGenreAnimes = popularAnimes.filter((anime: Anime) =>
        anime.genres?.some((g: Genre) => g.name === value.en)
      );
      return { genre: value.pt, genreKey: key, animes: otherGenreAnimes };
    });

  return (
    <div>
      <ClientMetadata
        title={`${genre} - Animes, Séries e Filmes - Crunchyroll`}
        description="Calendário de Transmissão Simultânea"
      />
    <Header />
    <div className="flex w-[1351px] my-0 mx-auto flex-col items-center text-center py-8 pt-[60px] px-8">
      <h1 className="text-3xl text-gray-800 m-0">
        {t('title', { genre: genreInfo.pt })}
      </h1>
  
      {/* AnimeCarousel para Populares do gênero */}
      {filteredPopularAnimes.length > 0 && (
        <div className="w-[1050px] my-0 mx-auto mb-8">
          <div className="flex justify-between items-center mb-4 gap-2.5">
            <h3 className="text-xl text-gray-600 m-0">{t('popular')}</h3>
            <Link 
              href={`/videos/${genre}/popular`} 
              className="text-base text-[#ff640a] cursor-pointer underline m-0"
            >
              {t('viewAll')}
            </Link>
          </div>
          <AnimeCarouselGenre animes={filteredPopularAnimes} />
        </div>
      )}
  
      {/* AnimeCarousel para Novidades do gênero */}
      {filteredNewAnimes.length > 0 && (
        <div className="w-[1050px] my-0 mx-auto mb-8">
          <div className="flex justify-between items-center mb-4 gap-2.5">
            <h3 className="text-xl text-gray-600 m-0">{t('newReleases')}</h3>
            <Link 
              href={`/videos/${genre}/new`} 
              className="text-base text-[#ff640a] cursor-pointer underline m-0"
            >
              {t('viewAll')}
            </Link>
          </div>
          <AnimeCarouselGenre animes={filteredNewAnimes} />
        </div>
      )}
  
      {/* AnimeCarousel para os outros gêneros */}
      <div className="w-[1050px] my-0 mx-auto">
        {otherGenresAnimes.map(({ genre, genreKey, animes }) => (
          <div key={genre} className="mb-8">
            <div className="flex justify-between items-center mb-4 gap-2.5">
              <h3 className="text-xl text-gray-600 m-0">{genre}</h3>
              <Link 
                href={`/videos/${genreKey}`} 
                className="text-base text-[#ff640a] cursor-pointer underline m-0"
              >
                {t('viewAll')}
              </Link>
            </div>
            <AnimeCarouselGenre animes={animes} />
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default GenrePage;