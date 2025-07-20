import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Anime } from '@/types/anime';
import AnimeSearchCard from './AnimeSearchCard';

interface SearchModalProps {
  showAddModal: boolean;
  showSearchResults: boolean;
  searchTerm: string;
  searchResults: Anime[];
  currentListItems: Anime[];
  onAddAnime: (anime: Anime) => void;
  isLoading?: boolean;
}

const SearchModal: React.FC<SearchModalProps> = ({
  showAddModal,
  showSearchResults,
  searchTerm,
  searchResults,
  currentListItems,
  onAddAnime,
  isLoading = false
}) => {
  const t = useTranslations('ListDetails');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((showAddModal || showSearchResults) && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showAddModal, showSearchResults]);

  if (showAddModal && searchTerm === '') {
    return (
      <div
        ref={modalRef}
        className="absolute top-[100%] left-0 w-full max-w-[370px] min-h-[260px] max-h-[460px] bg-[#23252B] z-[1000] mt-[4px] pt-4 pb-3 flex items-center justify-center shadow-lg transition-all duration-200 outline-none"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <div>          
          <div>
            <div className="flex flex-col items-center justify-center w-full pt-6 pb-3 text-center">
              <div className='flex justify-center w-full'>
                <svg 
                  className="w-[4rem] h-[4rem] block mx-auto mb-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24" data-t="search-svg"
                  aria-hidden="true"
                  role="img"
                  fill="#DADADA"
                >
                  <path d="M15.474 14.035l6.235 6.26a1 1 0 1 1-1.418 1.41l-6.228-6.253a7.5 7.5 0 1 1 1.41-1.418zM9.5 15a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"></path>
                </svg>
              </div>
              <div className='w-[300px] h-[54px] items-center'>
                <p className="text-center" data-t="empty-search-message">{t('searchMessage')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showSearchResults && searchTerm) {
    return (
      <div
        ref={modalRef}
        className="absolute top-[100%] left-0 right-0 bg-[#23252B] w-full max-w-[370px] h-auto max-h-[460px] overflow-x-auto z-[1000] mt-[4px] p-[10px] shadow-lg transition-all duration-200 outline-none"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-20">
            <svg className="animate-spin h-8 w-8 text-[#dadada]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        ) : (
          <>
            {searchResults.map((anime: Anime) => {
              const isInList = currentListItems.some(item => item.id === anime.id);
              return (
                <AnimeSearchCard
                  key={anime.id}
                  anime={anime}
                  isInList={isInList}
                  onAdd={onAddAnime}
                />
              );
            })}
            {searchResults.length === 0 && (
              <div className="p-[16px] text-center text-[#666]">
                {t('noAnimeFound')}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  return null;
};

export default SearchModal; 