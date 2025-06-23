'use client';

import React, { useState, useEffect } from 'react';
import { FavoritesProvider, useFavorites } from '../contexts/FavoritesContext';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import TabsNavigation from '@/app/components/layout/TabsNavigation';
import { FilterProvider } from '@/app/[locale]/contexts/FilterContext';
import { CardFavoritesProvider } from '@/app/[locale]/contexts/CardFavoritesContext';
import AnimeCard from './components/AnimeCard';
import WatchlistHeader from './components/watchlistHeader';
import type { Anime } from '@/types/anime';
import Link from 'next/link';

const WatchlistContent = () => {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemoveFavorite = (id: string) => {
    removeFavorite(id);
  };

  return (
    <CardFavoritesProvider>
      <FilterProvider>
        <div className='w-full min-h-[400px] flex items-center justify-center'>
          {favorites.length === 0 ? (
            <div className='text-center'>
              <img
                src="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-watchlist.png"
                alt="Empty Watchlist"
                className='max-w-[300px] mb-[1rem]'
              />
              <h4 className='text-[#666] mb-[1rem] leading-[1.5]'>
                Sua Fila merece mais amor. <br /> Vamos enchê-la com animes incríveis.
              </h4>
              <div className='mt-[1rem]'>
                <Link href="/" className='inline-block py-[0.75rem] px-[1.5rem] bg-[#FF640A] text-white no-underline rounded font-weight-600 hover:text-[#E55A00]'>
                  VOLTAR PARA A TELA INICIAL
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <WatchlistHeader/>
              <ul className="list-none m-0 w-[1066px] grid grid-cols-4 gap-2 mx-auto">
                {favorites.map((anime: Anime) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    onRemove={handleRemoveFavorite}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </FilterProvider>
    </CardFavoritesProvider>
  );
};

const WatchlistPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const tTabs = useTranslations('Watchlist');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case 'fila':
        router.push('/watchlist');
        break;
      case 'crunchylists':
        router.push('/crunchylists');
        break;
      case 'historico':
        router.push('/history');
        break;
      default:
        break;
    }
  };

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  let selectedTab = 'fila';
  if (pathname.includes('crunchylists')) selectedTab = 'crunchylists';
  else if (pathname.includes('history')) selectedTab = 'historico';

  if (!isMounted) {
    return null;
  }

  return (
    <FavoritesProvider>
      <Header/>
      <TabsNavigation
        selectedTab={selectedTab}
        onTabChange={handleTabClick}
        labels={{
          fila: tTabs('queue'),
          crunchylists: tTabs('crunchylists'),
          historico: tTabs('history'),
          'Minhas Listas': tTabs('title')
        }}
      >
        <div className="flex justify-center items-center w-full">
          <div className="w-full">
            <WatchlistContent />
          </div>
        </div>
      </TabsNavigation>
      <Footer/>
    </FavoritesProvider>
  );
};

export default WatchlistPage;
