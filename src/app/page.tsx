"use client";

import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ListsProvider } from "./contexts/ListsContext";

import AnimeCarouselFullScreen from "./components/cards/AnimeCarouselFullScreen";
import AnimeCarouselLancamentos from "./components/cards/AnimeCarouselLancamentos";
import AnimeCarouselByDay from "./components/cards/AnimeCarouselByDay";
import AnimeCarouselDub from "./components/cards/AnimeCarouselDub";
import AnimeCarouselNextSeason from "./components/cards/AnimeCarouselNextSeason";
import AnimeCarouselPopular from "./components/cards/AnimeCarouselPopular";
import AnimeCarouselPopularSeason from "./components/cards/AnimeCarouselPopularSeason";
import MovieCard from "./components/cards/MovieCard";

import Episodios from "./components/cards/Episodios";
import OutdoorCard from "./components/cards/OutdoorCard";
import Outdoor from "./components/cards/Outdoor";
import FavoritesCarousel from "./components/cards/FavoritesCarousel";

import { useFavorites } from "./contexts/FavoritesContext";
import HistoryCarousel from "./components/cards/HistoryCarousel";
import { HistoryProvider, useHistory } from "./contexts/HistoryContext";

const HomePage = () => {
  return (
    <FavoritesProvider>
      <ListsProvider>
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
          title={"The Apothecary Diaries"}
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
    </FavoritesProvider>
  );
};

// Componentes auxiliares permanecem iguais
const HistorySection = () => {
  const { history } = useHistory();

  if (history.length === 0) {
    return null;
  }

  return <HistoryCarousel />;
};

const FavoritesSection = () => {
  const { favorites } = useFavorites();

  return <>{favorites.length > 0 && <FavoritesCarousel />}</>;
};

export default HomePage;
