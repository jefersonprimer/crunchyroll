"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import { Anime } from "@/types/anime";
import Link from "next/link";
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import { FavoritesProvider } from "../../contexts/FavoritesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { useFavorites } from "../../contexts/FavoritesContext";
import MaturityRating from "../../components/utils/elements/SmallMaturityRating";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { useDropdown } from "@/hooks/useDropdown";
import Loading from "@/app/loading";

type AudioFilter = "ALL" | "Subtitled" | "Dubbed";

const AnimeList = () => {
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [activeLetter, setActiveLetter] = useState<string>("#");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [audioFilter, setAudioFilter] = useState<AudioFilter>("ALL");
  const { activeDropdown, toggleDropdown } = useDropdown();
  const router = useRouter();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  
  const { data, loading, error } = useQuery(GET_ANIMES);

  useEffect(() => {
    if (data?.animes) {
      let filtered = data.animes;
      
      // Apply letter filter
      if (activeLetter !== "#") {
        filtered = filtered.filter(
          (anime: Anime) => anime.name[0].toUpperCase() === activeLetter.toUpperCase()
        );
      }
      
      // Apply audio filter
      if (audioFilter !== "ALL") {
        filtered = filtered.filter((anime: Anime) => {
          return anime.audioType === audioFilter;
        });
      }
      
      setFilteredAnimes(filtered);
    }
  }, [data, activeLetter, audioFilter]);

  const handleFavoriteClick = (e: React.MouseEvent, anime: Anime) => {
    e.preventDefault();
    const isFavorited = favorites.some((fav) => fav.id === anime.id);
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  // Função para filtrar os animes por letra
  const handleLetterClick = (letter: string) => {
    setActiveLetter(letter);

    if (letter === "#") {
      setFilteredAnimes(data?.animes || []); // Mostra todos os animes
    } else {
      const filtered = data?.animes.filter(
        (anime: Anime) => anime.name[0].toUpperCase() === letter.toUpperCase()
      );
      setFilteredAnimes(filtered || []);
    }
  };

  // Função para ativar/desativar o menu de filtros
  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  // Funções para navegação por filtros
  const goToPopular = () => {
    router.push("/videos/popular");
  };

  const goToNewReleases = () => {
    router.push("/videos/new");
  };

  const goToAlphabeticOrder = () => {
    router.push("/videos/alphabetical");
  };

  const handleAudioFilter = (filter: AudioFilter) => {
    setAudioFilter(filter);
    toggleDropdown(null);
  };

  // Geração de letras para o filtro
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  if (loading) return <Loading/>;
  if (error) return <div className={styles.error}>{error.message}</div>;

  return (
    <div>
      <Header/>
      <div className={styles.glossaryContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Ver Todos os Animes</h1>
          {/* Filtro de Ordem Alfabética e as opções */}
          <div className={styles.filtersContainer}>
            <div className={styles.filters}>
              <div onClick={toggleFilterOptions} className={styles.svgBtn}>
                <svg
                  className={styles.svgIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-labelledby="sort-svg"
                  aria-hidden="true"
                  role="img"
                >
                  <title id="sort-svg">Ordenar</title>
                  <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z"></path>
                </svg>
                <span className={styles.ordemAlfabetica}>ORDEM ALFÁBETICA</span>
              </div>
              {showFilterOptions && (
                <div className={styles.filterOptions}>
                  <div onClick={goToPopular} className={styles.item}>
                    Mais Populares
                  </div>
                  <div onClick={goToNewReleases} className={styles.item}>
                    Mais Recentes
                  </div>
                  <div onClick={goToAlphabeticOrder} className={styles.item}>
                    Ordem Alfabética
                  </div>
                </div>
              )}
            </div>
            <div className={styles.filters}>
              <div
                onClick={() => toggleDropdown('audio')}
                className={`${styles.svgBtn} ${activeDropdown === 'audio' ? styles.active : ''}`}
              >
                <svg
                  className={styles.svgIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="filter-svg"
                  aria-labelledby="filter-svg"
                  aria-hidden="true"
                  role="img">
                  <path fillRule="evenodd" d="M9 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2M3 8a1 1 0 0 1 0-2h2.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21a1 1 0 0 1 0 2h-8.142c-.447 1.72-2 3-3.858 3S5.589 9.72 5.142 8H3zm12 11c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2zm6-3a1 1 0 0 1 0 2h-2.142c-.447 1.72-2 3-3.858 3s-3.411-1.28-3.858-3H3a1 1 0 0 1 0-2h8.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21z">
                  </path>
                </svg>
                <span className={styles.maisPopulares}>FILTRAR</span>
              </div>
              {activeDropdown === 'audio' && (
                <div className={styles.filterOptions}>
                  <span className={styles.idioma}>Idioma</span>
                  <div
                    onClick={() => handleAudioFilter("ALL")}
                    className={styles.item}
                    data-selected={audioFilter === "ALL"}
                  >
                    <span className={styles.radioButton}></span>
                    Todos
                  </div>
                  <div
                    onClick={() => handleAudioFilter("Subtitled")}
                    className={styles.item}
                    data-selected={audioFilter === "Subtitled"}
                  >
                    <span className={styles.radioButton}></span>
                    Legendados
                  </div>
                  <div
                    onClick={() => handleAudioFilter("Dubbed")}
                    className={styles.item}
                    data-selected={audioFilter === "Dubbed"}
                  >
                    <span className={styles.radioButton}></span>
                    Dublados
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Filtro de letras */}
        <div className={styles.letterFilter}>
          <button
            className={activeLetter === "#" ? styles.activeLetter : ""}
            onClick={() => handleLetterClick("#")}
          >
            #
          </button>
          {letters.map((letter) => (
            <button
              key={letter}
              className={activeLetter === letter ? styles.activeLetter : ""}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className={styles.carousel}>
          {filteredAnimes.length > 0 ? (
            filteredAnimes.map((anime) => {
              const isFavorited = favorites.some((fav) => fav.id === anime.id);
              const firstEpisode = anime.episodes?.[0];
      
              return (
                <div
                  key={anime.id}
                  className={styles.anime_card}
                  onMouseEnter={() => setHoveredCard(anime.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Link href={`/series/${anime.publicCode}/${anime.slug}`}>
                    <div className={styles.anime_content} title={anime.name}>
                      <div className={styles.imageContainer}>
                        <img
                          src={anime.imageCardCompact}
                          alt={anime.name}
                          className={styles.anime_image}
                        />
                        {isFavorited && (
                          <div className={styles.favoriteLabel}>
                            <FontAwesomeIcon icon={bookmarkSolid} />
                          </div>
                        )}
                        <div className={styles.ratingContainer}>
                          <MaturityRating rating={Number(anime.rating)} />
                        </div>
                      </div>
                      <div className={styles.anime_details}>
                        <h3 className={styles.anime_name}>{anime.name}</h3>
                        <p className={styles.anime_synopsis}>{anime.synopsis}</p>
                        <p className={styles.anime_audio}>{anime.audioType}</p>
                        {hoveredCard === anime.id && (
                          <div className={styles.cardInfo}>
                            <h3 className={styles.name}>{anime.name}</h3>
                            <div className={styles.infoText}>
                              <div className={styles.flexContainer}>
                                <span className={styles.score}>
                                  {anime.score}
                                </span>
                                <svg className={styles.iconStar} 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  viewBox="0 0 24 24" 
                                  data-t="star-svg" 
                                  aria-labelledby="star-svg" 
                                  aria-hidden="false" 
                                  role="img"
                                  fill="#f1f1f1"
                                >
                                  <title id="star-svg">Avaliação</title>
                                  <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z">
                                  </path>
                                </svg>
                              </div>
                            </div>
                            <p className={styles.synopsis}>{anime.synopsis}</p>
                            <div className={styles.playButton}>
                              <div className={styles.tooltip}>
                                <span className={styles.tooltipText}>Play</span>
                                {firstEpisode ? (
                                  <div onClick={(e) => {
                                    e.preventDefault();
                                    router.push(`/watch/${firstEpisode.id}/${firstEpisode.slug}`);
                                  }}>
                                    <svg className={styles.iconPlay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                      <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
                                    </svg>
                                  </div>
                                ) : (
                                  <span>
                                    <svg className={styles.iconPlay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                      <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
                                    </svg>
                                  </span>
                                )}
                              </div>
                              <div className={styles.tooltip} onClick={(e) => handleFavoriteClick(e, anime)}>
                                <span className={styles.tooltipText}>
                                  {isFavorited ? "Remover da Fila" : "Adicionar à Fila"}
                                </span>
                                <FontAwesomeIcon
                                  icon={isFavorited ? bookmarkSolid : bookmarkOutline}
                                  style={{ color: "#FF640A", transition: "color 0.3s ease-in-out" }}
                                  className={`${styles.iconBookmark} ${isFavorited ? "filled" : "outline"}`}
                                />
                              </div>
                              <div className={styles.tooltip}>
                                <span className={styles.tooltipText}>Adicionar à Primerlist</span>
                                <svg
                                  className={styles.iconPlus}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  aria-labelledby="add-svg"
                                  role="img"
                                >
                                  <title id="add-svg">Add</title>
                                  <path d="M13 3v8h8v2h-8v8h-2v-8H3v-2h8V3z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <p>Nenhum anime encontrado com a letra "{activeLetter}".</p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default function Glossary() {
  return (
    <FavoritesProvider>
      <AnimeList />
    </FavoritesProvider>
  );
}
