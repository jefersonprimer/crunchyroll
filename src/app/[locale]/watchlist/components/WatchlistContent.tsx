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

const WatchlistContent = () => {
    const { favorites, removeFavorite } = useFavorites();
    const tTabs = useTranslations('WatchlistPage');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleRemoveFavorite = (id: string) => {
      removeFavorite(id);
    };

    if (!mounted) {
      return null;
    }

    return (
      <CardFavoritesProvider>
        <FilterProvider>
          <div className='w-full h-auto flex items-center justify-center'>
            {favorites.length === 0 ? (
              <>
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
              </>
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

export default WatchlistContent;