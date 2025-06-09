import React, { useState, useCallback } from 'react';
import { useFilters } from '../../contexts/FilterContext';

const useDropdown = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = useCallback((dropdownId: string) => {
    setActiveDropdown(prev => prev === dropdownId ? null : dropdownId);
  }, []);

  const isDropdownOpen = useCallback((dropdownId: string) => {
    return activeDropdown === dropdownId;
  }, [activeDropdown]);

  return { toggleDropdown, isDropdownOpen };
};

const WatchlistHeader: React.FC = () => {
  const { toggleDropdown, isDropdownOpen } = useDropdown();
  const [selectedSortOption, setSelectedSortOption] = useState('atualizacao-mais-recente');
  const { filters, setFilters } = useFilters();

  const sortOptions = [
    { id: 'atualizacao-mais-recente', label: 'Atualização Mais Recente' },
    { id: 'atualizado', label: 'Atualizado' },
    { id: 'assistido', label: 'Assistido' },
    { id: 'adicionado', label: 'Adicionado' },
    { id: 'ordem-alfabetica', label: 'Ordem Alfabética' },
  ];

  const dateSortOptions = [
    { id: 'mais-recente', label: 'Mais Recente' },
    { id: 'mais-antigo', label: 'Mais Antigo' },
  ];

  const filterOptions = {
    favoritos: [
      { id: 'favoritos', label: 'Apenas Favoritos' }
    ],
    idiomas: [
      { id: 'todos', label: 'Todos' },
      { id: 'legendado', label: 'Legendado' },
      { id: 'dublado', label: 'Dublado' }
    ],
    tipoMidia: [
      { id: 'todos', label: 'Todos' },
      { id: 'animes', label: 'Animes' },
      { id: 'filmes', label: 'Filmes' }
    ]
  };

  return (
    <div className="flex justify-between gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[#FFFFFF] text-[1.25rem] font-weight-700">Atualização Mais Recente</h2>
      </div>
      <ul className="flex gap-4">
        <li className='text-[#A0A0A0] hover:text-[#FFF] hover:bg-[#23252B]'>
          <div className="relative">
            <div className="dropdown">
              <div
                role="button"
                aria-label="Ordenar"
                tabIndex={0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${
                  isDropdownOpen('sort') ? 'bg-[#2D2F36] text-[#FFF]' : 'text-[#A0A0A0] hover:text-[#FFF] hover:bg-[#23252B]'
                }`}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen('sort')}
                data-t="sorting-button"
                aria-controls="3f455acd-d5a8-47d4-9e14-df62da78b314"
                onClick={() => toggleDropdown('sort')}
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="sort-svg"
                  aria-labelledby="sort-svg"
                  aria-hidden="true"
                  role="img"
                  fill='currentColor'
                >
                  <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z" />
                </svg>
                <span className="text-sm font-medium">
                  {sortOptions.find(opt => opt.id === selectedSortOption)?.label.toUpperCase()}
                </span>
              </div>
              
              {isDropdownOpen('sort') && (
                <div className="absolute top-full right-0 w-64 bg-[#23252B] shadow-lg z-50">
                  <ul className="py-2">
                    {sortOptions.map((option) => (
                      <li
                        key={option.id}
                        className="px-4 py-2 hover:bg-[#2D2F36] cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          setSelectedSortOption(option.id);
                          toggleDropdown('sort');
                        }}
                      >
                        <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                          selectedSortOption === option.id 
                            ? 'border-[#2ABDBB]' 
                            : 'border-[#A0A0A0]'
                        }`}>
                          <div className={`w-1.5 h-1.5 ${
                            selectedSortOption === option.id 
                              ? 'bg-[#2ABDBB]' 
                              : 'bg-transparent'
                          }`} />
                        </div>
                        <span className="text-[#FFFFFF]">{option.label}</span>
                      </li>
                    ))}
                    <li className="px-4 py-2 text-[#A0A0A0] text-sm font-medium">Ordenação</li>
                    {dateSortOptions.map((option) => (
                      <li
                        key={option.id}
                        className="px-4 py-2 hover:bg-[#2D2F36] cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          setSelectedSortOption(option.id);
                          toggleDropdown('sort');
                        }}
                      >
                        <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                          selectedSortOption === option.id 
                            ? 'border-[#2ABDBB]' 
                            : 'border-[#A0A0A0]'
                        }`}>
                          <div className={`w-1.5 h-1.5 ${
                            selectedSortOption === option.id 
                              ? 'bg-[#2ABDBB]' 
                              : 'bg-transparent'
                          }`} />
                        </div>
                        <span className="text-[#FFFFFF]">{option.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </li>
        
        <li className='text-[#A0A0A0] hover:text-[#FFF] hover:bg-[#23252B]'>
          <div className="relative">
            <div className="dropdown">
              <div
                role="button"
                aria-label="Filtrar"
                tabIndex={0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${
                  isDropdownOpen('filter') ? 'bg-[#2D2F36] text-[#FFF]' : 'text-[#A0A0A0] hover:text-[#FFF] hover:bg-[#23252B]'
                }`}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen('filter')}
                data-t="filter-button"
                aria-controls="61bd6b12-b2ad-4cc2-bc15-5cb02a2be575"
                onClick={() => toggleDropdown('filter')}
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="filter-svg"
                  aria-labelledby="filter-svg"
                  aria-hidden="true"
                  role="img"
                  fill='currentColor'
                >
                  <path
                    fillRule="evenodd"
                    d="M9 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2M3 8a1 1 0 0 1 0-2h2.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21a1 1 0 0 1 0 2h-8.142c-.447 1.72-2 3-3.858 3S5.589 9.72 5.142 8H3zm12 11c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2zm6-3a1 1 0 0 1 0 2h-2.142c-.447 1.72-2 3-3.858 3s-3.411-1.28-3.858-3H3a1 1 0 0 1 0-2h8.142c.447-1.72 2-3 3.858-3s3.411 1.28 3.858 3H21z"
                  />
                </svg>
                <span className="text-sm font-medium">FILTRAR</span>
              </div>
              
              {isDropdownOpen('filter') && (
                <div className="absolute top-full right-0  w-64 bg-[#23252B] shadow-lg z-50">
                  <ul className="py-2">
                    {/* Favoritos Section */}
                    {filterOptions.favoritos.map((option) => (
                      <li
                        key={option.id}
                        className="px-4 py-2 hover:bg-[#2D2F36] cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            favoritos: !prev.favoritos
                          }));
                        }}
                      >
                        <div className={`w-3 h-3  border flex items-center justify-center ${
                          filters.favoritos 
                            ? 'border-[#2ABDBB]' 
                            : 'border-[#A0A0A0]'
                        }`}>
                          <div className={`w-1.5 h-1.5 ${
                            filters.favoritos 
                              ? 'bg-[#2ABDBB]' 
                              : 'bg-transparent'
                          }`} />
                        </div>
                        <span className="text-[#FFFFFF]">{option.label}</span>
                      </li>
                    ))}

                    {/* Idiomas Section */}
                    <li className="px-4 py-2 text-[#A0A0A0] text-sm font-medium">Idiomas</li>
                    {filterOptions.idiomas.map((option) => (
                      <li
                        key={option.id}
                        className="px-4 py-2 hover:bg-[#2D2F36] cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            idioma: option.id as 'todos' | 'legendado' | 'dublado'
                          }));
                        }}
                      >
                        <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                          filters.idioma === option.id 
                            ? 'border-[#2ABDBB]' 
                            : 'border-[#A0A0A0]'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            filters.idioma === option.id 
                              ? 'bg-[#2ABDBB]' 
                              : 'bg-transparent'
                          }`} />
                        </div>
                        <span className="text-[#FFFFFF]">{option.label}</span>
                      </li>
                    ))}

                    {/* Tipo de Mídia Section */}
                    <li className="px-4 py-2 text-[#A0A0A0] text-sm font-medium">Tipo de Mídia</li>
                    {filterOptions.tipoMidia.map((option) => (
                      <li
                        key={option.id}
                        className="px-4 py-2 hover:bg-[#2D2F36] cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            tipoMidia: option.id as 'todos' | 'animes' | 'filmes'
                          }));
                        }}
                      >
                        <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                          filters.tipoMidia === option.id 
                            ? 'border-[#2ABDBB]' 
                            : 'border-[#A0A0A0]'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            filters.tipoMidia === option.id 
                              ? 'bg-[#2ABDBB]' 
                              : 'bg-transparent'
                          }`} />
                        </div>
                        <span className="text-[#FFFFFF]">{option.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default WatchlistHeader;