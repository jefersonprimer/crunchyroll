"use client"

// src/components/Carousel.tsx
import React, { useState } from 'react';
import Card, { CardData } from './card';

interface CarouselProps {
  title: string;
  description: string;
  cards: CardData[];
}

const Carousel: React.FC<CarouselProps> = ({ title, description, cards }) => {
  const cardsPerPage = 4; // 4x4 grid
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = cards.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div className="p-4 bg-black text-white h-auto">
      <div className="mb-6 relative mx-auto max-w-[1050px]">
        <h2 className="text-3xl font-bold text-gray-100">{title}</h2>
        <p className="text-lg text-gray-400 mt-2">{description}</p>
        <div className="w-full h-1 bg-[#29ACAB] mt-4"></div>
      </div>

      <div className="relative mx-auto max-w-[1130px]">
        <div className="mx-auto max-w-[1050px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {currentCards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`hover:bg-black bg-opacity-50 text-white p-3 shadow-lg cursor-pointer ${
              currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-75'
            } `}
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`hover:bg-black bg-opacity-50 text-white p-3 shadow-lg cursor-pointer ${
              currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-75'
            } `}
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;