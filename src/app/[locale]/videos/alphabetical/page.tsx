"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { Anime } from "@/types/anime";
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import { useFavorites } from "../../contexts/FavoritesContext";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { useDropdown } from "@/app/[locale]/contexts/DropdownContext";
import { AudioType } from "@/types/enums";
import AnimeCard from "./components/AnimeCard";
import PageLoading from "@/app/components/loading/PageLoading";
import { ClientMetadata } from "@/app/components/metadata/ClientMetadata";

type AudioFilter = "subtitled_dubbed" | "subtitled" | "dubbed";

const AnimeList = () => {
  const t = useTranslations('alphabetical');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [activeLetter, setActiveLetter] = useState<string>("#");
  const { activeDropdown, setActiveDropdown } = useDropdown();
  const router = useRouter();
  const { favorites } = useFavorites();
  
  const { data, loading, error } = useQuery(GET_ANIMES);
  const [audioFilter, setAudioFilter] = useState<AudioFilter>("subtitled_dubbed");

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
      if (audioFilter !== "subtitled_dubbed") {
        filtered = filtered.filter((anime: Anime) => {
          if (audioFilter === "dubbed") {
            return anime.audioType === "dubbed" || anime.audioType === "subtitled_dubbed";
          }
          return anime.audioType === audioFilter;
        });
      }
      
      setFilteredAnimes(filtered);
    }
  }, [data, activeLetter, audioFilter]);

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

  // Funções para navegação por filtros
  const goToPopular = () => {
    router.push("/videos/popular");
    setActiveDropdown(null);
  };

  const goToNewReleases = () => {
    router.push("/videos/new");
    setActiveDropdown(null);
  };

  const goToAlphabeticOrder = () => {
    router.push("/videos/alphabetical");
    setActiveDropdown(null);
  };

  const handleAudioFilter = (filter: AudioFilter) => {
    setAudioFilter(filter);
    setActiveDropdown(null);
  };

  // Geração de letras para o filtro
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  if (loading) return <PageLoading/>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
    <ClientMetadata
      title="Lista de Animes e Filmes - Crunchyroll"
      description="Lista de Animes e Filmes"
    />
    <Header />
    <div className="w-[1351px] my-0 mx-auto py-15 flex flex-col items-center">
      {/* Header com título e filtros */}
      <div className="w-[1050px] h-[44px] my-0 mx-auto flex justify-between items-center mb-8 relative">
        <h1 className="m-0 p-0 text-[1.6rem] font-medium font-lato text-left">
          {t('title')}
        </h1>
        <div className="flex items-center">
          {/* Filtro de ordenação */}
          <div className="relative ml-4">
            <div 
              onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
              className={`p-2.5 flex items-center border-none cursor-pointer transition-colors
                ${activeDropdown === 'sort' ? 'bg-[#23252B] text-white' : 'bg-transparent text-[#A0A0A0]'}
                hover:bg-[#23252B] hover:text-white`}
            >
              <svg
                className="w-4 h-4 mr-2 fill-[#A0A0A0] hover:fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-labelledby="sort-svg"
                aria-hidden="true"
                role="img"
              >
                <title id="sort-svg">{t('sort.title')}</title>
                <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z"></path>
              </svg>
              <span className="cursor-pointer text-sm font-bold text-[#A0A0A0] hover:text-white uppercase">
                {t('filters.alphabetical')}
              </span>
            </div>
            {activeDropdown === 'sort' && (
              <div className="cursor-pointer flex flex-col absolute top-full right-0 bg-[#23252B] py-2.5 z-10 w-[200px]">
                <div onClick={goToPopular} className="px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white">
                  {t('filters.mostPopular')}
                </div>
                <div onClick={goToNewReleases} className="px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white">
                  {t('filters.mostRecent')}
                </div>
                <div onClick={goToAlphabeticOrder} className="px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white">
                  {t('filters.alphabeticalOrder')}
                </div>
              </div>
            )}
          </div>
  
          {/* Filtro de áudio */}
          <div className="relative ml-4">
            <div
              onClick={() => setActiveDropdown(activeDropdown === 'audio' ? null : 'audio')}
              className={`p-2.5 flex items-center border-none cursor-pointer transition-colors
                ${activeDropdown === 'audio' ? 'bg-[#23252B] text-white' : 'bg-transparent text-[#A0A0A0]'}
                hover:bg-[#23252B] hover:text-white`}
            >
              <svg
                className="w-4 h-4 mr-2 fill-[#A0A0A0] hover:fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="filter-svg"
                aria-labelledby="filter-svg"
                aria-hidden="true"
                role="img"
              >
                <title id="filter-svg">{t('filter.title')}</title>
                <path fillRule="evenodd" d="M9 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2M3 8a1 1 0 0 1 0-2h2.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21a1 1 0 0 1 0 2h-8.142c-.447 1.72-2 3-3.858 3S5.589 9.72 5.142 8H3zm12 11c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2zm6-3a1 1 0 0 1 0 2h-2.142c-.447 1.72-2 3-3.858 3s-3.411-1.28-3.858-3H3a1 1 0 0 1 0-2h8.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21z"></path>
              </svg>
              <span className={`cursor-pointer text-sm font-bold text-[#A0A0A0] hover:text-white uppercase ${activeDropdown === 'audio' ? 'text-white' : ''}`}>
                {t('filters.filter')}
              </span>
            </div>
            
            {activeDropdown === 'audio' && (
              <div className="cursor-pointer flex flex-col absolute top-full right-0 bg-[#23252B] py-2.5 z-10 w-[200px]">
                <span className="px-2.5 py-1 text-lg">
                  {t('filters.language')}
                </span>
                <div
                  onClick={() => handleAudioFilter("subtitled_dubbed")}
                  className={`px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white ${audioFilter === "subtitled_dubbed" ? "text-white" : ""}`}
                >
                  <span className={`relative w-[18px] h-[18px] border-2 border-[#A0A0A0] rounded-full inline-block cursor-pointer hover:border-white ${audioFilter === "subtitled_dubbed" ? "border-[#2ABDBB]" : ""}`}>
                    <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-[#2ABDBB] rounded-full ${audioFilter === "subtitled_dubbed" ? "opacity-100" : "opacity-0"}`}></span>
                  </span>
                  {t('filters.all')}
                </div>
                <div
                  onClick={() => handleAudioFilter(AudioType.SUBTITLED)}
                  className={`px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white ${audioFilter === AudioType.SUBTITLED ? "text-white" : ""}`}
                >
                  <span className={`relative w-[18px] h-[18px] border-2 border-[#A0A0A0] rounded-full inline-block cursor-pointer hover:border-white ${audioFilter === AudioType.SUBTITLED ? "border-[#2ABDBB]" : ""}`}>
                    <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-[#2ABDBB] rounded-full ${audioFilter === AudioType.SUBTITLED ? "opacity-100" : "opacity-0"}`}></span>
                  </span>
                  {t('filters.subtitled')}
                </div>
                <div
                  onClick={() => handleAudioFilter(AudioType.DUBBED)}
                  className={`px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white ${audioFilter === AudioType.DUBBED ? "text-white" : ""}`}
                >
                  <span className={`relative w-[18px] h-[18px] border-2 border-[#A0A0A0] rounded-full inline-block cursor-pointer hover:border-white ${audioFilter === AudioType.DUBBED ? "border-[#2ABDBB]" : ""}`}>
                    <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-[#2ABDBB] rounded-full ${audioFilter === AudioType.DUBBED ? "opacity-100" : "opacity-0"}`}></span>
                  </span>
                  {t('filters.dubbed')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  
      {/* Filtro de letras */}
      <div className="flex gap-2 flex-wrap mb-5">
        <button
          className={`p-2.5 rounded cursor-pointer transition-transform ${
            activeLetter === "#" ? "text-[#FF640A] scale-110" : "text-[#A0A0A0]"
          } hover:scale-110`}
          onClick={() => handleLetterClick("#")}
        >
          #
        </button>
        {letters.map((letter) => (
          <button
            key={letter}
            className={`p-2.5 rounded cursor-pointer transition-transform ${
              activeLetter === letter ? "text-[#FF640A] scale-110" : "text-[#A0A0A0]"
            } hover:scale-110`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
  
      {/* Lista de animes */}
      <div className="w-[1050px] flex flex-col">
        {filteredAnimes.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredAnimes.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        ) : (
          <p className="text-center py-8">Nenhum anime encontrado com a letra "{activeLetter}".</p>
        )}
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default function Glossary() {
  return (
    <AnimeList />
  );
}