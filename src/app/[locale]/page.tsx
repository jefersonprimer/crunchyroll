"use client";

import { useParams } from "next/navigation";
import React, { memo, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Header from "../components/layout/Header";
import PageLoading from "../components/loading/PageLoading";
import AnimeCarouselFullScreen from "../components/carousel/AnimeCarouselFullScreen";
import AnimeCarouselLancamentos from "../components/carousel/AnimeCarouselLancamentos";
import SpacedSection from "../components/layout/SpacedSection";
import OutdoorCard from "../components/outdoors/OutdoorCard";
import HistoryCarousel from "../components/carousel/HistoryCarousel";
import AnimeCarouselByDay from "../components/carousel/AnimeCarouselByDay";
import AnimeCarouselPopularSeason from "../components/carousel/AnimeCarouselPopularSeason";
import AnimeCarouselPopular from "../components/carousel/AnimeCarouselPopular";
import AnimeCarouselDub from "../components/carousel/AnimeCarouselDub";
import Outdoor from "../components/outdoors/Outdoor";
import FavoritesCarousel from "../components/carousel/FavoritesCarousel";
import NewsSection from "../components/sections/NewsSection";
import Episodios from "../components/cards/Episodios";
import Footer from "../components/layout/Footer";


const HomePage = () => {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("fallback_recommendation");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <>
        <Header />
        <div style={{ minHeight: '759.94px', width: '100%' }} />
        <PageLoading />
      </>
    );
  }

  return (
    <>
      <Header />
      <AnimeCarouselFullScreen />
      <AnimeCarouselLancamentos className="relative z-[2]  backdrop-blur-sm" />

      <HistoryCarousel />

      <SpacedSection>
        <div className="flex justify-center items-center text-center flex-col">
          <OutdoorCard
            link="https://www.crunchyroll.com/pt-br/series/G9VHN9QXQ/unnamed-memory"
            imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/CurationAssets/Anyway%20I'm%20Falling%20in%20Love%20with%20You/SEASON%201/MARKETING%20BANNER/AnywayImFallinginLoveWithYou-S1-KV1-Banner-2100x700-PT.png"
          />
        </div>
      </SpacedSection>

      <SpacedSection>
        <AnimeCarouselByDay />
      </SpacedSection>

      <SpacedSection className="relative z-[2] backdrop-blur-sm">
        <AnimeCarouselPopularSeason />
      </SpacedSection>

      <SpacedSection className="relative z-[2] backdrop-blur-sm">
        <AnimeCarouselPopular />
      </SpacedSection>

      {/* <SpacedSection>
        <AnimeCarouselNextSeason />
      </SpacedSection> */}

      <SpacedSection>
        <AnimeCarouselDub />
      </SpacedSection>

      {/* <SpacedSection>
        <MovieCarousel />
      </SpacedSection> */}

      <SpacedSection>
        <Outdoor
          imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/CurationAssets/Anyway%20I'm%20Falling%20in%20Love%20with%20You/SEASON%201/MARKETING%20BANNER/AnywayImFallinginLoveWithYou-S1-KV1-Banner-2100x700-PT.png"
          audiotype="Dub | Leg"
          description="Milhares de anos após um misterioso fenômeno transformar a humanidade inteira em pedra, desperta um garoto extraordinariamente inteligente e motivado pela ciência - Senku Ishigami. Diante de um mundo de pedra e do colapso generalizado da civilização, Senku decide usar sua..."
          buttonLink="https://www.crunchyroll.com/pt-br/series/G9VHN9QXQ/unnamed-memory"
          addToQueueLink="#"
          title="The Apothecary Diaries"
        />
      </SpacedSection>

      <SpacedSection>
        <FavoritesCarousel />
      </SpacedSection>

      <SpacedSection>
        <Episodios />
      </SpacedSection>

      <SpacedSection>
        <NewsSection />
      </SpacedSection>

      <SpacedSection>
        <div className="flex justify-center items-center text-center flex-col">
          <OutdoorCard
            link="https://www.crunchyroll.com/pt-br/series/G9VHN9QXQ/unnamed-memory"
            imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/CurationAssets/Anyway%20I'm%20Falling%20in%20Love%20with%20You/SEASON%201/MARKETING%20BANNER/AnywayImFallinginLoveWithYou-S1-KV1-Banner-2100x700-PT.png"
          />
        </div>
      </SpacedSection>

      <div className="flex justify-center items-center py-[50px] px-[80px] pb-[80px]">
        <div className="text-center">
          <img
            className="max-w-full h-auto"
            src="https://www.crunchyroll.com/build/assets/img/home/yuzu.png"
            srcSet="https://www.crunchyroll.com/build/assets/img/home/yuzu@2x.png 2x"
            alt="Yuzu."
          />
          <h3 className="pb-[40px]">
            {t('title')} <br />
            {t('subtitle')}
          </h3>
          <a
            className="mt-[20px] no-underline"
            data-t="view-all-btn"
            href={`/${locale}/videos/popular`}
          >
            <span className="py-[10px] px-[20px] border-2 border-solid border-[#ff640a] text-[#ff640a] no-underline">
              {t('button')}
            </span>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;

