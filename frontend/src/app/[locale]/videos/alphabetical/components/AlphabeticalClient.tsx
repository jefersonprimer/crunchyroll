
import AnimeCard from "./AnimeCard";
import AudioDropdown from "./AudioDropdown";
import SortDropdown from "./SortDropdown";

interface AlphabeticalClientProps {
  animes: any[];
  messages: any;
  audioFilter: string;
  activeLetter: string;
  onLetterChange?: (letter: string) => void;
}

const AlphabeticalClient = ({ animes, messages, audioFilter, activeLetter, onLetterChange }: AlphabeticalClientProps) => {
  // Remover useState para activeLetter, usar prop

  // Filtro de letras já foi feito no server
  // Letras para filtro
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="w-[1351px] my-0 mx-auto py-15 flex flex-col items-center">
      {/* Header com título e filtros */}
      <div className="w-[1050px] h-[44px] my-0 mx-auto flex justify-between items-center mb-8 relative">
        <h1 className="m-0 p-0 text-[1.6rem] font-medium font-lato text-left">
          {messages?.titlePage}
        </h1>
        <div className="flex items-center">
          <SortDropdown />
          <AudioDropdown audioFilter={audioFilter} />
        </div>
      </div>

      {/* Filtro de letras */}
      <div className="flex gap-2 flex-wrap mb-5">
        <button
          className={`p-2.5 rounded cursor-pointer transition-transform ${
            activeLetter === "#" ? "text-[#FF640A] scale-110" : "text-[#A0A0A0]"
          } hover:scale-110`}
          onClick={() => onLetterChange && onLetterChange("#")}
        >
          #
        </button>
        {letters.map((letter) => (
          <button
            key={letter}
            className={`p-2.5 rounded cursor-pointer transition-transform ${
              activeLetter === letter ? "text-[#FF640A] scale-110" : "text-[#A0A0A0]"
            } hover:scale-110`}
            onClick={() => onLetterChange && onLetterChange(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Lista de animes */}
      <div className="w-[1050px] flex flex-col">
        {animes.length > 0 ? (
          <div className="flex flex-col gap-4">
            {animes.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        ) : (
          <p className="text-center py-8">{messages?.notFound?.replace("{letter}", activeLetter)}</p>
        )}
      </div>
    </div>
  );
};

export default AlphabeticalClient; 