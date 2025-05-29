'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from '@/lib/queries/getAnimes';
import AnimeCarouselGenre from '../../../components/carousel/AnimeCarouselGenre';
import styles from './styles.module.css';

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

const GenreNewPage: React.FC = () => {
  const params = useParams();
  const genre = params.genre as string;
  const genreInfo = genreMapping[genre];
  const { data, loading, error } = useQuery(GET_ANIMES);

  if (!genreInfo) {
    return <p>Gênero "{genre}" não encontrado.</p>;
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro: {error.message}</p>;

  const animes = data?.animes || [];

  // Filtra os animes pelo gênero selecionado
  const filteredAnimes = animes.filter((anime: Anime) =>
    anime.genres?.some((g: Genre) => g.name === genreInfo.en)
  );

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.mainTitle}>Todos os Animes de {genreInfo.pt}</h1>
      <AnimeCarouselGenre animes={filteredAnimes} />
    </div>
  );
};

export default GenreNewPage;
