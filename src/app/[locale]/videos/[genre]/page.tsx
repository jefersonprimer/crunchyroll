"use client"

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POPULAR_ANIMES } from "@/lib/queries/getPopularAnimes";
import { GET_LATEST_RELEASES } from "@/lib/queries/getLatestReleases";
import AnimeCarouselGenre from "../../../components/carousel/AnimeCarouselGenre";
import Link from "next/link";
import styles from "./styles.module.css";
import { useTranslations } from "next-intl";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";

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
      <Header />
      <div className={styles.mainContainer}>
        <h1 className={styles.mainTitle}>{t('title', { genre: genreInfo.pt })}</h1>
        {/* AnimeCarousel para Populares do gênero */}
        {filteredPopularAnimes.length > 0 && (
          <div>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{t('popular')}</h3>
              <Link href={`/videos/${genre}/popular`} className={styles.viewAll}>
                {t('viewAll')}
              </Link>
            </div>
            <AnimeCarouselGenre animes={filteredPopularAnimes} />
          </div>
        )}
        {/* AnimeCarousel para Novidades do gênero */}
        {filteredNewAnimes.length > 0 && (
          <div>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{t('newReleases')}</h3>
              <Link href={`/videos/${genre}/new`} className={styles.viewAll}>
                {t('viewAll')}
              </Link>
            </div>
            <AnimeCarouselGenre animes={filteredNewAnimes} />
          </div>
        )}
        {/* AnimeCarousel para os outros gêneros */}
        <div>
          {otherGenresAnimes.map(({ genre, genreKey, animes }) => (
            <div key={genre}>
              <div className={styles.sectionHeader}>
                <h3>{genre}</h3>
                <Link href={`/videos/${genreKey}`} className={styles.viewAll}>
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