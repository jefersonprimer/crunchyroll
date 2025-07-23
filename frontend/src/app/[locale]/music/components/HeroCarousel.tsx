"use client"

import React, { useState, useRef, useEffect } from 'react';

const HERO_CAROUSEL_BG_COLORS = [
  '#FB9A13', // 1º card
  '#2ABDBB', // 2º card
  '#FBA615', // 3º card
  '#2ABDBB', // 4º card
  '#FD8910', // 5º card
];

// Helper component for the SVG backgrounds to keep the main component cleaner
const HeroCarouselBackgrounds: React.FC<{ activeVariant: number }> = ({ activeVariant }) => {
  return (
    <div
      className="absolute inset-0 overflow-hidden transition-colors duration-500"
      style={{ background: HERO_CAROUSEL_BG_COLORS[activeVariant] }}
      data-t="hero-carousel-bg-color"
    />
  );
};

interface CarouselItem {
  tallImageSrc: string;
  tallImageAlt: string;
  wideImageSrc: string;
  wideImageAlt: string;
  description: string;
  ariaLabel: string;
  href: string;
  tabTitle: string;
}

const carouselItems: CarouselItem[] = [
  {
    tallImageSrc: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=90/cr/portrait_poster/755215cd-0b31-4d14-b9c5-6edd1cff137d.png",
    tallImageAlt: "okazakitaiiku",
    wideImageSrc: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=90/cr/landscape_poster/65cab559-ddc9-455f-9ef4-67b686865603.png",
    wideImageAlt: "okazakitaiiku",
    description: "Tema de MASHLE: Magic and Muscles e Detectives These Days Are Crazy!",
    ariaLabel: "okazakitaiiku",
    href: "/pt-br/artist/MA488A2B9F/okazakitaiiku?utm_source=cap_cr&utm_medium=carousel_mlp&utm_campaign=music-okazakitaiiku_en&referrer=cap_cr_carousel_mlp_music-okazakitaiiku",
    tabTitle: "okazakitaiiku",
  },
  {
    tallImageSrc: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=90/cr/portrait_poster/e6260fd5-e891-4dc9-b661-563ff958c8a6.png",
    tallImageAlt: "SixTONES",
    wideImageSrc: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=90/cr/landscape_poster/b106d0e7-6fdb-46c5-b969-b9f392b34a75.png",
    wideImageAlt: "SixTONES",
    description: "Descubra uma nova música favorita junto com SixTONES!",
    ariaLabel: "SixTONES",
    href: "/pt-br/artist/MA82C9000F/sixtones?utm_source=cap_cr&utm_medium=carousel_mlp&utm_campaign=music-sixtones_en&referrer=cap_cr_carousel_mlp_music-sixtones",
    tabTitle: "SixTONES",
  },
  {
    tallImageSrc: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=90/cr/portrait_poster/bb1d9f7d-0575-4843-9a10-b86f09ee8778.png",
    tallImageAlt: "Vaundy",
    wideImageSrc: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=90/cr/landscape_poster/598ad7bb-ce54-4453-919c-b95114b621f9.png",
    wideImageAlt: "Vaundy",
    description: "Novos videoclipes de Vaundy, de Chainsaw Man e Ranking of Kings",
    ariaLabel: "Vaundy",
    href: "/pt-br/artist/MA17689609/vaundy?utm_source=cap_cr&utm_medium=carousel_mlp&utm_campaign=music-vaundy_en&referrer=cap_cr_carousel_mlp_music-vaundy",
    tabTitle: "Crunchyroll: Vaundy",
  },
  {
    tallImageSrc: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=90/cr/portrait_poster/6add6c5a-892e-40ae-8ad2-d8134dc2ba6b.png",
    tallImageAlt: "YOASOBI",
    wideImageSrc: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=90/cr/landscape_poster/b5ce62fd-be3c-41b8-863c-1a801ca1941b.png",
    wideImageAlt: "YOASOBI",
    description: "Tema de Witch Watch, Off and Monster Season e Frieren: Beyond Journey's End",
    ariaLabel: "YOASOBI",
    href: "/pt-br/artist/MA28286FC2/yoasobi?utm_source=cap_cr&utm_medium=carousel_mlp&utm_campaign=music-yoasobi_en&referrer=cap_cr_carousel_mlp_music-yoasobi",
    tabTitle: "YOASOBI",
  },
  {
    tallImageSrc: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=90/cr/portrait_poster/ceff04f5-17b0-43b5-a86d-460db9774f0b.png",
    tallImageAlt: "Omoinotake",
    wideImageSrc: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=90/cr/landscape_poster/b3f0c2cc-2ccd-4ba6-86b0-2f8c5e3268cc.png",
    wideImageAlt: "Omoinotake",
    description: "Shows e clipes de Omoinotake na Crunchyroll!",
    ariaLabel: "Omoinotake",
    href: "/pt-br/artist/MA67DE4CA7/omoinotake?utm_source=cap_cr&utm_medium=carousel_mlp&utm_campaign=music-omoinotake_en&referrer=cap_cr_carousel_mlp_music-omoinotake",
    tabTitle: "Crunchyroll: Omoinotake",
  },
];

const HeroCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Initial active slide based on the provided HTML
  const [progress, setProgress] = useState(0); // Progresso do slide atual (0-100)
  const scrollerRef = useRef<HTMLDivElement>(null);
  const autoplayDuration = 8000; // 8000ms from the original HTML
  const autoplayIntervalRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const totalItems = carouselItems.length;

  const scrollToItem = (index: number) => {
    if (scrollerRef.current) {
      const itemWidth = scrollerRef.current.children[0]?.clientWidth || 0;
      scrollerRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const startAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    autoplayIntervalRef.current = window.setInterval(goToNext, autoplayDuration);
  };

  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  };

  // Progress bar logic
  const startProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    setProgress(0);
    const interval = 20; // ms
    const step = (interval / autoplayDuration) * 100;
    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          clearInterval(progressIntervalRef.current!);
          goToNext();
          return 0;
        }
        return prev + step;
      });
    }, interval);
  };

  const stopProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  useEffect(() => {
    scrollToItem(activeIndex);
    startAutoplay();
    startProgress();
    return () => {
      stopAutoplay();
      stopProgress();
    };
  }, [activeIndex]);

  // Parar/continuar progresso com mouse
  const handleMouseEnter = () => {
    stopAutoplay();
    stopProgress();
  };
  const handleMouseLeave = () => {
    startAutoplay();
    startProgress();
  };

  return (
    <div className="mb-10">
      <div
        className="relative w-full overflow-hidden"
        data-t="hero-carousel"
        aria-label="Carrossel Hero"
        role="region"
        style={{ '--autoplay-duration': `${autoplayDuration}ms`, '--js-autoplay-state': 'running' } as React.CSSProperties}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 z-0">
          <HeroCarouselBackgrounds activeVariant={activeIndex} /> {/* Cor de fundo por card */}
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full pt-12 md:pt-0">
          <div className="flex w-full justify-between items-center px-4 md:px-8 lg:px-12 xl:px-20">
            <div className="flex-none">
              <button
                aria-label="Item anterior"
                tabIndex={0}
                className="p-2  hover:bg-gray-800 bg-opacity-50 hover:text-white text-black hover:bg-opacity-75 focus:outline-none transition cursor-pointer"
                data-t="left-arrow"
                onClick={goToPrevious}
              >
                <svg className="h-8 w-8 transform rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="angle-left-svg" aria-hidden="true" role="img">
                  <path fill="currentColor" d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z"></path>
                </svg>
              </button>
            </div>
            <div className="flex-grow overflow-hidden flex justify-center items-center">
              <div className="w-full flex justify-center items-center">
                {/* Renderiza apenas o card ativo, centralizado */}
                {carouselItems.map((item, index) =>
                  index === activeIndex ? (
                    <div
                      key={index}
                      data-t="carousel-card-wrapper"
                      className="flex justify-center items-center p-4 transition-transform duration-500 ease-in-out flex-none"
                      role="group"
                      aria-roledescription="Slide"
                      aria-label={`${index + 1} of ${totalItems}`}
                    >
                      <div className="relative group overflow-hidden  shadow-lg bg-gray-900 bg-opacity-70 transform transition-transform duration-300">
                        <a
                          aria-label={item.ariaLabel}
                          tabIndex={0}
                          className="block"
                          data-t="carousel-image-card-link"
                          href={item.href}
                          aria-describedby={`description-${index}`}
                        >
                          {/* Tall Asset (Portrait) */}
                          <div className="block md:hidden">
                            <figure className="relative w-[600px] h-[344px] overflow-hidden">
                              <div className="absolute inset-0">
                                <picture>
                                  <img
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 blur-sm"
                                    loading="eager"
                                    src={item.tallImageSrc.replace('quality=90', 'quality=90,blur=80')}
                                    alt=""
                                    data-t="preview-image"
                                  />
                                </picture>
                                <picture>
                                  <img
                                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                                    loading="eager"
                                    src={item.tallImageSrc}
                                    alt={item.tallImageAlt}
                                    data-t="original-image"
                                  />
                                </picture>
                              </div>
                            </figure>
                          </div>
                          {/* Wide Asset (Landscape) */}
                          <div className="hidden md:block">
                            <figure className="relative w-[600px] h-[344px] overflow-hidden"> {/* Altura e largura fixas */}
                              <div className="absolute inset-0">
                                <picture>
                                  <img
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 blur-sm"
                                    loading="eager"
                                    src={item.wideImageSrc.replace('quality=90', 'quality=90,blur=80')}
                                    alt=""
                                    data-t="preview-image"
                                  />
                                </picture>
                                <picture>
                                  <img
                                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                                    loading="eager"
                                    src={item.wideImageSrc}
                                    alt={item.wideImageAlt}
                                    data-t="original-image"
                                  />
                                </picture>
                              </div>
                            </figure>
                          </div>
                        </a>
                        {/* <p id={`description-${index}`} className="p-4 text-white text-sm font-semibold leading-tight">
                          {item.description}
                        </p> */}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
            <div className="flex-none">
              <button
                aria-label="Próximo item"
                tabIndex={0}
                className="p-2  hover:bg-gray-800 bg-opacity-50 hover:text-white text-black hover:bg-opacity-75 focus:outline-none transition cursor-pointer"
                data-t="right-arrow"
                onClick={goToNext}
              >
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="angle-right-svg" aria-hidden="true" role="img">
                  <path fill="currentColor" d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
          <div className="mt-8 flex justify-center w-full" role="tablist" data-t="pages">
            {carouselItems.map((item, index) => (
              <button
                key={index}
                role="tab"
                tabIndex={index === activeIndex ? 0 : -1}
                className={`flex flex-col items-center justify-center mx-2 cursor-pointer  bg-[#23252B] opacity-90 hover:opacity-100 transition-all duration-300 ease-in-out ${index === activeIndex ? 'bg-[#213944]' : ''}`}
                data-t="carousel-tab"
                onClick={() => {
                  setActiveIndex(index);
                  stopAutoplay(); // Stop autoplay when a tab is clicked manually
                  stopProgress();
                  setProgress(0);
                }}
              >
                <div className="w-full h-1 bg-gray-400 overflow-hidden transition-colors duration-300" data-t="carousel-card-indicator">
                  {index === activeIndex && (
                    <div
                      className="h-full bg-orange-500 transition-all duration-100 linear"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </div>
                <span className={`mt-2 px-4 py-1 text-sm font-bold ${index === activeIndex ? 'text-white' : 'text-gray-300'} transition-colors duration-300`} data-t="tab-title">
                  {item.tabTitle}
                </span>
              </button>
            ))}
          </div>
    </div>
  );
};

export default HeroCarousel;