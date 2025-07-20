"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { Anime } from "@/types/anime";
import AnimeGrid from "../../../components/cards/AnimeGrid";
import { GET_LATEST_RELEASES } from "@/lib/queries/getLatestReleases";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import { useDropdown } from "@/app/[locale]/hooks/useDropdown";
import { ClientMetadata } from "@/app/components/metadata/ClientMetadata";

type AudioFilter = "subtitled_dubbed" | "subtitled" | "dubbed";

export default function NewReleasesPage() {
  const t = useTranslations('newReleases');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const router = useRouter();
  const [audioFilter, setAudioFilter] = useState<AudioFilter>("subtitled_dubbed");
  const { activeDropdown, toggleDropdown } = useDropdown();
  
  const { data, loading, error } = useQuery(GET_LATEST_RELEASES);

  useEffect(() => {
    if (data?.latestReleases) {
      let filtered = data.latestReleases;
      
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
  }, [data, audioFilter]);

  const handleAudioFilter = (filter: AudioFilter) => {
    setAudioFilter(filter);
    toggleDropdown(null);
  };

  const goToPopular = () => {
    router.push("/videos/popular");
  };

  const goToNewReleases = () => {
    router.push("/videos/new");
  };

  const goToAlphabeticOrder = () => {
    router.push("/videos/alphabetical");
  };

  if (error) return <div>{error.message}</div>;

  
  return (
    <div>
      <ClientMetadata
        title="Animes e Filmes Recém-Lançados - Crunchyroll"
        description="Assista a Animes e Filmes Recém-Lançados - Crunchyroll"
      />
      <Header />
      <div className="w-full py-15 flex flex-col items-center">
        <div className="w-4/5 px-[22px] flex justify-between items-center mb-8 relative">
          <h1 className="text-[1.7rem] font-medium font-lato p-0 m-0">
            {t('title')}
          </h1>
          <div className="flex items-center">
            <div className="relative ml-4">
              <div
                onClick={() => toggleDropdown('filter')}
                className={`p-2.5 flex items-center border-none cursor-pointer ${
                  activeDropdown === 'filter' ? 'bg-[#23252B]' : 'bg-transparent'
                } hover:bg-[#23252B]`}
              >
                <svg
                  className="w-6 h-6 mr-2 fill-[#A0A0A0] hover:fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-labelledby="sort-svg"
                  aria-hidden="true"
                  role="img"
                >
                  <title id="sort-svg">{t('filters.sort.label')}</title>
                  <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z"></path>
                </svg>
                <span className={`cursor-pointer text-sm font-bold text-[#A0A0A0] hover:text-white ${
                  activeDropdown === 'filter' ? 'text-white' : ''
                }`}>
                  {t('latestReleases')}
                </span>
              </div>
              {activeDropdown === 'filter' && (
                <div className="cursor-pointer flex flex-col absolute top-full right-0 bg-[#23252B] py-2.5 z-10 w-[200px]">
                  <div onClick={goToPopular} className="px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white">
                    {t('filters.sort.options.mostPopular')}
                  </div>
                  <div onClick={goToNewReleases} className="px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white">
                    {t('filters.sort.options.newest')}
                  </div>
                  <div onClick={goToAlphabeticOrder} className="px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white">
                    {t('filters.sort.options.alphabetical')}
                  </div>
                </div>
              )}
            </div>
            <div className="relative ml-4">
              <div
                onClick={() => toggleDropdown('audio')}
                className={`p-2.5 flex items-center border-none cursor-pointer ${
                  activeDropdown === 'audio' ? 'bg-[#23252B]' : 'bg-transparent'
                } hover:bg-[#23252B]`}
              >
                <svg
                  className="w-6 h-6 mr-2 fill-[#A0A0A0] hover:fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="filter-svg"
                  aria-labelledby="filter-svg"
                  aria-hidden="true"
                  role="img"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2M3 8a1 1 0 0 1 0-2h2.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21a1 1 0 0 1 0 2h-8.142c-.447 1.72-2 3-3.858 3S5.589 9.72 5.142 8H3zm12 11c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2zm6-3a1 1 0 0 1 0 2h-2.142c-.447 1.72-2 3-3.858 3s-3.411-1.28-3.858-3H3a1 1 0 0 1 0-2h8.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21z"
                  ></path>
                </svg>
                <span className={`cursor-pointer text-sm font-bold text-[#A0A0A0] hover:text-white ${
                  activeDropdown === 'audio' ? 'text-white' : ''
                }`}>
                  {t('filters.audio.label')}
                </span>
              </div>
              {activeDropdown === 'audio' && (
                <div className="cursor-pointer flex flex-col absolute top-full right-0 bg-[#23252B] py-2.5 z-10 w-[200px]">
                  <span className="px-2.5 py-1 text-lg">
                    {t('filters.audio.language')}
                  </span>
                  <div
                    onClick={() => handleAudioFilter("subtitled_dubbed")}
                    className={`px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white ${
                      audioFilter === "subtitled_dubbed" ? "text-white" : ""
                    }`}
                  >
                    <span className={`relative w-[18px] h-[18px] border-2 border-[#A0A0A0] rounded-full inline-block cursor-pointer hover:border-white ${
                      audioFilter === "subtitled_dubbed" ? "border-[#2ABDBB]" : ""
                    }`}>
                      <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-[#2ABDBB] rounded-full ${
                        audioFilter === "subtitled_dubbed" ? "opacity-100" : "opacity-0"
                      }`}></span>
                    </span>
                    {t('filters.audio.options.all')}
                  </div>
                  <div
                    onClick={() => handleAudioFilter("subtitled")}
                    className={`px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white ${
                      audioFilter === "subtitled" ? "text-white" : ""
                    }`}
                  >
                    <span className={`relative w-[18px] h-[18px] border-2 border-[#A0A0A0] rounded-full inline-block cursor-pointer hover:border-white ${
                      audioFilter === "subtitled" ? "border-[#2ABDBB]" : ""
                    }`}>
                      <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-[#2ABDBB] rounded-full ${
                        audioFilter === "subtitled" ? "opacity-100" : "opacity-0"
                      }`}></span>
                    </span>
                    {t('filters.audio.options.subtitled')}
                  </div>
                  <div
                    onClick={() => handleAudioFilter("dubbed")}
                    className={`px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white ${
                      audioFilter === "dubbed" ? "text-white" : ""
                    }`}
                  >
                    <span className={`relative w-[18px] h-[18px] border-2 border-[#A0A0A0] rounded-full inline-block cursor-pointer hover:border-white ${
                      audioFilter === "dubbed" ? "border-[#2ABDBB]" : ""
                    }`}>
                      <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-[#2ABDBB] rounded-full ${
                        audioFilter === "dubbed" ? "opacity-100" : "opacity-0"
                      }`}></span>
                    </span>
                    {t('filters.audio.options.dubbed')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-4/5 flex justify-center mx-auto flex-col items-center gap-4">
          <h1 className="m-0 p-0 pl-5 text-2xl font-medium font-lato text-left w-full">
            {t('subtitle')}
          </h1>
          <div>
            <AnimeGrid animes={filteredAnimes} />
          </div>
        </div>
      </div>
    <Footer />
  </div>
  );
}