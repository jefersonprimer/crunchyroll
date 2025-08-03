import { useTranslations } from 'next-intl';
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Episode, Anime } from "../types/types";
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
  const getEpisodeNumber = (title: string) => {
    const match = title?.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const allAnimeEpisodes = [...allEpisodes]
    .sort((a, b) => getEpisodeNumber(a.title) - getEpisodeNumber(b.title));

  const currentIndex = allAnimeEpisodes.findIndex(
    (ep) => ep?.title === currentEpisode?.title
  );

  const isLastEpisode = currentIndex === allAnimeEpisodes.length - 1;
  const prevEpisode = currentIndex > 0 ? allAnimeEpisodes[currentIndex - 1] : null;
  const nextEpisode = !isLastEpisode ? allAnimeEpisodes[currentIndex + 1] : null;

  const t = useTranslations('EpisodeNavigation');
  const params = useParams();
  const locale = params.locale as string;

  const EpisodeCard: React.FC<{ episode: Episode | null; label: string }> = ({
    episode,
    label,
  }) => {
    if (!episode) return null;

    return (
      <div className="overflow-hidden">
        <h3 className="text-sm text-white font-bold m-1 uppercase">{label}</h3>
        <Link
          href={`/${locale}/watch/${episode.publicCode}/${episode.slug}`}
          className="no-underline text-inherit"
        >
          <div className="flex gap-4 p-1 hover:bg-[#23252B]">
            <div className="relative w-40 min-w-[160px] h-[90px] overflow-hidden flex-shrink-0">
              <div className="absolute top-1 left-1 z-10">
                <MaturityRating rating={Number(anime.rating) || 0} size={4} />
              </div>
              <img
                src={episode.image}
                alt={episode.title}
                className="w-full h-full object-cover transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/300x169";
                }}
              />
              <div className="absolute bottom-1 right-1 bg-black/60 text-white px-1 text-xs">
                {episode.duration}
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 rounded-full flex items-center justify-center z-20">
                <svg
                  className="w-6 h-6 fill-white"
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

            <div className="flex flex-col justify-center">
              <h4 className="m-0 text-sm font-medium text-white mb-2">{episode.title}</h4>
              <h4 className="text-sm text-[#A0A0A0]">{t(`audioTypes.${anime.audioType}`)}</h4>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[800px] mx-auto p-0">
      <div className="flex flex-col gap-6 mb-4">
        {prevEpisode && (
          <EpisodeCard episode={prevEpisode} label={t('previousEpisode')} />
        )}

        {!isLastEpisode && nextEpisode && (
          <EpisodeCard episode={nextEpisode} label={t('nextEpisode')} />
        )}
      </div>

      <button
        onClick={onShowAllEpisodes}
        className="flex items-center justify-center gap-1 py-1.5 px-3 text-white border border-white text-base cursor-pointer transition-colors duration-200 m-1 hover:bg-[#444]"
      >
        <span>
          <svg
            className="w-6 h-6 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-t="episodes-svg"
            aria-labelledby="episodes-svg"
            aria-hidden="true"
            role="img"
          >
            <title id="episodes-svg">More content</title>
            <path d="M21 10a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1v-9a1 1 0 011-1h18zm-1 2H4v7h16v-7zm0-5a1 1 0 010 2H4a1 1 0 110-2h16zm-2-3a1 1 0 010 2H6a1 1 0 110-2h12z"></path>
          </svg>
        </span>
        <span className="uppercase">{t('seeMoreEpisodes')}</span>
      </button>
    </div>
  );
};

export default EpisodeNavigation;