"use client";

import Loading from "@/app/loading";
import { useQuery } from "@apollo/client";
import { GET_ANIME_OF_DAY } from "@/lib/queries/getAnimeOfTheDay";
import { Anime } from "@/types/anime";
import AnimeCarousel from "./AnimeCarousel";
import styles from "./AnimeCarouselByDay.module.css";

interface AnimeCarouselByDayProps {
  itemsPerPage?: number;
  className?: string;
}

interface GetAnimeOfTheDayData {
  animeOfTheDay: Anime | Anime[]; // Pode ser um único anime ou um array
}

const AnimeCarouselByDay: React.FC<AnimeCarouselByDayProps> = ({
  itemsPerPage = 5,
  className = "",
}) => {
  const { loading, error, data } = useQuery<GetAnimeOfTheDayData>(GET_ANIME_OF_DAY);
  
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  if (!data?.animeOfTheDay) {
    return <div className={styles.noAnimes}>Nenhum anime programado para hoje.</div>;
  }

  // Normaliza os dados para sempre trabalhar com um array
  const animes: Anime[] = Array.isArray(data.animeOfTheDay) 
    ? data.animeOfTheDay 
    : [data.animeOfTheDay];

  if (animes.length === 0) {
    return <div className={styles.noAnimes}>Nenhum anime programado para hoje.</div>;
  }

  // Verifica o dia a partir do primeiro anime (assumindo que todos têm o mesmo airingDay)
  const airingDay = animes[0].airingDay;

  // Texto condicional baseado na quantidade de animes
  const titleText = animes.length === 1 
    ? `Anime de Hoje (${airingDay})` 
    : `Animes de Hoje (${airingDay})`;

  return (
    <div className={`${styles.dayContainer} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.titulo}>{titleText}</h2>
        <p className={styles.subtitulo}>
          Confira {animes.length === 1 ? "o anime" : "os animes"} que {animes.length === 1 ? "está" : "estão"} sendo exibido{animes.length === 1 ? "" : "s"} hoje!
        </p>
      </div>
      <AnimeCarousel animes={animes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselByDay;