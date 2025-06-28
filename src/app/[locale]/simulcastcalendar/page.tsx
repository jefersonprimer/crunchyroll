"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import { Anime } from "@/types/anime";
import Header from "./components/Header";
import DayCarousel from "./components/DayCarousel";
import Loading from "../loading";
import Footer from "./components/Footer";
import { FavoritesProvider } from '@/app/[locale]/contexts/FavoritesContext';
import { ClientMetadata } from "@/app/components/metadata/ClientMetadata";

const CalendarPage = () => {
  const { data, loading, error } = useQuery(GET_ANIMES);
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    const currentDate = new Date();
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const currentDayIndex = currentDate.getDay();
    setCurrentDay(daysOfWeek[currentDayIndex]);
  }, []);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const groupAnimesByDay = () => {
    const groupedAnimes: { [key: string]: Anime[] } = {};
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    // Initialize all days with empty arrays
    daysOfWeek.forEach(day => {
      groupedAnimes[day] = [];
    });

    // Group animes by their airing day
    if (data?.animes) {
      data.animes.forEach((anime: any) => {
        const day = anime.airingDay?.toLowerCase() || "unknown";
        if (day !== "unknown") {
          const mappedAnime: Anime = {
            id: anime.id,
            publicCode: anime.publicCode,
            slug: anime.slug,
            name: anime.name,
            audioType: anime.audioType,
            imageCardCompact: anime.imageCardCompact,
            imagePoster: anime.imagePoster,
            rating: anime.rating,
            score: anime.score,
            synopsis: anime.synopsis,
            totalEpisodes: anime.totalEpisodes,
            seasons: anime.seasons,
            episodes: anime.episodes,
            createdAt: anime.createdAt,
            updatedAt: anime.updatedAt,
            isPopular: anime.isPopular,
            isNewRelease: anime.isNewRelease
          };

          groupedAnimes[day].push(mappedAnime);
        }
      });
    }

    return groupedAnimes;
  };

  const groupedAnimes = groupAnimesByDay();
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  // Reorder days to start with current day
  const currentDayIndex = daysOfWeek.indexOf(currentDay);
  const orderedDays = [
    currentDay,
    ...daysOfWeek.slice(currentDayIndex + 1),
    ...daysOfWeek.slice(0, currentDayIndex),
  ];

  const dayNames: { [key: string]: string } = {
    sunday: "Domingo",
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
  };

  return (
    <div>
      <ClientMetadata
        title="Crunchyroll - Calendário de Transmissão Simultânea"
        description="Calendário de Transmissão Simultânea"
      />
      <Header/>
      <div className="flex flex-col items-center  p-4 min-h-screen text-center box-border bg-[#F2F2F2]">
        <div >
          <FavoritesProvider>
            <DayCarousel
              days={orderedDays}
              currentDay={currentDay}
              groupedAnimes={groupedAnimes}
              dayNames={dayNames}
            />
          </FavoritesProvider>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default CalendarPage;


