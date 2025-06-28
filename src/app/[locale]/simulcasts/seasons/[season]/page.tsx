'use client';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_ANIMES_BY_SEASON } from '@/lib/queries/getAnimesBySeason';
import AnimeGrid from '@/app/components/cards/AnimeGrid';
import Loading from '@/app/[locale]/loading';
import { FavoritesProvider } from '@/app/[locale]/contexts/FavoritesContext';
import { useState } from 'react';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { ClientMetadata } from '@/app/components/metadata/ClientMetadata';

export default function SeasonPage() {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const season = params.season as string;
  const [seasonName, seasonYear] = season.split('-');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_ANIMES_BY_SEASON);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  // Filter animes by the current season and year
  const seasonAnimes = data.animes.filter((anime: any) => {
    const releaseYear = new Date(anime.releaseDate).getFullYear().toString();
    return anime.seasons.some((seasonData: any) => {
      return seasonData.season?.toUpperCase() === seasonName.toUpperCase() && 
             releaseYear === seasonYear;
    });
  });

  console.log('Season:', seasonName, 'Year:', seasonYear);
  console.log('Filtered Animes:', seasonAnimes);

  const getSeasonName = (season: string) => {
    return t(`simulcasts.season.seasons.${season.toLowerCase()}`);
  };

  const getSeasonOrder = (season: string) => {
    const order: { [key: string]: number } = {
      'winter': 1,
      'spring': 2,
      'summer': 3,
      'fall': 4
    };
    return order[season.toLowerCase()] || 0;
  };

  const getAvailableSeasons = () => {
    const seasons = ['spring', 'summer', 'fall', 'winter'];
    const years = ['2023', '2024', '2025'];
    const availableSeasons = [];

    for (const year of years) {
      for (const season of seasons) {
        const hasAnimes = data.animes.some((anime: any) => {
          const releaseYear = new Date(anime.releaseDate).getFullYear().toString();
          return anime.seasons.some((seasonData: any) => 
            seasonData.season?.toUpperCase() === season.toUpperCase() && 
            releaseYear === year
          );
        });

        if (hasAnimes) {
          availableSeasons.push({ season, year });
        }
      }
    }

    // Sort by year (descending) and then by season order
    return availableSeasons.sort((a, b) => {
      if (b.year !== a.year) {
        return parseInt(b.year) - parseInt(a.year);
      }
      return getSeasonOrder(b.season) - getSeasonOrder(a.season);
    });
  };

  const handleSeasonSelect = (selectedSeason: string, selectedYear: string) => {
    router.push(`/simulcasts/seasons/${selectedSeason}-${selectedYear}`);
    setIsDropdownOpen(false);
  };

  const renderDropdown = () => {
    const availableSeasons = getAvailableSeasons();

    return (
      <div className="relative">
        <ClientMetadata
          title="Crunchyroll - Confira Animes Em Simulcast"
          description="Confira Animes em Simulcast"
        />
        <div 
          className={`flex items-center px-4 py-2 cursor-pointer text-[#A0A0A0] hover:text-[#fff] 
          ${isDropdownOpen ? 'text-[#fff] bg-[#23262F]' : 'hover:bg-[#23262F]'}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7 10h10l-5 5z" />
          </svg>
          <span className="font-semibold text-[14px]">
            {`${getSeasonName(seasonName)} ${seasonYear}`.toUpperCase()}
          </span>
        </div>

        {isDropdownOpen && (
          <div className="absolute top-full right-0 w-48 bg-[#23262F] py-2 shadow-lg z-50 max-h-[300px] overflow-y-auto">
            {getAvailableSeasons().map(({ season, year }) => (
              <div
                key={`${season}-${year}`}
                className="px-4 py-2  text-[#A0A0A0] hover:text-[#fff] hover:bg-[#2F323D] cursor-pointer"
                onClick={() => handleSeasonSelect(season, year)}
              >
                {getSeasonName(season)} {year}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (seasonAnimes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">{t('simulcasts.season.title')}</h1>
          {renderDropdown()}
        </div>
        <p className="text-white">{t('simulcasts.season.noAnimesFound')}</p>
      </div>
    );
  }

  return (
    <div>
      <Header/>
      <FavoritesProvider>
        <div className="container mx-auto px-4 py-16 w-[80%]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-[26px] font-weight-700 text-[#FFFFFF] mb-4 md:mb-0">{t('simulcasts.season.title')}</h1>
            {renderDropdown()}
          </div>
          <AnimeGrid animes={seasonAnimes} />
        </div>
      </FavoritesProvider>
      <Footer/>
    </div>
  );
} 