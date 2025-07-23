// src/components/dropdowns/FilterDropdown.tsx
import React from 'react';

interface FilterDropdownProps {
  title: string;
  // Você pode adicionar um `onSelect` prop para lidar com a seleção de filtro no futuro
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ title }) => {
  return (
    <div className="relative inline-block text-left z-10"> {/* Adicionado z-10 para sobreposição */}
      <div className="flex items-center justify-between p-4 cursor-pointer text-white hover:bg-gray-600 transition-colors duration-200">
        <span className="text-sm font-semibold">{title}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-4 h-4 mr-2 fill-current" aria-hidden="true">
          <path d="M7 10.1h10l-5 5z" fillRule="evenodd"></path>
        </svg>
      </div>
      {/* Conteúdo do dropdown (oculto por padrão neste exemplo simplificado)
      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Option 1</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Option 2</a>
        </div>
      </div>
      */}
    </div>
  );
};

export default FilterDropdown;