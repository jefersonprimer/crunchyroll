// src/components/GameCatalogSection.tsx
import React from 'react';
import FilterDropdown from './FilterDropdown';
import GameCard from './GameCard';
import { GameCardProps } from './GameCard';

interface GameCatalogSectionProps {
  games: GameCardProps[]; // Array de dados dos jogos
}

const GameCatalogSection: React.FC<GameCatalogSectionProps> = ({ games }) => {
  return (
    <section className="bg-black py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-[50px] font-extrabold text-white mb-6 md:mb-0">
            Our Game Catalog
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center bg-[#292929]  rounded">
            <p className="text-gray-400 text-sm mx-2 uppercase">Filter by</p>
            <div className="flex flex-wrap ">
              <FilterDropdown title="Category" />
              <FilterDropdown title="Genre" />
              <FilterDropdown title="Platform" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameCatalogSection;