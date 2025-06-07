import { Anime } from '@/types/anime';
import SimulcastCalendarHeader from "./SimulcastCalendarHeader";
import AnimeHoverModal from './AnimeHoverModal';
import { useState, useRef } from 'react';
import SimulcastCalendarFooter from './SimulcastCalendarFooter';

interface DayCarouselProps {
  days: string[];
  currentDay: string;
  groupedAnimes: { [key: string]: Anime[] };
  dayNames: { [key: string]: string };
}

const DayCarousel = ({ days, currentDay, groupedAnimes, dayNames }: DayCarouselProps) => {
  const [hoveredAnime, setHoveredAnime] = useState<Anime | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Define the correct order of days
  const orderedDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Map of abbreviated day names
  const abbreviatedDayNames: { [key: string]: string } = {
    'monday': 'SEG',
    'tuesday': 'TER',
    'wednesday': 'QUA',
    'thursday': 'QUI',
    'friday': 'SEX',
    'saturday': 'SÁB',
    'sunday': 'DOM'
  };

  return (
    <div className="w-[1280px] mx-auto">
      <SimulcastCalendarHeader/>
      {/* Horizontal day carousel */}
      <div className="flex justify-center mb-4 pb-2 mt-20">
        <div className="flex overflow-x-auto gap-24 max-w-[1280px]">
          {orderedDays.map((day, index) => (
            <button
              key={`${day}-${index}`}
              className={`px-8 py-2 font-bold rounded-full whitespace-nowrap ${
                day === currentDay
                  ? '= text-[#363231] hover:text-[#F78C25]'
                  : '= text-[#363231] hover:text-[#F78C25]'
              }`}
            >
              {day === currentDay ? 'HOJE' : abbreviatedDayNames[day]}
            </button>
          ))}
        </div>
      </div>

      {/* Anime lists in columns */}
      <div className="grid grid-cols-7 gap-12">
        {orderedDays.map((day) => (
          <div key={day} className="flex flex-col gap-4">
            {groupedAnimes[day]?.map((anime) => (
              <div
                key={anime.id}
                ref={(el) => {
                  cardRefs.current[anime.id] = el;
                }}
                className="flex flex-col gap-2 p-2 w-full relative"
                onMouseEnter={() => setHoveredAnime(anime)}
                onMouseLeave={() => setHoveredAnime(null)}
              >
                <h3 className="text-sm text-[#363231] font-semibold line-clamp-2">{anime.name}</h3>
                <img
                  src={anime.imagePoster}
                  alt={anime.name}
                  className="w-full aspect-[2/3] object-cover"
                />
                {hoveredAnime?.id === anime.id && cardRefs.current[anime.id] && (
                  <AnimeHoverModal 
                    anime={anime} 
                    triggerRef={{ current: cardRefs.current[anime.id] }} 
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <SimulcastCalendarFooter/>
    </div>
  );
};

export default DayCarousel; 