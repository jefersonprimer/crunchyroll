'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FilterProvider } from '@/app/[locale]/contexts/FilterContext';
import { CardFavoritesProvider } from '@/app/[locale]/contexts/CardFavoritesContext';
import FilterableHeader from '../components/FilterableHeader';
import { useFavorites } from '../../contexts/FavoritesContext';
import type { Anime } from '@/types/anime';
import AnimeCard from './AnimeCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SkeletonAnimeCard = () => (
  <div className="flex justify-center items-center flex-col w-[255px] h-auto overflow-hidden">
    <div className="flex flex-col w-[240px] h-auto overflow-hidden">
      <div className="w-[240px] h-[135px] relative my-0 mx-auto">
        
        <div className="bg-[#141519] animate-pulse absolute top-0 left-0 w-full h-full " />
      </div>
      <div className="py-[1rem] px-0 flex flex-col w-[240px] h-auto ">
        <div className="bg-[#141519] animate-pulse w-[80%] h-[20px] m-0 " />
        <div className="bg-[#141519] animate-pulse w-[50%] h-[16px] m-0 mt-[12px] "/>
      </div>
    </div>
  </div>
);

const WatchlistContent = () => {
    const { favorites, removeFavorite } = useFavorites();
    const tTabs = useTranslations('WatchlistPage');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (favorites !== undefined) {
            setLoading(false);
        }
    }, [favorites]);

    const handleRemoveFavorite = (id: string) => {
      removeFavorite(id);
    };

    if (loading) {
      return (
        <div className="w-full h-auto flex items-center justify-center">
          <div className="flex justify-center w-full">
            <div>
              <div className="flex justify-between items-center gap-4  w-full min-w-[445px]  max-w-[1050px] h-[44px] mb-2 mx-auto">
                <div className="flex-1 min-w-0">
                  <div className="h-10 w-44 lg:w-88 bg-[#141519] animate-pulse" />
                </div>
                <div className="flex gap-2">
                  <div className="w-16 lg:w-32 h-10 bg-[#141519] animate-pulse" />
                  <div className="w-16 lg:w-32 h-10 bg-[#141519] animate-pulse" />
                </div>
              </div>
           
              <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <SkeletonAnimeCard key={idx} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <CardFavoritesProvider>
        <FilterProvider>
          <div className='w-full h-auto flex flex-col items-center justify-center'>
            {favorites.length === 0 ? (
              <div className="w-full mt-1 md:max-w-[1050px] mx-auto border border-dashed border-gray-400 p-8 flex flex-col items-center">
                <Image
                  src="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-watchlist.png"
                  alt={tTabs('emptyMessage')}
                  width={240}
                  height={239}
                  className='mb-[6px] mx-auto'
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <h4 className="text-[#dadada] mb-[1rem] leading-[1.5] w-60">{tTabs('emptyMessage')}</h4>
                <div className='mt-[10px]'>
                  <Link href="/" className="inline-block py-2 px-4 bg-[#FF640A] opacity-90 hover:opacity-100 cursor-pointer">
                    <span className="text-sm text-black no-underline font-semibold uppercase">{tTabs('backToHome')}</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <div>
                  <FilterableHeader/>
                  <div className="w-full md:max-w-6xl mx-auto md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 lg:px-0">
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

export default WatchlistContent;