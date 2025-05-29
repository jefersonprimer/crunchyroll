"use client";

import { useEffect, useState } from "react";
import useFetchAnimes from "@/app/hooks/useFetchAnimes";
import { Anime } from "@/types/anime";
import OldAnimeCarousel from "../components/carousel/OldAnimeCarousel";

const CalendarPage = () => {
  const { animes, loading, error } = useFetchAnimes();
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    const currentDate = new Date();
    const daysOfWeek = [
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
      "Domingo",
    ];
    const currentDayIndex = currentDate.getDay();
    setCurrentDay(daysOfWeek[(currentDayIndex + 6) % 7]);
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const groupAnimesByDay = () => {
    const groupedAnimes: { [key: string]: Anime[] } = {};
    animes.forEach((anime) => {
      const day = anime.airingDay;
      if (!groupedAnimes[day]) {
        groupedAnimes[day] = [];
      }
      groupedAnimes[day].push(anime);
    });
    return groupedAnimes;
  };

  const groupedAnimes = groupAnimesByDay();
  const orderedDays = [
    currentDay,
    ...[
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
      "Domingo",
    ].filter((day) => day !== currentDay),
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen text-center box-border">
      <h1 className="p-2 text-2xl md:text-xl sm:text-lg">Calendário</h1>
      {orderedDays.map((day) => {
        const dayAnimes = groupedAnimes[day] || [];
        return (
          <div key={day} className="mb-4 w-11/12 md:w-full sm:mb-3 xs:mb-2">
            <h2 className="p-2 text-lg md:text-base sm:text-sm">{day}</h2>
            <OldAnimeCarousel animes={dayAnimes} itemsPerPage={5} />
          </div>
        );
      })}
    </div>
  );
};

export default CalendarPage;
