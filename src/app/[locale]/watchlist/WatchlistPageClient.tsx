'use client';

import React, { useState, useEffect } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import TabsNavigation from '@/app/components/layout/TabsNavigation';
import { FilterProvider } from '@/app/[locale]/contexts/FilterContext';
import { CardFavoritesProvider } from '@/app/[locale]/contexts/CardFavoritesContext';
import AnimeCard from './components/AnimeCard';
import FilterableHeader from './components/FilterableHeader';
import type { Anime } from '@/types/anime';
import Link from 'next/link';
import Image from 'next/image';
import { ClientMetadata } from '@/app/components/metadata/ClientMetadata';

const WatchlistContent = () => {
  const { favorites, removeFavorite } = useFavorites();
  const tTabs = useTranslations('Watchlist');

  const handleRemoveFavorite = (id: string) => {
    removeFavorite(id);
  };

  return (
    <CardFavoritesProvider>
      <FilterProvider>
        <div className='w-full min-h-[400px] flex items-center justify-center'>
          {favorites.length === 0 ? (
            <div className='text-center'>
              <Image
                src="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-watchlist.png"
                alt={tTabs('emptyMessage')}
                width={300}
                height={200}
                className='mb-[1rem] mx-auto'
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <h4 className='text-[#666] mb-[1rem] leading-[1.5]' dangerouslySetInnerHTML={{ __html: tTabs('emptyMessage') }} />
              <div className='mt-[1rem]'>
                <Link href="/" className='inline-block py-[0.75rem] px-[1.5rem] bg-[#FF640A] text-white no-underline rounded font-weight-600 hover:text-[#E55A00]'>
                  {tTabs('backToHome')}
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <div>
                <FilterableHeader/>
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {favorites.map((anime: Anime) => (
                    <AnimeCard
                      key={anime.id}
                      anime={anime}
                      onRemove={handleRemoveFavorite}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </FilterProvider>
    </CardFavoritesProvider>
  );
};

const WatchlistPageClient = () => {
  const [selectedTab, setSelectedTab] = useState('fila');
  const router = useRouter();
  const tTabs = useTranslations('Watchlist');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      if (pathname.includes('crunchylists')) setSelectedTab('crunchylists');
      else if (pathname.includes('history')) setSelectedTab('historico');
      else setSelectedTab('fila');
    }
  }, []);

  const tabRoutes: Record<string, string> = {
    fila: '/watchlist',
    crunchylists: '/crunchylists',
    historico: '/history',
  };

  const handleTabClick = (tab: string) => {
    if (tabRoutes[tab]) router.push(tabRoutes[tab]);
  };

  return (
    <div>
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
        <div className="flex justify-center items-center w-full h-auto">
          <div className="w-full h-auto">
            <WatchlistContent />
          </div>
        </div>
      </TabsNavigation>
    </div>
  );
};

export default WatchlistPageClient;
