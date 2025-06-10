"use client";

import Loading from "@/app/loading";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "@/lib/queries/getMovie";
import styles from "./MovieCard.module.css"
import AnimeCarousel from "../carousel/AnimeCarousel";
import { Anime } from "@/types/anime";

import { useState, useEffect } from "react";

interface MovieCardProps {
  itemsPerPage?: number;
  className?: string; // Propriedade opcional
}

const MovieCard: React.FC<MovieCardProps> = ({
  itemsPerPage = 5,
}) => {
  const { data, loading, error } = useQuery(GET_MOVIES);
  const [movie, setMovie] = useState<Anime[]>([]);

  useEffect(() => {
    if (data?.movie) {
      setMovie(data.movie);
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  if (movie.length === 0) {
    return <div></div>;
  }

  return (
    <div className="movie-card">
      <h1 className={styles.titulo}>
        Uma amostra da temporada de outubro de 2024
      </h1>
      <p className={styles.subtitulo}>
        Assista os três primeiros episódios desses simulcasts de outubro de
        2024 de graça!
      </p>
      <AnimeCarousel animes={movie} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default MovieCard;
