"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from '@/lib/queries/getAnimes';
import AnimeCard from './components/AnimeCard';
import styles from './styles.module.css';
import { Anime } from '@/types/anime';
import { FavoritesProvider } from '@/app/contexts/FavoritesContext';

export default function Search() {
  const { data, loading, error } = useQuery(GET_ANIMES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams?.get('query');

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

  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('query', searchTerm);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  return (
    <FavoritesProvider>
      <div className={styles.searchPage}>
        <Head>
          <title>{searchTerm ? `Você pesquisou por "${searchTerm}" - Bakashi TV` : 'Pesquisa de Animes - Bakashi TV'}</title>
          <meta
            name="description"
            content={
              searchTerm
                ? `Resultados de busca para "${searchTerm}" em Bakashi TV. Explore animes populares e descubra novas séries!`
                : 'Pesquise seus animes favoritos em Bakashi TV, o melhor portal para fãs de animes!'
            }
          />
        </Head>

        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              placeholder="Buscar..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              aria-label="Campo de busca"
            />
            {searchTerm && (
              <button 
                className={styles.clearButton}
                onClick={() => setSearchTerm('')}
                aria-label="Limpar busca"
              >
                <svg 
                  className={styles.searchClearIcon} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  data-t="cross-svg" 
                  aria-labelledby="cross-svg" 
                  aria-hidden="false" 
                  role="img"
                >
                  <title id="cross-svg">Limpar</title>
                  <path d="M13.414 12l5.293-5.293a.999.999 0 1 0-1.414-1.414L12 10.586 6.707 5.293a.999.999 0 1 0-1.414 1.414L10.586 12l-5.293 5.293a.999.999 0 0 0 0 1.414.993.993 0 0 0 1.414 0L12 13.414l5.293 5.293a.999.999 0 1 0 1.414-1.414L13.414 12z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className={styles.resultsContainer}>
          {searchTerm && loading ? (
            <p className={styles.loading}>Carregando resultados...</p>
          ) : searchTerm && !loading && filteredAnimes.length === 0 ? (
            <p className={styles.loading}>Nenhum anime encontrado.</p>
          ) : (
            searchTerm && (
              <>
                <h2 className={styles.resultsHeading}>Melhores Resultados</h2>
                <ul className={styles.animeList}>
                  {filteredAnimes.map((anime) => (
                    <AnimeCard
                      key={anime.id}
                      anime={anime}
                    />
                  ))}
                </ul>
              </>
            )
          )}
        </div>
      </div>
    </FavoritesProvider>
  );
}
