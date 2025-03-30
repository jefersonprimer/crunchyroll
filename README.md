"use client";

import { FC, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTh,
  faChevronRight,
  faChevronLeft,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import useFetchAnimes from "../../../hooks/useFetchAnimes";
import useFetchEpisodes from "../../../hooks/useFetchEpisodes";
import VideoPlayer from "../../../components/video/VideoPlayer";

import styles from "./styles.module.css";

import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";

const EpisodePage: FC = () => {
  const { id, slug } = useParams();
  const [expandedSynopsis, setExpandedSynopsis] = useState(false);
  const [showEpisodesModal, setShowEpisodesModal] = useState(false);

  // Função para extrair o número do episódio do título
  const extractEpisodeNumber = (title: string): number => {
    const match = title.match(/Episódio (\d+)/i) || title.match(/Ep (\d+)/i);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Função para lidar com arrays potencialmente não definidos
  const safeJoin = (
    array: any[] | undefined | null,
    separator: string = ", "
  ) => {
    return array && Array.isArray(array)
      ? array.join(separator)
      : "Não disponível";
  };

  // Use hooks to fetch data
  const { animes, loading: animesLoading } = useFetchAnimes();
  const { episodes, loading: episodesLoading } = useFetchEpisodes();

  // Handle loading state
  if (!id || !slug || animesLoading || episodesLoading) {
    return <div className={styles.loadingContainer}>Carregando...</div>;
  }

  // Find the current episode
  const episode = episodes.find((ep: Episode) => ep.id === id);
  if (!episode)
    return (
      <div className={styles.errorContainer}>Episódio não encontrado.</div>
    );

  // Find the anime
  const anime = animes.find((anime: Anime) => anime.id === episode.animeId);
  if (!anime)
    return <div className={styles.errorContainer}>Anime não encontrado.</div>;

  // Get all episodes for this anime
  const animeEpisodes = episodes
    .filter((ep: Episode) => ep.animeId === anime.id)
    .sort((a: Episode, b: Episode) => {
      const aNum = extractEpisodeNumber(a.title);
      const bNum = extractEpisodeNumber(b.title);
      return aNum - bNum;
    });

  // Find current episode index
  const episodeIndex = animeEpisodes.findIndex(
    (ep: Episode) => ep.id === episode.id
  );

  // Previous and next episodes
  const prevEpisode = episodeIndex > 0 ? animeEpisodes[episodeIndex - 1] : null;
  const nextEpisode =
    episodeIndex < animeEpisodes.length - 1
      ? animeEpisodes[episodeIndex + 1]
      : null;

  const toggleSynopsis = () => {
    setExpandedSynopsis(!expandedSynopsis);
  };

  const toggleEpisodesModal = () => {
    setShowEpisodesModal(!showEpisodesModal);
  };

  return (
    <div className={styles.episodePage}>
      {/* Full-width Video Player Section */}
      <div className={styles.videoPlayerContainer}>
        <div className={styles.videoWrapper}>
          <VideoPlayer
            videoUrl={episode.videoUrl}
            posterImage={episode.image}
          />
        </div>

        <div className={styles.episodeNavigation}>
          <Link
            href={
              prevEpisode ? `/watch/${prevEpisode.id}/${prevEpisode.slug}` : "#"
            }
            className={`${styles.navButton} ${
              !prevEpisode ? styles.disabled : ""
            }`}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Anterior
          </Link>
          <Link
            href={`/series/${anime.id}/${anime.slug}`}
            className={styles.detailsButton}
          >
            <FontAwesomeIcon icon={faTh} size="lg" /> Detalhes
          </Link>
          <Link
            href={
              nextEpisode ? `/watch/${nextEpisode.id}/${nextEpisode.slug}` : "#"
            }
            className={`${styles.navButton} ${
              !nextEpisode ? styles.disabled : ""
            }`}
          >
            Próximo <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
      </div>

      {/* Content Section with Two Columns */}
      <div className={styles.contentColumns}>
        {/* Left Column: Name and Synopsis */}
        <div className={styles.leftColumn}>
          <h1 className={styles.animeTitle}>
            {anime.name} - {episode.title}
          </h1>

          <div className={styles.synopsisContainer}>
            <div
              className={`${styles.synopsisWrapper} ${
                expandedSynopsis ? styles.expanded : ""
              }`}
            >
              <div className={styles.synopsisColumns}>
                <div className={styles.synopsisColumn}>
                  <p>{anime.synopsis || "Sinopse não disponível"}</p>
                </div>
                <div className={styles.synopsisColumn}>
                  <div className={styles.metadata}>
                    {/* Áudio */}
                    <div className={styles.metadataItem}>
                      <strong>Áudio:</strong>
                      <span>{anime.audio || "Não disponível"}</span>
                    </div>

                    {/* Legendas */}
                    <div className={styles.metadataItem}>
                      <strong>Legendas:</strong>
                      <span>{safeJoin(anime.subtitles)}</span>
                    </div>

                    {/* Classificação */}
                    <div className={styles.metadataItem}>
                      <strong>Classificação:</strong>
                      <span>
                        {anime.rating ? `${anime.rating}+` : "Não classificado"}
                        {anime.contentAdvisory
                          ? ` (${safeJoin(anime.contentAdvisory)})`
                          : ""}
                      </span>
                    </div>

                    {/* Gêneros */}
                    <div className={styles.metadataItem}>
                      <strong>Gêneros:</strong>
                      <span>{safeJoin(anime.genres)}</span>
                    </div>

                    {/* Baseado em */}
                    <div className={styles.metadataItem}>
                      <strong>Baseado em:</strong>
                      <span>
                        {anime.based?.source === "original"
                          ? "Obra original"
                          : anime.based?.source && anime.based?.title
                          ? `${anime.based.source} "${anime.based.title}"`
                          : "Não especificado"}
                        {anime.based?.authors
                          ? ` por ${safeJoin(anime.based.authors)}`
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={toggleSynopsis}
                className={styles.moreDetailsButton}
                aria-expanded={expandedSynopsis}
              >
                {expandedSynopsis ? "MENOS DETALHES" : "MAIS DETALHES"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Episodes Navigation */}
        <div className={styles.rightColumn}>
          <div className={styles.nextEpisodeSection}>
            <h2>Próximo Episódio</h2>
            {nextEpisode ? (
              <div className={styles.episodeCard}>
                <img
                  src={
                    nextEpisode.image || "https://via.placeholder.com/300x169"
                  }
                  alt={nextEpisode.title}
                  className={styles.episodeImage}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/300x169";
                  }}
                />
                <div className={styles.episodeInfo}>
                  <h3>{nextEpisode.title}</h3>
                  <Link
                    href={`/watch/${nextEpisode.id}/${nextEpisode.slug}`}
                    className={styles.watchButton}
                  >
                    <FontAwesomeIcon icon={faPlay} /> Assistir
                  </Link>
                </div>
              </div>
            ) : (
              <p>Não há próximos episódios disponíveis.</p>
            )}

            <button
              onClick={toggleEpisodesModal}
              className={styles.seeAllButton}
            >
              Ver Todos os Episódios
            </button>
          </div>
        </div>
      </div>

      {/* Episodes Modal */}
      {showEpisodesModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Todos os Episódios</h2>
              <button
                onClick={toggleEpisodesModal}
                className={styles.closeButton}
              >
                &times;
              </button>
            </div>
            <div className={styles.episodesGrid}>
              {animeEpisodes.map((ep: Episode) => (
                <Link
                  key={ep.id}
                  href={`/watch/${ep.id}/${ep.slug}`}
                  className={`${styles.episodeGridItem} ${
                    ep.id === episode.id ? styles.currentEpisode : ""
                  }`}
                >
                  <div className={styles.episodeGridCard}>
                    <img
                      src={ep.image || "https://via.placeholder.com/300x169"}
                      alt={ep.title}
                      className={styles.episodeGridImage}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/300x169";
                      }}
                    />
                    <div className={styles.episodeGridInfo}>
                      <span className={styles.episodeNumber}>
                        Ep {extractEpisodeNumber(ep.title)}
                      </span>
                      <h3>{ep.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodePage;
