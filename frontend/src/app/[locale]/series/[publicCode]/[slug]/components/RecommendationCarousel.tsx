"use client";

import { useTranslations } from 'next-intl';
import AnimeCard from "../../../../../components/cards/AnimeCard";
import { AnimeCardSkeleton } from "../../../../../components/cards/AnimeCardSkeleton";
import { Anime } from "@/types/anime";

import { useRef, useState, useEffect } from "react";

interface RecommendationCarouselProps {
  animes: Anime[];
  itemsPerPage?: number;
  loading?: boolean;
}

const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({ animes, loading = false }) => {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 5;
  const totalPages = Math.ceil(animes.length / cardsPerPage);
  const shouldShowArrows = animes.length > 5;

  const updateScrollState = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);

      // Atualiza os cards visíveis
      const newVisibleCards = new Set<number>();
      setVisibleCards(newVisibleCards);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setCurrentPage(prev => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    }
  };

  const scrollToPage = (pageIndex: number) => {
    if (containerRef.current) {
      const scrollAmount = pageIndex * 300;
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      setCurrentPage(pageIndex);
    }
  };

  useEffect(() => {
    updateScrollState();
    const handleResize = () => updateScrollState();

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollState);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-screen m-0 pb-[60px] relative overflow-hidden">
    {shouldShowArrows && canScrollLeft && (
      <button
        onClick={scrollLeft}
        className="text-2xl absolute top-[40%] -translate-y-1/2 h-full w-[60px] bg-transparent text-white border-none cursor-pointer z-10 flex justify-center items-center transition-colors duration-300 ease-in-out hover:bg-black/20 left-0"
        aria-label="Scroll Left"
      >
        <svg
            className="angle"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            data-t="angle-left-svg" 
            aria-hidden="true" 
            role="img"
            fill="currentColor"
            width="44"
            height="44"
          >
          <path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4-4.6-4.6z"></path>
        </svg>
      </button>
    )}
  
    <div 
      className="w-full max-w-[1800px] items-start flex overflow-x-hidden scroll-smooth px-[60px] mx-auto justify-start"
      ref={containerRef}
    >
      {loading ? (
        // Show 5 skeleton cards while loading
        Array.from({ length: 5 }).map((_, index) => (
          <div 
            key={`skeleton-${index}`} 
            className="relative flex-none w-[230px] h-[420px] overflow-hidden transition-all duration-300 ease-in-out cursor-pointer text-left opacity-70"
          >
            <AnimeCardSkeleton />
          </div>
        ))
      ) : (
        animes.map((anime) => (
          <div key={anime.id}>
            <AnimeCard anime={anime} />
          </div>
        ))
      )}
    </div>
  
    {shouldShowArrows && canScrollRight && (
      <button
        onClick={scrollRight}
        className="text-2xl absolute top-[40%] -translate-y-1/2 h-full w-[60px] bg-transparent text-white border-none cursor-pointer z-10 flex justify-center items-center transition-colors duration-300 ease-in-out hover:bg-black/20 right-0"
        aria-label="Scroll Right"
      >
        <svg 
          className="angle" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          data-t="angle-right-svg" 
          aria-hidden="true" 
          role="img"
          fill="currentColor"
          width="44"
          height="44"
        >
          <path d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z"></path>
        </svg>
      </button>
    )}
  
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10" role="tablist">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          role="tab"
          aria-label={`Show slide ${index + 1}`}
          tabIndex={0}
          className={`w-10 h-1 bg-[#F8F8F8] border-none cursor-pointer transition-all duration-300 ease-in-out p-0 ${
            currentPage === index 
              ? 'bg-[#FF640A] scale-125' 
              : 'hover:bg-white hover:scale-125'
          }`}
          aria-selected={currentPage === index}
          onClick={() => scrollToPage(index)}
        />
      ))}
    </div>
  </div>
  );
};

export default RecommendationCarousel;
