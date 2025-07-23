// src/components/game-cards/GameCard.tsx
import React from 'react';

import PlatformIcon from './PlatformIcon';
import Badge, { BadgeType } from './badges/Badge';

export interface GameCardProps {
  imageSrc: string;
  imageAlt: string;
  badges?: { type: BadgeType; text: string }[];
  title: string;
  link: string;
  description: string;
  genres: string[];
  platforms: { type: 'apple' | 'play'; link: string }[];
}

const GameCard: React.FC<GameCardProps> = ({
  imageSrc,
  imageAlt,
  badges,
  title,
  link,
  description,
  genres,
  platforms,
}) => {
  return (
    <div
      role="link"
      tabIndex={0}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 relative"
    >
      <div className="relative overflow-hidden w-full h-auto pb-[100%]"> {/* Placeholder para 1:1 aspect ratio */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {badges && badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {badges.map((badge, index) => (
              <Badge key={index} type={badge.type}>
                {badge.text}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <a href={link} className="block p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-b-lg">
        <h3 className="text-xl font-semibold text-white mt-2 leading-tight">
          {title}
        </h3>
        <span className="sr-only"> - open in new window</span>
      </a>
      {/* Descrição expandida - para um card, geralmente se mostra menos ou recorta.
          Aqui mantive a descrição completa como no HTML original, mas em um card real,
          você poderia ter um limite de linhas e um "Leia Mais". */}
      <p className="text-gray-400 text-sm p-4 pt-0 line-clamp-4 md:line-clamp-6">
        {description}
      </p>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 pb-4 border-t border-gray-700 pt-3">
        <div className="flex-1 min-w-0 mb-3 md:mb-0">
          <ul className="flex flex-wrap gap-x-2 text-sm text-gray-400">
            {genres.map((genre, index) => (
              <li key={index} className="flex items-center">
                <span>{genre}</span>
                {index < genres.length - 1 && (
                  <span className="ml-2 h-1 w-1 bg-gray-600 rounded-full inline-block"></span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-2">
          {platforms.map((platform, index) => (
            <PlatformIcon key={index} platform={platform.type} link={platform.link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard;