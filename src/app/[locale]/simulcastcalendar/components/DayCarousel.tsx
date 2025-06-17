import { Anime } from '@/types/anime';
import { Episode } from '@/types/episode';
import SimulcastCalendarHeader from "./SimulcastCalendarHeader";
import AnimeHoverModal from './AnimeHoverModal';
import { useState, useRef, useEffect } from 'react';
import SimulcastCalendarFooter from './SimulcastCalendarFooter';
import { useTranslations } from 'next-intl';

interface DayCarouselProps {
  days: string[];
  currentDay: string;
  groupedAnimes: { [key: string]: Anime[] };
  dayNames: { [key: string]: string };
}

const DayCarousel = ({ days, currentDay, groupedAnimes, dayNames }: DayCarouselProps) => {
  const t = useTranslations('DayCarousel');
  const [hoveredAnime, setHoveredAnime] = useState<Anime | null>(null);
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Define the correct order of days
  const orderedDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Map of abbreviated day names
  const abbreviatedDayNames: { [key: string]: string } = {
    'monday': t('days.mondayShort'),
    'tuesday': t('days.tuesdayShort'),
    'wednesday': t('days.wednesdayShort'),
    'thursday': t('days.thursdayShort'),
    'friday': t('days.fridayShort'),
    'saturday': t('days.saturdayShort'),
    'sunday': t('days.sundayShort')
  };

  // Function to format the time from createdAt
  const formatEpisodeTime = (createdAt: string): string => {
    const date = new Date(createdAt);
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Function to get the latest episode for an anime
  const getLatestEpisode = (anime: Anime): Episode | undefined => {
    if (!anime.episodes || anime.episodes.length === 0) return undefined;
    return anime.episodes.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  };

  // Function to check if anime airs on the selected day
  const isAnimeAiringOnDay = (anime: Anime, day: string): boolean => {
    return anime.airingDay?.toLowerCase() === day.toLowerCase();
  };

  return (
    <div className="w-[1280px] mx-auto">
      <SimulcastCalendarHeader/>
      {/* Horizontal day carousel and anime columns */}
      <div className="grid grid-cols-7 gap-1"> {/* estava gap-12  */}
        {orderedDays.map((day) => (
          <div key={day} className="flex flex-col">
            <div className={`flex justify-center ${day === selectedDay ? 'bg-[#FFFFFF] rounded-t-lg' : ''}`}>
              <button
                onClick={() => setSelectedDay(day)}
                className={`px-8 py-2 font-bold rounded-full whitespace-nowrap ${
                  day === selectedDay
                    ? 'text-[#363231] hover:text-[#F78C25]'
                    : 'text-[#363231] hover:text-[#F78C25]'
                }`}
              >
                {day === currentDay ? t('today') : abbreviatedDayNames[day]}
              </button>
            </div>
            <div className={`flex flex-col gap-4 ${day === selectedDay ? 'bg-[#FFFFFF] p-4 rounded-b-lg' : ''}`}>
              {groupedAnimes[day]?.map((anime) => {
                const latestEpisode = getLatestEpisode(anime);
                const isDaySelected = day === selectedDay;
                
                return (
                  <div
                    key={anime.id}
                    ref={(el) => {
                      cardRefs.current[anime.id] = el;
                    }}
                    className="flex flex-col gap-2 p-2 w-full relative items-start"
                    onMouseEnter={() => setHoveredAnime(anime)}
                    onMouseLeave={() => setHoveredAnime(null)}
                  >
                    {latestEpisode && (
                      <div className="text-xs text-[#A09895] font-medium">
                        {formatEpisodeTime(latestEpisode.createdAt).toLowerCase()}
                      </div>
                    )}
                    <h3 className="text-sm text-[#363231] font-semibold line-clamp-2">{anime.name.toLocaleUpperCase()}</h3>
                    {latestEpisode && (
                      <div className="text-xs text-[#A09895] font-medium">
                        {t('episodeAvailable', { number: anime.totalEpisodes ?? 0 })}
                      </div>
                    )}
                    <img
                      src={isDaySelected && latestEpisode ? latestEpisode.image : anime.imagePoster}
                      alt={anime.name}
                      className={`object-cover ${
                        isDaySelected && latestEpisode 
                          ? 'w-[167.45px] h-[94.19px]' 
                          : 'w-[100px] h-[150px] aspect-[2/3]'
                      }`}
                    />
                    {hoveredAnime?.id === anime.id && cardRefs.current[anime.id] && (
                      <AnimeHoverModal 
                        anime={anime} 
                        triggerRef={{ current: cardRefs.current[anime.id] }} 
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <SimulcastCalendarFooter/>
    </div>
  );
};

export default DayCarousel; 

