import React from 'react';
import { useTranslations } from 'next-intl';
import { Anime } from '@/types/anime';
import styles from '../ListDetails.module.css';
import AnimeSearchCard from './AnimeSearchCard';

interface SearchModalProps {
  showAddModal: boolean;
  showSearchResults: boolean;
  searchTerm: string;
  searchResults: Anime[];
  currentListItems: Anime[];
  onAddAnime: (anime: Anime) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  showAddModal,
  showSearchResults,
  searchTerm,
  searchResults,
  currentListItems,
  onAddAnime
}) => {
  const t = useTranslations('ListDetails');

  if (showAddModal && searchTerm === '') {
    return (
      <div className={styles.addModal} style={{ position: 'absolute', top: '100%', left: 0, width: '370px', height: '255px', zIndex: 10 }}>
        <div className="dropdown-content__children--HW28H">
          <span className="dropdown-content__marker--kViWn"></span>
          <div>
            <div className="erc-add-item-dropdown-empty">
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <svg 
                  className="w-[4rem] h-[4rem]"
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
          <span className="dropdown-content__marker--kViWn"></span>
        </div>
      </div>
    );
  }

  if (showSearchResults && searchTerm) {
    return (
      <div className={styles.searchResults}>
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
          <div className={styles.noResults}>
            {t('noAnimeFound')}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default SearchModal; 