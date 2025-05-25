"use client";

import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Anime } from "@/types/anime";
import RecommendationCard from './RecommendationCard';
import styles from './RecommendationCarousel.module.css';

interface RecommendationCarouselProps {
  animes: Anime[];
}

const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({ animes }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;
  const totalPages = Math.ceil(animes.length / cardsPerPage);

  const updateScrollState = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const isAtStart = scrollLeft <= 0;
      const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;
      setCanScrollLeft(!isAtStart);
      setCanScrollRight(!isAtEnd);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
      setCurrentPage(prev => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
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
    const container = containerRef.current;
    if (container) {
      updateScrollState();
      container.addEventListener("scroll", updateScrollState);
      return () => container.removeEventListener("scroll", updateScrollState);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          setVisibleCards((prev) => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(index);
            } else {
              newSet.delete(index);
            }
            return newSet;
          });
        });
      },
      {
        threshold: 0.1,
      }
    );

    const cards = containerRef.current?.querySelectorAll("[data-index]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [animes]);

  const shouldShowArrows = animes.length > 4;

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
        {animes.map((anime, index) => (
          <div
            key={anime.id}
            data-index={index}
            className={`${styles.card} ${visibleCards.has(index) ? styles.fullyVisible : ''}`}
          >
            <RecommendationCard anime={anime} />
          </div>
        ))}
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

      <div className={styles.carouselPagination} role="tablist">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-label={`Show slide ${index + 1}`}
            tabIndex={0}
            className={`${styles.paginationPage} ${currentPage === index ? styles.active : ''}`}
            aria-selected={currentPage === index}
            onClick={() => scrollToPage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationCarousel;
