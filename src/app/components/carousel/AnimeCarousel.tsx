"use client";

import AnimeCardSkeleton from "../cards/AnimeCardSkeleton";
import { Anime } from "@/types/anime";
import { useRef, useState, useEffect } from "react";
import AnimeCard from "../cards/AnimeCard";

interface AnimeCarouselProps {
  animes: Anime[];
  itemsPerPage?: number;
  loading?: boolean;
}

const AnimeCarousel: React.FC<AnimeCarouselProps> = ({ animes, loading = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const shouldShowArrows = animes.length > 5;

  const updateScrollState = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);

      // Update visible cards
      const cards = containerRef.current.getElementsByClassName('card');
      const newVisibleCards = new Set<number>();
      
      Array.from(cards).forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();
        
        if (rect.left >= containerRect.left && rect.right <= containerRect.right) {
          newVisibleCards.add(index);
        }
      });
      
      setVisibleCards(newVisibleCards);
    }
  };

  const scrollLeft = () => containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });

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
    <div className="flex items-center justify-center w-[1351px] h-[436.89px] m-0 relative overflow-hidden">
      {shouldShowArrows && canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="text-2xl absolute top-[40%] -translate-y-1/2 h-full w-[60px] bg-transparent text-[#f8f8f8] border-none cursor-pointer z-10 flex justify-center items-center transition-colors duration-200 ease-in left-0"
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
        className="w-full flex items-center overflow-x-hidden scroll-smooth px-[50px] mx-auto justify-start" 
        ref={containerRef}
      >
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="card relative flex-none w-[250.59px] h-[436.89px] overflow-visible cursor-pointer text-left opacity-70">
              <AnimeCardSkeleton />
            </div>
          ))
        ) : (
          animes.map((anime, index) => (
            <div
              key={anime.id}
              className={`card relative flex-none w-[250.59px] h-[436.89px] overflow-visible cursor-pointer text-left opacity-70 ${visibleCards.has(index) ? 'opacity-100' : 'pointer-events-none'}`}
            >
              <AnimeCard anime={anime} />
            </div>
          ))
        )}
      </div>

      {shouldShowArrows && canScrollRight && (
        <button
          onClick={scrollRight}
          className="text-2xl absolute top-[40%] -translate-y-1/2 h-full w-[60px] bg-transparent text-[#f8f8f8] border-none cursor-pointer z-10 flex justify-center items-center transition-colors duration-200 ease-in right-0"
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
    </div>
  );
};

export default AnimeCarousel;