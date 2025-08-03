
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFavorites } from "../../../contexts/FavoritesContext";
import { Anime } from "@/types/anime";
import MaturityRating from "../../../../components/elements/MaturityRating";
import Link from "next/link";

import PlayButton from "@/app/components/buttons/PlayButton";
import BookmarkButton from "@/app/components/buttons/BookmarkButton";
import AddButton from "@/app/components/buttons/AddButton";
import AddToListModal from "../../../../components/modals/AddToListModal";

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  const t = useTranslations('alphabetical');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const router = useRouter();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorited = favorites.some((fav) => fav.id === anime.id);
  const firstEpisode = anime.episodes?.[0];
  const [showAddToListModal, setShowAddToListModal] = useState(false);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  const handleAddButtonClick = () => {
    setShowAddToListModal(true);
  };

  return (
    <div
    className="group relative w-full overflow-hidden transition-all duration-300 hover:bg-[#23252B]"
    onMouseEnter={() => setHoveredCard(anime.id)}
    onMouseLeave={() => setHoveredCard(null)}
  >
    <div>
      <div 
        className="flex items-start gap-5 p-2.5 relative"
      >
        {/* Container da imagem */}
        <div className="relative w-[231px] h-[130px] flex-shrink-0">
          <Link href={`/series/${anime.publicCode}/${anime.slug}`}>
            <img
              src={anime.imageCardCompact}
              alt={anime.name}
              className="w-full h-full object-cover"
            />
          </Link>
          
          {/* Ícone de favorito */}
          {isFavorited && (
            <div className="absolute top-0 right-0 z-30 w-0 h-0 border-solid border-transparent border-r-black border-b-[36px] border-r-[36px] flex items-start justify-end">
              <svg 
                className="w-4 mr-[-35px] mt-0.5 fill-[#FF640A]"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 16 16"
                aria-hidden="true" 
                role="img"
              >
                <path d="M4 2h8a1 1 0 0 1 1 1v9.92a1 1 0 0 1-1.625.78L8 11l-3.375 2.7A1 1 0 0 1 3 12.92V3a1 1 0 0 1 1-1z" />
              </svg>
            </div>
          )}
          
          {/* Classificação indicativa */}
          <div className="absolute top-1 left-1 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <MaturityRating rating={Number(anime.rating)} size={4} />
          </div>
        </div>
        
        {/* Detalhes do anime */}
        <div className="flex-1 flex flex-col gap-2 relative min-h-[130px]">
          {hoveredCard !== anime.id && (
            <>
              <h3 className="text-lg font-semibold text-white m-0">{anime.name}</h3>
              <p className="text-sm text-[#b3b3b3] m-0 line-clamp-2">
                {anime.synopsis}
              </p>
              <p className="text-xs text-[#808080] m-0">
                {anime.audioType ? t(`filters.${anime.audioType}`) : ''}
              </p>
            </>
          )}

          {hoveredCard === anime.id && (
            <div className="absolute inset-0 p-0 flex flex-col gap-1 z-10 h-full w-full">
              <h3 className="text-xl font-semibold text-white m-0">{anime.name}</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-[#f1f1f1]">
                    {anime.score}
                  </span>
                  <svg 
                    className="w-4 h-4 fill-[#f1f1f1]"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                    aria-hidden="false" 
                    role="img"
                  >
                    <title>Avaliação</title>
                    <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-[#b3b3b3] m-0 line-clamp-2">
                {anime.synopsis}
              </p>
              <div className="flex gap-4 mt-auto">
                <PlayButton firstEpisode={firstEpisode} />
                <BookmarkButton isFavorited={isFavorited} onToggle={handleFavoriteClick} />
                <AddButton onClick={handleAddButtonClick} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    
    {/* Modal de adicionar à lista */}
    {showAddToListModal && (
      <AddToListModal
        anime={anime}
        onClose={() => setShowAddToListModal(false)}
      />
    )}
  </div>
  );
};

export default AnimeCard; 