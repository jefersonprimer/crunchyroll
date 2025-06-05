"use client";

import React, { memo, useState, useEffect } from "react";
import { FavoritesProvider, useFavorites } from "./contexts/FavoritesContext";
import { ListsProvider } from "./contexts/ListsContext";
import { HistoryProvider, useHistory } from "./contexts/HistoryContext";
import PageLoading from "./components/loading/PageLoading";

import AnimeCarouselFullScreen from "./components/carousel/AnimeCarouselFullScreen";
import AnimeCarouselLancamentos from "./components/carousel/AnimeCarouselLancamentos";
import AnimeCarouselByDay from "./components/carousel/AnimeCarouselByDay";
import AnimeCarouselDub from "./components/carousel/AnimeCarouselDub";
import AnimeCarouselNextSeason from "./components/carousel/AnimeCarouselNextSeason";
import AnimeCarouselPopular from "./components/carousel/AnimeCarouselPopular";
import AnimeCarouselPopularSeason from "./components/carousel/AnimeCarouselPopularSeason";
import MovieCard from "./components/cards/MovieCard";
import Episodios from "./components/cards/Episodios";
import OutdoorCard from "./components/outdoors/OutdoorCard";
import Outdoor from "./components/outdoors/Outdoor";
import FavoritesCarousel from "./components/carousel/FavoritesCarousel";
import HistoryCarousel from "./components/carousel/HistoryCarousel";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Memoize the HistorySection component
const HistorySection = memo(() => {
  const { watchedEpisodes } = useHistory();

  if (!watchedEpisodes || watchedEpisodes.length === 0) {
    return null;
  }

  return <HistoryCarousel />;
});

HistorySection.displayName = 'HistorySection';

// Memoize the FavoritesSection component
const FavoritesSection = memo(() => {
  const { favorites } = useFavorites();

  return <>{favorites.length > 0 && <FavoritesCarousel />}</>;
});

FavoritesSection.displayName = 'FavoritesSection';

// Componente principal
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <ApolloProvider client={client}>
      <FavoritesProvider>
        <ListsProvider>
          <Header />
          <AnimeCarouselFullScreen />
          <AnimeCarouselLancamentos className="relative z-[2] mt-[-25vh] backdrop-blur-sm" />

          <HistoryProvider>
            <HistorySection />
          </HistoryProvider>

          <div className="flex justify-center items-center text-center flex-col my-[10px]">
            <OutdoorCard
              link="https://www.crunchyroll.com/pt-br/series/G9VHN9QXQ/unnamed-memory"
              imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/CurationAssets/Anyway%20I'm%20Falling%20in%20Love%20with%20You/SEASON%201/MARKETING%20BANNER/AnywayImFallinginLoveWithYou-S1-KV1-Banner-2100x700-PT.png"
            />
          </div>

          <AnimeCarouselByDay className="my-[10px]" />
          <AnimeCarouselPopularSeason className="relative z-[2] backdrop-blur-sm my-[10px]" />
          <AnimeCarouselPopular className="relative z-[2] backdrop-blur-sm my-[10px]" />
          <AnimeCarouselNextSeason className="my-[10px]" />
          <AnimeCarouselDub className="my-[10px]" />
          <MovieCard className="my-[10px]" />

          <Outdoor
            imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/CurationAssets/Anyway%20I'm%20Falling%20in%20Love%20with%20You/SEASON%201/MARKETING%20BANNER/AnywayImFallinginLoveWithYou-S1-KV1-Banner-2100x700-PT.png"
            audiotype="Dub | Leg"
            description="Milhares de anos após um misterioso fenômeno transformar a humanidade inteira em pedra, desperta um garoto extraordinariamente inteligente e motivado pela ciência - Senku Ishigami. Diante de um mundo de pedra e do colapso generalizado da civilização, Senku decide usar sua..."
            buttonLink="https://www.crunchyroll.com/pt-br/series/G9VHN9QXQ/unnamed-memory"
            addToQueueLink="#"
            title="The Apothecary Diaries"
          />

          <div className="my-[10px]">
            <FavoritesSection />
          </div>

          <div className="my-[10px]">
            <Episodios />
          </div>

          <div className="flex justify-center items-center text-center flex-col my-[10px]">
            <OutdoorCard
              link="https://www.crunchyroll.com/pt-br/series/G9VHN9QXQ/unnamed-memory"
              imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/CurationAssets/Anyway%20I'm%20Falling%20in%20Love%20with%20You/SEASON%201/MARKETING%20BANNER/AnywayImFallinginLoveWithYou-S1-KV1-Banner-2100x700-PT.png"
            />
          </div>
        </ListsProvider>

        <div className="flex justify-center items-center py-[50px] px-[80px] pb-[80px]">
          <div className="text-center">
            <img
              className="max-w-full h-auto"
              src="https://www.crunchyroll.com/build/assets/img/home/yuzu.png"
              srcSet="https://www.crunchyroll.com/build/assets/img/home/yuzu@2x.png 2x"
              alt="Yuzu."
            />
            <h3 className="pb-[40px]">
              Ainda está procurando algo pra assistir? <br />
              Confira o nosso acervo completo
            </h3>
            <a
              className="mt-[20px] no-underline"
              data-t="view-all-btn"
              href="/videos/popular"
            >
              <span className="py-[10px] px-[20px] border-2 border-solid border-[#ff640a] text-[#ff640a] no-underline">
                VER TUDO
              </span>
            </a>
          </div>
        </div>
        <Footer />
      </FavoritesProvider>
    </ApolloProvider>
  );
};

export default HomePage;
