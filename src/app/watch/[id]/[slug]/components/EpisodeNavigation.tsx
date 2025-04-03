import Link from "next/link";
import { Episode, Anime } from "../types/types";
import styles from "./EpisodeNavigation.module.css";
import { FaPlay } from "react-icons/fa";
import MaturityRating from "@/app/components/elements/MaturityRating";

interface EpisodeNavigationProps {
  currentEpisode: Episode;
  allEpisodes: Episode[];
  anime: Anime;
  onShowAllEpisodes: () => void;
  selectedSeason?: number;
}

const EpisodeNavigation: React.FC<EpisodeNavigationProps> = ({
  currentEpisode,
  allEpisodes = [],
  anime,
  onShowAllEpisodes,
  selectedSeason,
}) => {
  // Função para extrair número do episódio do título
  const getEpisodeNumber = (title: string) => {
    const match = title?.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  // Filtra todos os episódios do anime e ordena por temporada e número
  const allAnimeEpisodes = [...allEpisodes]
    .filter((ep) => ep.animeId === anime.id)
    .sort((a, b) => {
      if (a.season !== b.season) return a.season - b.season;
      return getEpisodeNumber(a.title) - getEpisodeNumber(b.title);
    });

  // Encontra o índice do episódio atual na lista completa
  const currentIndex = allAnimeEpisodes.findIndex(
    (ep) => ep?.id === currentEpisode?.id
  );

  // Verifica se é o último episódio de TODAS as temporadas
  const isLastEpisode = currentIndex === allAnimeEpisodes.length - 1;

  // Episódio anterior (pode ser da mesma temporada ou da anterior)
  const prevEpisode =
    currentIndex > 0 ? allAnimeEpisodes[currentIndex - 1] : null;

  // Próximo episódio (só mostra se não for o último)
  let nextEpisode = null;
  if (!isLastEpisode) {
    // Verifica se há próximo episódio na mesma temporada
    if (
      currentIndex < allAnimeEpisodes.length - 1 &&
      allAnimeEpisodes[currentIndex + 1]?.season === currentEpisode.season
    ) {
      nextEpisode = allAnimeEpisodes[currentIndex + 1];
    }
    // Se não houver, verifica se há uma próxima temporada
    else {
      const nextSeason = currentEpisode.season + 1;
      const firstEpisodeOfNextSeason = allAnimeEpisodes.find(
        (ep) => ep.season === nextSeason && getEpisodeNumber(ep.title) === 1
      );

      if (firstEpisodeOfNextSeason) {
        nextEpisode = firstEpisodeOfNextSeason;
      }
    }
  }

  // Episode card component
  const EpisodeCard: React.FC<{ episode: Episode | null; label: string }> = ({
    episode,
    label,
  }) => {
    if (!episode) return null;

    return (
      <div className={styles.navigationCard}>
        <h3 className={styles.cardLabel}>{label}</h3>
        <Link
          href={`/watch/${episode.id}/${episode.slug}`}
          className={styles.cardLink}
        >
          <div className={styles.cardContainer}>
            {/* Image with overlays */}
            <div className={styles.imageWrapper}>
              <img
                src={episode.image}
                alt={episode.title}
                className={styles.episodeImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/300x169";
                }}
              />

              {/* Rating badge */}
              {anime.rating && (
                <div className={styles.ratingBadge}>
                  <MaturityRating rating={anime.rating} />
                </div>
              )}

              {/* Play button */}
              <div className={styles.playButton}>
                <FaPlay className={styles.playIcon} />
              </div>

              {/* Duration badge */}
              {episode.duration && (
                <div className={styles.durationBadge}>{episode.duration}</div>
              )}
            </div>

            {/* Text content */}
            <div className={styles.textContent}>
              <h4 className={styles.episodeTitle}>{episode.title}</h4>
              {anime.audioType && (
                <span className={styles.audioType}>{anime.audioType}</span>
              )}
              {episode.season !== currentEpisode.season && (
                <span className={styles.seasonBadge}>
                  Season {episode.season}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* Previous and next episodes */}
      <div className={styles.episodesContainer}>
        {prevEpisode && (
          <EpisodeCard episode={prevEpisode} label="Previous Episode" />
        )}

        {/* Mostra o próximo episódio apenas se não for o último */}
        {!isLastEpisode && nextEpisode && (
          <EpisodeCard episode={nextEpisode} label="NEXT EPISODE" />
        )}
      </div>

      {/* All episodes button */}
      <button onClick={onShowAllEpisodes} className={styles.allEpisodesButton}>
        <span>
          <svg
            className={styles.btnMoreContentIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-t="episodes-svg"
            aria-labelledby="episodes-svg"
            aria-hidden="true"
            role="img"
            fill="#FFFFFF"
          >
            <title id="episodes-svg">More content</title>
            <path d="M21 10a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1v-9a1 1 0 011-1h18zm-1 2H4v7h16v-7zm0-5a1 1 0 010 2H4a1 1 0 110-2h16zm-2-3a1 1 0 010 2H6a1 1 0 110-2h12z"></path>
          </svg>
        </span>
        SEE MORE EPISODES
      </button>
    </div>
  );
};

export default EpisodeNavigation;
