import React, { useState, useCallback, useId } from 'react';
import { useFilters } from '../../contexts/FilterContext';
import { useTranslations } from 'next-intl';

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

const FilterableHeader: React.FC = () => {
  const t = useTranslations('WatchlistHeader');
  const { toggleDropdown, isDropdownOpen } = useDropdown();
  const [selectedSortOption, setSelectedSortOption] = useState('atualizacao-mais-recente');
  const { filters, setFilters } = useFilters();
  const sortDropdownId = useId();
  const filterDropdownId = useId();

  // Handler para acessibilidade de teclado
  const handleDropdownKeyDown = (e: React.KeyboardEvent, dropdownId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown(dropdownId);
    }
    if (e.key === 'Escape') {
      toggleDropdown(dropdownId);
    }
  };

  const sortOptions = [
    { id: 'atualizacao-mais-recente', label: t('sortOptions.mostRecentUpdate') },
    { id: 'atualizado', label: t('sortOptions.updated') },
    { id: 'assistido', label: t('sortOptions.watched') },
    { id: 'adicionado', label: t('sortOptions.added') },
    { id: 'ordem-alfabetica', label: t('sortOptions.alphabetical') },
  ];

  const dateSortOptions = [
    { id: 'mais-recente', label: t('dateSortOptions.mostRecent') },
    { id: 'mais-antigo', label: t('dateSortOptions.oldest') },
  ];

  const filterOptions = {
    favoritos: [
      { id: 'favoritos', label: t('filterOptions.favorites.onlyFavorites') }
    ],
    idiomas: [
      { id: 'todos', label: t('filterOptions.languages.all') },
      { id: 'legendado', label: t('filterOptions.languages.subtitled') },
      { id: 'dublado', label: t('filterOptions.languages.dubbed') }
    ],
    tipoMidia: [
      { id: 'todos', label: t('filterOptions.mediaType.all') },
      { id: 'animes', label: t('filterOptions.mediaType.anime') },
      { id: 'filmes', label: t('filterOptions.mediaType.movies') }
    ]
  };

  return (
    <div className="flex flex-wrap justify-between gap-4 w-full max-w-[1050px] mb-2 px-2 mx-auto">
      <div className="flex items-center justify-between flex-wrap">
        <h2 className="text-[#FFFFFF] text-[1.25rem] font-weight-700">{t('sortOptions.mostRecentUpdate')}</h2>
      </div>
      <div className="flex gap-4 flex-wrap">
        <div className='text-[#A0A0A0] hover:text-[#FFF] hover:bg-[#23252B]'>
          <div className="relative min-w-[150px]">
            <div className="dropdown">
              <div
                role="button"
                aria-label="Ordenar"
                tabIndex={0}
                className={`flex justify-center items-center gap-2 px-4 py-2 cursor-pointer border-none ${
                  isDropdownOpen('sort') ? 'bg-[#23252B] text-[#FFF] shadow-lg' : 'text-[#A0A0A0] hover:text-[#FFF] hover:bg-[#23252B]'
                } transition-colors duration-200`}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen('sort')}
                data-t="sorting-button"
                aria-controls={sortDropdownId}
                onClick={() => toggleDropdown('sort')}
                onKeyDown={(e) => handleDropdownKeyDown(e, 'sort')}
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
                  {t('buttons.sort')}
                </span>
              </div>
              
              {isDropdownOpen('sort') && (
                <div
                  id={sortDropdownId}
                  className="absolute top-full right-0 min-w-[180px] max-w-[90vw] max-h-[70vh] overflow-y-auto bg-[#23252B] shadow-lg z-50 transition-all duration-200 opacity-100 scale-100"
                  role="menu"
                  aria-label={t('buttons.sort')}
                >
                  <div className="py-2">
                    {sortOptions.map((option) => (
                      <div
                        key={option.id}
                        role="menuitem"
                        aria-selected={selectedSortOption === option.id}
                        className="px-4 py-2 hover:bg-[#2D2F36] cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          setSelectedSortOption(option.id);
                          toggleDropdown('sort');
                        }}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedSortOption === option.id 
                            ? 'border-[#2ABDBB]' 
                            : 'border-[#A0A0A0]'
                        }`}>
                          <div className={`w-2.5 h-2.5 rounded-2xl ${
                            selectedSortOption === option.id 
                              ? 'bg-[#2ABDBB]' 
                              : 'bg-transparent'
                          }`} />
                        </div>
                        <span className="text-[#FFFFFF]">{option.label}</span>
                      </div>
                    ))}
                    <div className="px-4 py-2 text-[#FFFFFF] text-sm font-medium">{t('buttons.sort')}</div>
                    {dateSortOptions.map((option) => (
                      <div
                        key={option.id}
                        role="menuitem"
                        aria-selected={selectedSortOption === option.id}
                        className="px-4 py-2 hover:bg-[#2D2F36] cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          setSelectedSortOption(option.id);
                          toggleDropdown('sort');
                        }}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedSortOption === option.id 
                            ? 'border-[#2ABDBB]' 
                            : 'border-[#A0A0A0]'
                        }`}>
                          <div className={`w-2.5 h-2.5 rounded-2xl ${
                            selectedSortOption === option.id 
                              ? 'bg-[#2ABDBB]' 
                              : 'bg-transparent'
                          }`} />
                        </div>
                        <span className="text-[#FFFFFF]">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className='text-[#A0A0A0] hover:text-[#FFF] hover:bg-[#23252B]'>
          <div className="relative min-w-[150px]">
            <div className="dropdown">
              <div
                role="button"
                aria-label="Filtrar"
                tabIndex={0}
                className={`flex justify-center items-center gap-2 px-4 py-2 cursor-pointer border-none ${
                  isDropdownOpen('filter') ? 'bg-[#23252B] text-[#FFF] shadow-lg' : 'text-[#A0A0A0] hover:text-[#FFF] hover:bg-[#23252B]'
                } transition-colors duration-200`}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen('filter')}
                data-t="filter-button"
                aria-controls={filterDropdownId}
                onClick={() => toggleDropdown('filter')}
                onKeyDown={(e) => handleDropdownKeyDown(e, 'filter')}
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
                <span className="text-sm font-medium">{t('buttons.filter')}</span>
              </div>
              
              {isDropdownOpen('filter') && (
                <div
                  id={filterDropdownId}
                  className="absolute top-full right-0 min-w-[180px] max-w-[90vw] max-h-[70vh] overflow-y-auto bg-[#23252B] shadow-lg z-50 transition-all duration-200 opacity-100 scale-100"
                  role="menu"
                  aria-label={t('buttons.filter')}
                >
                  <div className="py-2">
                    {/* Favoritos Section */}
                    {filterOptions.favoritos.map((option) => (
                      <div
                        key={option.id}
                        role="menuitem"
                        aria-selected={!!filters.favoritos}
                        className="px-4 py-2 hover:bg-[#2D2F36] cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            favoritos: !prev.favoritos
                          }));
                        }}
                      >
                        <div className={`w-5 h-5 border-2 flex items-center justify-center ${
                          filters.favoritos 
                            ? 'border-[#2ABDBB]' 
                            : 'border-[#A0A0A0]'
                        }`}>
                          <div className={`w-2.5 h-2.5 ${
                            filters.favoritos 
                              ? 'bg-[#2ABDBB]' 
                              : 'bg-transparent'
                          }`} />
                        </div>
                        <span className="text-[#FFFFFF]">{option.label}</span>
                      </div>
                    ))}

                    {/* Idiomas Section */}
                    <div className="px-4 py-2 text-[#FFFFFF] text-[1.125rem] font-medium">{t('filterOptions.sections.languages')}</div>
                    {filterOptions.idiomas.map((option) => (
                      <div
                        key={option.id}
                        role="menuitem"
                        aria-selected={filters.idioma === option.id}
                        className="px-4 py-2 hover:bg-[#2D2F36] cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            idioma: option.id as 'todos' | 'legendado' | 'dublado'
                          }));
                        }}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          filters.idioma === option.id 
                            ? 'border-[#2ABDBB]' 
                            : 'border-[#A0A0A0]'
                        }`}>
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            filters.idioma === option.id 
                              ? 'bg-[#2ABDBB]' 
                              : 'bg-transparent'
                          }`} />
                        </div>
                        <span className="text-[#FFFFFF]">{option.label}</span>
                      </div>
                    ))}

                    {/* Tipo de Mídia Section */}
                    <div className="px-4 py-2 text-[#FFFFFF] text-[1.125rem] font-medium">{t('filterOptions.sections.mediaType')}</div>
                    {filterOptions.tipoMidia.map((option) => (
                      <div
                        key={option.id}
                        role="menuitem"
                        aria-selected={filters.tipoMidia === option.id}
                        className="px-4 py-2 hover:bg-[#2D2F36] cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            tipoMidia: option.id as 'todos' | 'animes' | 'filmes'
                          }));
                        }}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          filters.tipoMidia === option.id 
                            ? 'border-[#2ABDBB]' 
                            : 'border-[#A0A0A0]'
                        }`}>
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            filters.tipoMidia === option.id 
                              ? 'bg-[#2ABDBB]' 
                              : 'bg-transparent'
                          }`} />
                        </div>
                        <span className="text-[#FFFFFF]">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterableHeader;

