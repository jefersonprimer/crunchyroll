"use client";

import AnimeCarouselFullScreen from "../components/carousel/AnimeCarouselFullScreen";
import AnimeCarouselReleases from "../components/carousel/AnimeCarouselReleases";
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
import EpisodeTimeline from "../components/sections/EpisodeTimeline";
import Footer from "../components/layout/Footer";
import YuzuSection from "../components/layout/YuzuSection";
import CookieBanner from "../components/modals/CookieBanner";
import Header from "../components/layout/Header";
import TermsUpdateBanner from "../components/modals/TermsUpdateBanner";


const HomePage = () => {

  return (
    <>
      <Header />
      <TermsUpdateBanner />
      <AnimeCarouselFullScreen />
      <AnimeCarouselReleases/>
      <HistoryCarousel />
      
      <SpacedSection>
        <OutdoorCard
          link="https://www.crunchyroll.com/pt-br/series/G9VHN9QXQ/unnamed-memory"
          imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1350/CurationAssets/Dekin%20no%20Mogura%20The%20Earthbound%20Mole/SEASON%201/MARKETING%20BANNER/DekinNoMoguraTheEarthboundMole-S1C1-KV1-(Character)-Banner-2100x700-PT.png"
        />
      </SpacedSection>

      <SpacedSection>
        <AnimeCarouselByDay />
      </SpacedSection>

      <SpacedSection>
        <AnimeCarouselPopularSeason />
      </SpacedSection>

      <SpacedSection>
        <AnimeCarouselPopular />
      </SpacedSection>

      <SpacedSection>
        <AnimeCarouselDub />
      </SpacedSection>

      <SpacedSection>
        <Outdoor
          imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=600/catalog/crunchyroll/a249096c7812deb8c3c2c907173f3774.jpg"
          audiotype="Leg | Dub"
          description="Embarque em uma jornada com One Piece. A épica série de anime criada pelo renomado Eiichiro Oda é um fenômeno, cativando corações de fãs de várias gerações ao longo de seus 25 anos de existência. Esta aventura em alto-mar é..."
          buttonLink="https://www.crunchyroll.com/pt-br/series/G9VHN9QXQ/unnamed-memory"
          addToQueueLink="#"
          title="One Piece"
        />
      </SpacedSection>

      <SpacedSection>
        <FavoritesCarousel />
      </SpacedSection>

      <SpacedSection>
        <EpisodeTimeline />
      </SpacedSection>

      {/* <SpacedSection>
        <NewsSection />
      </SpacedSection> */}

      <SpacedSection>
        <OutdoorCard
          link="https://www.crunchyroll.com/pt-br/series/G9VHN9QXQ/unnamed-memory"
          imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/CurationAssets/Anyway%20I'm%20Falling%20in%20Love%20with%20You/SEASON%201/MARKETING%20BANNER/AnywayImFallinginLoveWithYou-S1-KV1-Banner-2100x700-PT.png"
        />
      </SpacedSection>

      <YuzuSection />
      <Footer />
      <CookieBanner />
    </>
  );
};

export default HomePage;
