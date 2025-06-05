"use client";

import styles from "./AnimeCarousel.module.css";
import AnimeCard from "../cards/AnimeCard";
import AnimeCardSkeleton from "../cards/AnimeCardSkeleton";
import { Anime } from "@/types/anime";

import { useRef, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

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

      // Atualiza os cards visíveis
      const cards = containerRef.current.getElementsByClassName(styles.card);
      const newVisibleCards = new Set<number>();
      
      Array.from(cards).forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();
        
        // Verifica se o card está totalmente visível dentro do container
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
    <div className={styles.carouselContainer}>
      {shouldShowArrows && canScrollLeft && (
        <button
          onClick={scrollLeft}
          className={`${styles.scrollButton} ${styles.scrollLeft}`}
          aria-label="Scroll Left"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}

      <div className={styles.flexContainer} ref={containerRef}>
        {loading ? (
          // Show 5 skeleton cards while loading
          Array.from({ length: 5 }).map((_, index) => (
            <div key={`skeleton-${index}`} className={styles.card}>
              <AnimeCardSkeleton />
            </div>
          ))
        ) : (
          animes.map((anime, index) => (
            <div
              key={anime.id}
              className={`${styles.card} ${visibleCards.has(index) ? styles.fullyVisible : ''}`}
            >
              <AnimeCard anime={anime} />
            </div>
          ))
        )}
      </div>

      {shouldShowArrows && canScrollRight && (
        <button
          onClick={scrollRight}
          className={`${styles.scrollButton} ${styles.scrollRight}`}
          aria-label="Scroll Right"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  );
};

export default AnimeCarousel;
