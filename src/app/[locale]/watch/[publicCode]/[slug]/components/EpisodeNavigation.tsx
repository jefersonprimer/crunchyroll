import { useTranslations } from 'next-intl';
import { useRouter, useParams } from "next/navigation";
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

  console.log('Current Episode:', currentEpisode);
  console.log('All Episodes:', allEpisodes);
  console.log('Anime:', anime);

  // Filtra todos os episódios do anime e ordena por número
  const allAnimeEpisodes = [...allEpisodes]
    .sort((a, b) => getEpisodeNumber(a.title) - getEpisodeNumber(b.title));

  console.log('Sorted Episodes:', allAnimeEpisodes);

  // Encontra o índice do episódio atual na lista completa
  const currentIndex = allAnimeEpisodes.findIndex(
    (ep) => ep?.title === currentEpisode?.title
  );

  console.log('Current Index:', currentIndex);

  // Verifica se é o último episódio
  const isLastEpisode = currentIndex === allAnimeEpisodes.length - 1;

  // Episódio anterior
  const prevEpisode =
    currentIndex > 0 ? allAnimeEpisodes[currentIndex - 1] : null;

  // Próximo episódio
  const nextEpisode = !isLastEpisode ? allAnimeEpisodes[currentIndex + 1] : null;

  console.log('Previous Episode:', prevEpisode);
  console.log('Next Episode:', nextEpisode);

  const t = useTranslations('EpisodeNavigation');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
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
          href={`/${locale}/watch/${episode.publicCode}/${episode.slug}`}
          className={styles.cardLink}
        >
          <div className={styles.cardContainer}>
            {/* Image with overlays */}
            <div className={styles.imageWrapper}>
              <MaturityRating rating={Number(anime.rating) || 0} size={4} />
              <img
                src={episode.image}
                alt={episode.title}
                className={styles.episodeImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/300x169";
                }}
              />
              <div className={styles.durationBadge}>
                {episode.duration}
              </div>
              {/* Play button */}
              <div className={styles.playIconContainer}>
                <svg
                  className={styles.playIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="play-filled-svg"
                  aria-labelledby="play-filled-svg"
                  aria-hidden="true"
                  role="img"
                >
                  <path d="m4 2 16 10L4 22z" />
                </svg>
              </div>
            </div>

            {/* Text content */}
            <div className={styles.textContent}>
              <h4 className={styles.episodeTitle}>{episode.title}</h4>
              <h4 className={styles.audioType}>{t(`audioTypes.${anime.audioType}`)}</h4>
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
          <EpisodeCard episode={prevEpisode} label={t('previousEpisode')} />
        )}

        {/* Mostra o próximo episódio apenas se não for o último */}
        {!isLastEpisode && nextEpisode && (
          <EpisodeCard episode={nextEpisode} label={t('nextEpisode')} />
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
        {t('seeMoreEpisodes')}
      </button>
    </div>
  );
};

export default EpisodeNavigation;
