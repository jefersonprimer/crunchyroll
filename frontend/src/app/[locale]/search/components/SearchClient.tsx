"use client";

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from '@/lib/queries/getAnimes';
import { Anime } from '@/types/anime';
import AnimeCard from './AnimeCard';
import AnimeCardSkeleton from './AnimeCardSkeleton';
import Loading from '../../loading';

export default function Search() {
  const t = useTranslations('Search');
  const { data, loading, error } = useQuery(GET_ANIMES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams?.get('q');

  useEffect(() => {
    if (query) {
      setSearchTerm(query);
    }
  }, [query]);

  useEffect(() => {
    if (data?.animes && searchTerm) {
      const filtered = data.animes.filter((anime: Anime) =>
        anime.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAnimes(filtered);
    } else {
      setFilteredAnimes([]);
    }
  }, [searchTerm, data]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (searchTerm) {
      params.set('q', searchTerm);
    } else {
      params.delete('q');
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [searchTerm]);

  const handleSearch = () => {
    // This function is no longer needed since we update the URL in real-time
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center h-auto bg-black mx-auto"> 
      <div className="flex flex-col items-center justify-start w-full p-5 mb-8 bg-[#141519] h-[114px]">
        <div className="relative w-[70%] flex items-center h-auto">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="w-full py-2 px-0.5 pr-10 text-3xl border-b-2 border-[#59595B] focus:border-[#FF640A] text-white transition-all duration-300 ease-in-out bg-transparent focus:outline-none placeholder:text-[#A0A0A0] placeholder:text-3xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            aria-label={t('searchPlaceholder')}
          />
          {searchTerm && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-2 flex items-center justify-center text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
              onClick={() => setSearchTerm('')}
              aria-label={t('clearSearch')}
            >
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="cross-svg"
                aria-labelledby="cross-svg"
                aria-hidden="false"
                role="img"
              >
                <title id="cross-svg">{t('clearSearch')}</title>
                <path d="M13.414 12l5.293-5.293a.999.999 0 1 0-1.414-1.414L12 10.586 6.707 5.293a.999.999 0 1 0-1.414 1.414L10.586 12l-5.293 5.293a.999.999 0 0 0 0 1.414.993.993 0 0 0 1.414 0L12 13.414l5.293 5.293a.999.999 0 1 0 1.414-1.414L13.414 12z" />
              </svg>
            </button>
          )}
        </div>
      </div>
  
      <div className="grid gap-4 mt-5 w-full max-w-[1050px]">
        {searchTerm && !data?.animes ? (
          <>
            <div className="bg-[#141519] h-7 w-48 mb-4"></div>
            <div className="grid grid-cols-1 gap-8 p-0 m-0 list-none lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {[...Array(6)].map((_, index) => (
                <AnimeCardSkeleton key={index} />
              ))}
            </div>
          </>
        ) : searchTerm && filteredAnimes.length === 0 ? (
          <p className="text-center text-white text-xl mt-8">{t('noResults')}</p>
        ) : (
          searchTerm && (
            <>
              <h1 className="text-white text-xl font-semibold text-left w-full">{t('searchResults')}</h1>
              <div className="grid grid-cols-1 gap-8 p-0 m-0 list-none lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {filteredAnimes.map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                  />
                ))}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
