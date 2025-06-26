import { useTranslations } from 'next-intl';
import { Anime as LocalAnime, Episode as LocalEpisode } from "../types/types";
import { Anime } from "@/types/anime";
import MaturityRating from "@/app/components/elements/MaturityRating";
import Link from "next/link";
import { useFavorites } from "@/app/[locale]/contexts/FavoritesContext";
import { useRouter, useParams } from "next/navigation";
import BookmarkButton from "@/app/components/buttons/BookmarkButton";

interface EpisodeHeaderProps {
  anime: LocalAnime;
  episode: LocalEpisode;
}

const EpisodeHeader: React.FC<EpisodeHeaderProps> = ({ anime, episode }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorited = favorites.some((fav) => fav.id === anime.id);
  const t = useTranslations('EpisodeHeader');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      // Convert LocalAnime to Anime type
      const animeForFavorites: Anime = {
        ...anime,
        rating: anime.rating ? parseInt(anime.rating) : 0, // Default to 0 if no rating
        audioType: anime.audioType as any, // Type assertion since we know the values match
        episodes: anime.episodes.map(ep => ({
          ...ep,
          seasonId: ep.seasonId || ep.season.toString() // Use seasonId if available, otherwise use season number as string
        }))
      };
      addFavorite(animeForFavorites);
    }
  };

  const handleFavoriteToggle = () => handleFavoriteClick();

   const formatDate = (dateString: string) => {
     const months = [
       "Jan",
       "Feb",
       "Mar",
       "Apr",
       "May",
       "Jun",
       "Jul",
       "Aug",
       "Sep",
       "Oct",
       "Nov",
       "Dec",
     ];
     const [year, month, day] = dateString.split("-");
     return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
   };

  return (
    <div className="relative">
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center gap-1 w-full relative">
          <Link href={`/${locale}/series/${anime.publicCode}/${anime.slug}`} key={anime.id}>
            <h1 className="text-[16px] text-orange-600 hover:text-white hover:underline relative pr-3 after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[60%] after:w-px after:bg-white/30">
              {anime.name}
            </h1>
          </Link>
          {anime.score && (
            <div className="flex items-center gap-1 ml-3">
              <span className="font-bold text-gray-300">{anime.score}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-gray-300"
                aria-hidden="true"
              >
                <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z" />
              </svg>
            </div>
          )}
        </div>

        <div className="relative inline-block">
          <BookmarkButton
            isFavorited={isFavorited}
            onToggle={handleFavoriteClick}
            color='#FFF'
          />
        </div>
      </div>

      <h2 className="text-2xl text-white">{episode.title}</h2>

      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-1">
          {anime.rating && (
            <span className="rating-badge">
              <MaturityRating rating={parseInt(anime.rating)} size={5}/>
            </span>
          )}
          <span className="flex items-center text-sm relative pl-1.5 before:content-['◆'] before:text-gray-400 before:text-xs before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2"></span>
          {anime.audioType && (
            <span className="text-gray-400">{t(`audioTypes.${anime.audioType}`)}</span>
          )}
        </div>

        {episode.releaseDate && (
          <div className="text-white">
            {t('releasedOn', { date: formatDate(episode.releaseDate) })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodeHeader;
