"use client";

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from '@/lib/queries/getAnimes';
import { GET_MOVIES } from '@/lib/queries/getMovie';
import AnimeCard from './components/AnimeCard';
import AnimeCardSkeleton from './components/AnimeCardSkeleton';
import RelatedAnimeCard from './components/RelatedAnimeCard';
import RelatedAnimeCardSkeleton from './components/RelatedAnimeCardSkeleton';
import { EpisodeSearchCard } from './components/EpisodeSearchCard';
import { EpisodeSearchCardSkeleton } from './components/EpisodeSearchCardSkeleton';
import { Anime } from '@/types/anime';
import { Episode } from '@/types/episode';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Loading from '../loading';

export default function Search() {
  const t = useTranslations('Search');
  const { data, loading, error } = useQuery(GET_ANIMES);
  const { data: moviesData, loading: moviesLoading } = useQuery(GET_MOVIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [relatedAnimes, setRelatedAnimes] = useState<Anime[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Anime[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<{episode: Episode, anime: Anime}[]>([]);
  const [allSearchResults, setAllSearchResults] = useState<Anime[]>([]);
  const [showAllResults, setShowAllResults] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams?.get('q');
  const filter = searchParams?.get('f');

  useEffect(() => {
    if (query) {
      setSearchTerm(query);
    }
    if (filter === 'series') {
      setShowAllResults(true);
    }
  }, [query, filter]);

  useEffect(() => {
    if (data?.animes && searchTerm) {
      const trimmedSearchTerm = searchTerm.trim();
      // Se o termo de busca for apenas espaços, não retorna nenhum resultado
      if (trimmedSearchTerm === '') {
        setFilteredAnimes([]);
        setRelatedAnimes([]);
        setFilteredMovies([]);
        setFilteredEpisodes([]);
        setAllSearchResults([]);
      } else {
        // Busca inteligente: começa com o termo, contém o termo, ou palavras similares
        const allResults = data.animes.filter((anime: Anime) => {
          const animeName = anime.name.toLowerCase();
          const searchTermLower = trimmedSearchTerm.toLowerCase();
          
          // Prioridade 1: Nome começa com o termo de busca
          if (animeName.startsWith(searchTermLower)) return true;
          
          // Prioridade 2: Nome contém o termo de busca
          if (animeName.includes(searchTermLower)) return true;
          
          // Prioridade 3: Palavras individuais começam com o termo
          const animeWords = animeName.split(' ');
          return animeWords.some(word => word.startsWith(searchTermLower));
        });

        // Ordenar por relevância
        const sortedResults = allResults.sort((a: Anime, b: Anime) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          const searchTermLower = trimmedSearchTerm.toLowerCase();
          
          // Priorizar animes que começam com o termo
          const aStartsWith = aName.startsWith(searchTermLower);
          const bStartsWith = bName.startsWith(searchTermLower);
          
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          
          // Se ambos começam ou não começam, priorizar o mais curto
          return aName.length - bName.length;
        });

        // Armazenar todos os resultados
        setAllSearchResults(sortedResults);
        
        // Primeiros 3 resultados vão para a seção principal
        setFilteredAnimes(sortedResults.slice(0, 3));
        
        // Seção relacionada: 3 primeiros são os mesmos da seção principal + 3 novos
        const relatedSection = [
          ...sortedResults.slice(0, 3), // Mesmos 3 da seção principal
          ...sortedResults.slice(3, 6)  // 3 novos resultados
        ];
        setRelatedAnimes(relatedSection);
      }
    } else {
      setFilteredAnimes([]);
      setRelatedAnimes([]);
      setFilteredMovies([]);
      setFilteredEpisodes([]);
      setAllSearchResults([]);
    }
  }, [searchTerm, data]);

  // Efeito para filtrar filmes
  useEffect(() => {
    if (moviesData?.movie && searchTerm) {
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm === '') {
        setFilteredMovies([]);
      } else {
        // Busca inteligente para filmes
        const movieResults = moviesData.movie.filter((movie: Anime) => {
          const movieName = movie.name.toLowerCase();
          const searchTermLower = trimmedSearchTerm.toLowerCase();
          
          // Prioridade 1: Nome começa com o termo de busca
          if (movieName.startsWith(searchTermLower)) return true;
          
          // Prioridade 2: Nome contém o termo de busca
          if (movieName.includes(searchTermLower)) return true;
          
          // Prioridade 3: Palavras individuais começam com o termo
          const movieWords = movieName.split(' ');
          return movieWords.some(word => word.startsWith(searchTermLower));
        });

        // Ordenar por relevância
        const sortedMovies = movieResults.sort((a: Anime, b: Anime) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          const searchTermLower = trimmedSearchTerm.toLowerCase();
          
          // Priorizar filmes que começam com o termo
          const aStartsWith = aName.startsWith(searchTermLower);
          const bStartsWith = bName.startsWith(searchTermLower);
          
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          
          // Se ambos começam ou não começam, priorizar o mais curto
          return aName.length - bName.length;
        });

        setFilteredMovies(sortedMovies.slice(0, 6)); // Mostrar até 6 filmes
      }
    } else {
      setFilteredMovies([]);
    }
  }, [searchTerm, moviesData]);

  // Efeito para filtrar episódios
  useEffect(() => {
    if (data?.animes && searchTerm) {
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm === '') {
        setFilteredEpisodes([]);
      } else {
        const searchTermLower = trimmedSearchTerm.toLowerCase();
        const episodeResults: {episode: Episode, anime: Anime}[] = [];

        // Buscar episódios em todos os animes
        data.animes.forEach((anime: Anime) => {
          if (anime.episodes) {
            anime.episodes.forEach((episode: Episode) => {
              const episodeTitle = episode.title.toLowerCase();
              const animeName = anime.name.toLowerCase();
              
              // Verificar se o episódio ou anime contém o termo de busca
              if (episodeTitle.includes(searchTermLower) || animeName.includes(searchTermLower)) {
                episodeResults.push({ episode, anime });
              }
            });
          }
        });

        // Ordenar por relevância
        const sortedEpisodes = episodeResults.sort((a, b) => {
          const aTitle = a.episode.title.toLowerCase();
          const bTitle = b.episode.title.toLowerCase();
          const aAnimeName = a.anime.name.toLowerCase();
          const bAnimeName = b.anime.name.toLowerCase();
          
          // Priorizar episódios que começam com o termo
          const aStartsWith = aTitle.startsWith(searchTermLower) || aAnimeName.startsWith(searchTermLower);
          const bStartsWith = bTitle.startsWith(searchTermLower) || bAnimeName.startsWith(searchTermLower);
          
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          
          // Se ambos começam ou não começam, priorizar o mais curto
          return aTitle.length - bTitle.length;
        });

        setFilteredEpisodes(sortedEpisodes.slice(0, 6)); // Mostrar até 6 episódios
      }
    } else {
      setFilteredEpisodes([]);
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

  const handleViewAll = () => {
    const params = new URLSearchParams();
    params.set('f', 'series');
    params.set('q', searchTerm);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    setShowAllResults(true);
  };

  const handleBackToSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set('q', searchTerm);
    }
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    setShowAllResults(false);
  };

  // Show loading spinner while data is being fetched
  if (loading || moviesLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center h-auto bg-black mx-auto">
        <Head>
          <title>{searchTerm ? t('searchTitle', { searchTerm }) : t('defaultTitle')}</title>
          <meta
            name="description"
            content={
              searchTerm
                ? t('searchDescription', { searchTerm })
                : t('defaultDescription')
            }
          />
        </Head>
    
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
          {showAllResults ? (
            // Sub-página com todos os resultados
            <>
              <div className="flex items-center justify-between w-full mb-6">
                <button
                  onClick={handleBackToSearch}
                  className="flex items-center gap-2 text-white hover:text-[#FF640A] transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Voltar à busca
                </button>
                <h1 className="text-white text-xl font-semibold">
                  Todos os resultados para "{searchTerm}"
                </h1>
              </div>
              
              {!data?.animes ? (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                  {[...Array(12)].map((_, index) => (
                    <RelatedAnimeCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                  {allSearchResults.map((anime) => (
                    <RelatedAnimeCard
                      key={anime.id}
                      anime={anime}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            // Página principal de busca
            <>
              {searchTerm && !data?.animes ? (
                <>
                  <div className="bg-[#141519] h-7 w-48 mb-4"></div>
                  <div className="grid grid-cols-1 gap-8 p-0 m-0 list-none lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-12">
                    {[...Array(6)].map((_, index) => (
                      <AnimeCardSkeleton key={index} />
                    ))}
                  </div>
                  
                  {/* Skeletons para resultados relacionados */}
                  <div className="mt-12">
                    <div className="bg-[#141519] h-6 w-48 mb-6"></div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                      {[...Array(6)].map((_, index) => (
                        <RelatedAnimeCardSkeleton key={index} />
                      ))}
                    </div>
                  </div>

                  {/* Skeletons para filmes */}
                  <div className="mt-12">
                    <div className="bg-[#141519] h-6 w-48 mb-6"></div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                      {[...Array(6)].map((_, index) => (
                        <RelatedAnimeCardSkeleton key={index} />
                      ))}
                    </div>
                  </div>

                  {/* Skeletons para episódios */}
                  <div className="mt-12">
                    <div className="bg-[#141519] h-6 w-48 mb-6"></div>
                    <div className="flex flex-col gap-3">
                      {[...Array(6)].map((_, index) => (
                        <EpisodeSearchCardSkeleton key={index} />
                      ))}
                    </div>
                  </div>
                </>
              ) : searchTerm && filteredAnimes.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full py-12 border border-dashed border-[#DADADA]">
                  <div className="flex flex-col items-center max-w-md text-center">
                    <img 
                      className="w-48 h-48 mb-6" 
                      src="https://www.crunchyroll.com/build/assets/img/search/empty-search.png" 
                      srcSet="https://www.crunchyroll.com/build/assets/img/search/empty-search@2x.png 2x, https://www.crunchyroll.com/build/assets/img/search/empty-search@3x.png 3x"
                      alt="Nenhum resultado encontrado"
                    />
                    <p className="text-[#dadada] font-medium">
                      Desculpe, mas não pudemos encontrar resultados. Confira a grafia ou tente procurar por outros termos.
                    </p>
                  </div>
                </div>
              ) : (
                searchTerm && (
                  <>
                    <h1 className="text-white text-xl font-semibold text-left w-full">{t('searchResults')}</h1>
                    <div className="grid grid-cols-1 gap-8 p-0 m-0 list-none lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-12">
                      {filteredAnimes.map((anime) => (
                        <AnimeCard
                          key={anime.id}
                          anime={anime}
                        />
                      ))}
                    </div>
                    
                    {/* Seção de resultados relacionados */}
                    {relatedAnimes.length > 0 && (
                      <div className="w-full">
                        <h2 className="text-white text-lg font-semibold text-left w-full mb-2">
                          Séries
                        </h2>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                          {relatedAnimes.map((anime) => (
                            <RelatedAnimeCard
                              key={anime.id}
                              anime={anime}
                            />
                          ))}
                        </div>
                        
                        {/* Botão Ver mais */}
                        {allSearchResults.length > 6 && (
                          <div className="flex justify-start mt-6">
                            <button
                              onClick={handleViewAll}
                              className="px-6 py-3 bg-[#FF640A] text-white font-medium rounded-lg hover:bg-[#E55A09] transition-colors duration-200"
                            >
                              Ver mais resultados ({allSearchResults.length - 6})
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Seção de filmes */}
                    {filteredMovies.length > 0 && (
                      <div className="w-full mt-12">
                        <h2 className="text-white text-lg font-semibold text-left w-full mb-2">
                          Filmes
                        </h2>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                          {filteredMovies.map((movie) => (
                            <RelatedAnimeCard
                              key={movie.id}
                              anime={movie}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Seção de episódios */}
                    {filteredEpisodes.length > 0 && (
                      <div className="w-full mt-12">
                        <h2 className="text-white text-lg font-semibold text-left w-full mb-2">
                          Episódios
                        </h2>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                          {filteredEpisodes.map(({ episode, anime }) => (
                            <EpisodeSearchCard
                              key={`${anime.id}-${episode.id}`}
                              episode={episode}
                              anime={anime}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
