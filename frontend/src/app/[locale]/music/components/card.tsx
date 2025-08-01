// src/components/Card.tsx
import React from 'react';

export interface CardData {
  id: string;
  title: string;
  artist: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  duration: string;
  genre: string;
  isPremium: boolean;
  maturityRating: string; // e.g., "Não recomendado para menores de dez anos"
  link: string;
}

interface CardProps {
  card: CardData;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const renderMaturityRatingIcon = (rating: string) => (
    <svg className="h-4 w-4 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="false" role="img" aria-labelledby={`rating-${card.id}`}>
      <title id={`rating-${card.id}`}>{rating}</title>
      <path d="m62.37 4.31-.019-.035c-.363-1.252-1.451-2.322-2.74-2.685h-.035c-.345-.109-.762-.127-1.143-.127H5.604c-.326 0-.708.018-1.016.09h-.036c-1.67.345-3.012 1.96-3.084 3.647v22.186c0 10.195.018 20.734 0 31.11v.073c-.055.962.344 1.941 1.07 2.721.726.78 1.687 1.234 2.649 1.252h53.246c.29 0 .67-.018 1.016-.09 1.778-.418 3.174-2.177 3.084-3.919V6.977c-.018-.254 0-.507 0-.743.018-.69.036-1.36-.146-1.887l-.018-.036z" fill="#0095DA"></path>
      <path d="M5.61 0c.327 0 .635.018.98.036h50.906l.943-.018c.544 0 1.07.036 1.597.2 1.76.49 3.247 1.923 3.737 3.682.326.98.2 2.05.217 3.084v51.501c.11 2.485-1.814 4.826-4.208 5.388-.436.109-.89.127-1.343.127-.381 0-.78-.018-1.161-.018H5.175c-2.83-.055-5.297-2.667-5.17-5.497.018-17.76 0-35.537 0-53.315C.077 2.794 1.909.617 4.232.127 4.685.018 5.157 0 5.61 0zM58.44 1.451H5.611c-.327 0-.708.018-1.016.09h-.037c-1.669.346-3.011 1.96-3.084 3.647v26.024c.004 8.99.016 18.194 0 27.273v.073c-.054.961.345 1.94 1.07 2.72.726.781 1.688 1.234 2.65 1.253h53.245c.29 0 .671-.019 1.016-.091 1.778-.417 3.175-2.177 3.084-3.919V6.966c-.018-.254 0-.508 0-.744.018-.69.036-1.36-.145-1.886l-.018-.037-.018-.036c-.363-1.252-1.452-2.322-2.74-2.685h-.036c-.345-.109-.762-.127-1.143-.127z" fill="#FFF"></path>
      <path d="M58.083 25.868v12.19c0 3.773-.58 6.386-1.742 7.837-1.16 1.451-3.193 2.177-6.114 2.177-2.957 0-5.007-.726-6.15-2.159-1.142-1.433-1.723-4.045-1.723-7.855v-12.19c0-3.792.58-6.404 1.723-7.819 1.143-1.433 3.193-2.14 6.15-2.14 2.94 0 4.971.707 6.132 2.14 1.143 1.433 1.724 4.027 1.724 7.819zm-6.295-2.322c0-1.56-.11-2.576-.345-3.084-.218-.508-.635-.744-1.216-.744-.58 0-.98.272-1.215.816-.236.545-.345 1.56-.345 3.012V40.38c0 1.615.11 2.649.345 3.12.218.472.635.708 1.234.708.562 0 .961-.272 1.197-.798.236-.526.345-1.542.345-3.048V23.546zM31.76 16.217h5.387v31.782h-6.15V24.38a10.177 10.177 0 0 1-1.741 1.433 8.943 8.943 0 0 1-2.05.998v-5.696a11.33 1.33 0 0 0 2.793-2.159c.762-.834 1.361-1.741 1.76-2.74M16.629 36.643h-1.47l1.47-12.988 1.47 12.988h-1.47zm6.223-20.281H10.389L6.033 47.999h8.726l.49-5.787h2.758l.49 5.787h8.708l-4.354-31.637z" fill="#FFF"></path>
    </svg>
  );

  const renderPremiumIcon = () => (
    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="img">
      <path d="M2.419 13L0 4.797 4.837 6.94 8 2l3.163 4.94L16 4.798 13.581 13z"></path>
    </svg>
  );

  return (
    <div className="relative w-full  overflow-hidden text-white cursor-pointer hover:bg-[#141519] p-2">
      <a aria-label={card.title} tabIndex={0} href={card.link} className="absolute inset-0 z-10"></a>
      {/* Top left info */}
      <div className="absolute top-2 left-2 z-20 flex space-x-1">
        {card.maturityRating && (
          <div className="flex items-center px-1 py-0.5 text-xs font-semibold">
            {renderMaturityRatingIcon(card.maturityRating)}
          </div>
        )}
        {card.isPremium && (
          <div className="flex items-center bg-[#141519] text-[#FAB818] px-1 py-0.5  text-xs font-semibold">
            {renderPremiumIcon()}
            <small className="ml-1 uppercase">Premium</small>
          </div>
        )}
      </div>
      <div className="relative pb-[56.25%] overflow-hidden"> {/* 16:9 Aspect Ratio */}
        <img
          src={card.thumbnailSrc}
          alt={card.thumbnailAlt}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-1 right-1 flex justify-end items-end z-20">
          {/* Removido: maturityRating e Premium info daqui */}
          <span className="text-sm font-semibold text-white bg-black/70 px-2 py-0.5">
            {card.duration}
          </span>
        </div>
      </div>
      <div className="py-3">
        <small className="block text-gray-400 text-[10px] font-bold uppercase truncate">
          <a tabIndex={0} href={`/artist/${card.artist.replace(/\s+/g, '-').toLowerCase()}`}>
            {card.artist}
          </a>
        </small>
        <h3 className="text-base font-semibold truncate mt-1">
          <a tabIndex={-1} href={card.link} aria-hidden="true">
            {card.title}
          </a>
        </h3>
        <div className="mt-2">
          <span className="inline-flex items-center py-0.5  text-xs font-medium  text-gray-300">
            {card.genre}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;