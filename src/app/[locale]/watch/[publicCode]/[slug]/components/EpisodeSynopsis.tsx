import { Anime, Episode } from "../types/types";
import { safeJoin } from "../utils/utils";
import MaturityRating from "@/app/components/elements/MaturityRating";

interface EpisodeSynopsisProps {
  episode: Episode;
  anime: Anime;
  expanded: boolean;
  onToggle: () => void;
}

const EpisodeSynopsis: React.FC<EpisodeSynopsisProps> = ({
  episode,
  anime,
  expanded,
  onToggle,
}) => {
  return (
    <div className="bg-black rounded-lg mb-6">
    <div
      className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
        expanded ? "max-h-[1000px]" : "max-h-[100px]"
      } mb-8`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <p className="m-0 leading-relaxed">
            {episode.synopsis || "Sinopse não disponível"}
          </p>
        </div>
  
        <div className="flex-1">
          <div className="flex flex-col gap-2">
            {/* Áudio */}
            <div className="flex justify-between py-2.5 border-b border-[#454852]">
              <strong className="text-white">Áudio</strong>
              <span>
                {Array.isArray(anime.audioLanguages)
                  ? anime.audioLanguages.join(', ')
                  : anime.audioLanguages || "Não disponível"}
              </span>
            </div>
  
            {/* Legendas */}
            <div className="flex justify-between py-2.5 border-b border-[#454852]">
              <strong className="text-white">Legendas</strong>
              <span>{safeJoin(Array.isArray(anime.subtitles) ? anime.subtitles : [])}</span>
            </div>
  
            {/* Classificação */}
            <div className="flex justify-between py-2.5 border-b border-[#454852]">
              <strong className="text-white">Classificação de Conteúdo</strong>
              <span className="flex items-center gap-1">
                <MaturityRating rating={Number(anime.rating) || 0} size={4} />
                {anime.contentAdvisory}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <button
      onClick={onToggle}
      className="bg-transparent border-none text-orange-600 cursor-pointer font-bold"
      aria-expanded={expanded}
    >
      {expanded ? "MENOS DETALHES" : "MAIS DETALHES"}
    </button>
  </div>
  );
};

export default EpisodeSynopsis;
