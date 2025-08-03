'use client';

import { GET_ANIMES } from '@/lib/queries/getAnimes';
import { Anime } from '@/types/anime';
import AnimeCard from './AnimeCard';

import { useLists } from '@/app/[locale]/contexts/ListsContext';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@apollo/client';

import Link from 'next/link';

import SearchModal from './SearchModal';
import DeleteModal from './DeleteModal';
import RenameModal from './RenameModal';
import Loading from '@/app/[locale]/loading';

interface List {
  id: string;
  name: string;
  items: Anime[];
  updatedAt: string;
}

export default function ListDetailClient() {
  const { listId, locale } = useParams();
  const router = useRouter();
  const { lists, removeItemFromList, updateListName, removeList, addItemToList } = useLists();
  const currentList = useMemo(
    () => lists.find((list) => list.id === listId),
    [lists, listId]
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState(currentList?.name || '');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('ListDetails');
  const { data: animesData, loading: animesLoading, error: animesError } = useQuery(GET_ANIMES);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setNewListName(currentList?.name || '');
  }, [currentList]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const searchResults = useMemo(() => {
    return animesData?.animes?.filter((anime: Anime) =>
      anime.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  }, [animesData, searchTerm]);

  const handleRename = () => {
    if (currentList && newListName.trim()) {
      updateListName(currentList.id, newListName);
      setIsModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (currentList) {
      removeList(currentList.id);
      setIsDeleteModalOpen(false);
      router.push(`/${locale}/crunchylists`);
    }
  };

  const handleAddAnime = (anime: Anime) => {
    if (currentList) {
      addItemToList(currentList.id, anime);
      setIsInputFocused(false);
      setSearchTerm('');
    }
  };

  if (animesLoading) {
    return <Loading />;
  }

  if (!currentList) {
    return (
        <div>
          <div className="flex flex-col max-w-[1050px]  w-full mx-auto py-5">
            <div className="flex flex-col items-start mb-5 w-full no-underline">
              <Link href={`/${locale}/crunchylists`} className="flex items-center font-bold text-[#A0A0A0] hover:text-white no-underline mb-5 cursor-pointer">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="angle-left-svg"
                  aria-labelledby="angle-svg"
                  aria-hidden="true"
                  role="img"
                  fill='currentColor'
                >
                  <title id="angle-svg">Anterior</title>
                  <path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4-4.6-4.6z"></path>
                </svg>
                <span className="uppercase text-sm">{t('backToLists')}</span>
              </Link>
              <h1 className="text-2xl text-white mb-5">Lista não encontrada</h1>
              <div className="flex items-center justify-center gap-5 w-full sm:w-auto">
                <div ref={inputContainerRef} className="relative w-[300px]">
                  <div className="relative p-2.5">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={t('searchPlaceholder')}
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                      onFocus={() => setIsInputFocused(true)}
                      disabled
                      className="w-full  border-b-2 border-[#59595B] bg-black text-white focus:outline-none focus:border-[#ff640a] opacity-50 cursor-not-allowed"
                      aria-label={t('searchPlaceholder')}
                    />
                  </div>
                  <SearchModal
                    showAddModal={false}
                    showSearchResults={false}
                    searchTerm={searchTerm}
                    searchResults={[]}
                    currentListItems={[]}
                    onAddAnime={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  return (
      <>
        <div className="flex flex-col max-w-[1050px] mx-auto py-5">
          <div className="flex flex-col items-start mb-5 w-full no-underline">
            <Link href={`/${locale}/crunchylists`} className="flex font-bold items-center mt-4 text-[#A0A0A0] hover:text-white no-underline mb-5 cursor-pointer">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="angle-left-svg"
                aria-labelledby="angle-svg"
                aria-hidden="true"
                role="img"
                fill='currentColor'
              >
                <title id="angle-svg">Anterior</title>
                <path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4-4.6-4.6z"></path>
              </svg>
              <span className="uppercase text-sm">{t('backToLists')}</span>
            </Link>
            <h1 className="text-2xl text-white mb-5 mt-5">{currentList.name}</h1>
            <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 no-underline">
              <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
                <div ref={inputContainerRef} className="relative w-[300px]">
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={!isInputFocused && !searchTerm ? t('searchPlaceholder') : ''}
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                      onFocus={() => setIsInputFocused(true)}
                      className="w-full h-14 border-b-2 border-[#59595B] bg-black text-white focus:outline-none focus:border-[#ff640a]"
                      aria-label={t('searchPlaceholder')}
                    />
                    {(isInputFocused || searchTerm) && (
                      <label 
                        className="absolute left-0 top-0 text-xs text-[#A0A0A0] transition-all duration-200 pointer-events-none"
                      >
                        {t('searchPlaceholder')}
                      </label>
                    )}
                  </div>
                  <SearchModal
                    showAddModal={isInputFocused && searchTerm === ''}
                    showSearchResults={isInputFocused && searchTerm !== ''}
                    searchTerm={searchTerm}
                    searchResults={searchResults}
                    currentListItems={currentList.items}
                    onAddAnime={handleAddAnime}
                  />
                </div>
                <span className="text-[#59595B]">{t('itemsCount', { count: currentList.items.length })}</span>
              </div>
              <div className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} aria-label={t('settings')}>
                  <span className={`flex items-center cursor-pointer text-[#A0A0A0] hover:text-white py-2 px-4 ${isDropdownOpen ? 'text-white bg-[#23252B]' : ''} hover:bg-[#23252B] active:bg-[#23252B] transition-all duration-200`}>
                    <svg className="w-6 h-6 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="settings-svg" aria-labelledby="settings-svg" aria-hidden="true" role="img">
                      <title id="settings-svg">Configurações</title>
                      <path d="M12,15.2 C10.2331429,15.2 8.8,13.7668571 8.8,12 C8.8,10.2331429 10.2331429,8.8 12,8.8 C13.7668571,8.8 15.2,10.2331429 15.2,12 C15.2,13.7668571 13.7668571,15.2 12,15.2 L12,15.2 Z M19.9691429,11.5005714 C19.9691429,11.3542857 19.9108571,11.224 19.7965714,11.1097143 C19.6822857,10.9954286 19.5622857,10.928 19.4377143,10.9062857 L18.344,10.7497143 C18.0102857,10.7085714 17.792,10.5314286 17.688,10.2182857 L17.2811429,9.21828571 C17.1348571,8.928 17.1565714,8.64571429 17.344,8.37485714 L18.0308571,7.50057143 C18.2182857,7.22971429 18.208,6.96914286 18,6.71885714 L17.2502857,6 C17.0205714,5.792 16.7702857,5.78171429 16.4994286,5.96914286 L15.6251429,6.62514286 C15.3542857,6.83314286 15.072,6.86514286 14.7817143,6.71885714 L13.7817143,6.312 C13.656,6.27085714 13.536,6.18285714 13.4217143,6.04685714 C13.3062857,5.912 13.2502857,5.78171429 13.2502857,5.656 L13.0937143,4.56228571 C13.072,4.43771429 13.0045714,4.31771429 12.8902857,4.20342857 C12.776,4.08914286 12.6457143,4.03085714 12.4994286,4.03085714 C12.3954286,4.01028571 12.2285714,4 12,4 L11.5005714,4.03085714 C11.3542857,4.03085714 11.224,4.08914286 11.1097143,4.20342857 C10.9942857,4.31771429 10.9268571,4.43771429 10.9062857,4.56228571 L10.7497143,5.656 C10.7085714,5.98971429 10.5314286,6.208 10.2194286,6.312 L9.21942857,6.71885714 C8.92685714,6.86514286 8.64571429,6.83314286 8.37485714,6.62514286 L7.50057143,5.96914286 C7.22971429,5.78171429 6.96914286,5.792 6.71885714,6 L6,6.71885714 C5.792,6.96914286 5.78171429,7.22971429 5.96914286,7.50057143 L6.62514286,8.37485714 C6.83314286,8.64685714 6.864,8.928 6.71885714,9.21942857 L6.312,10.2194286 C6.27085714,10.344 6.18171429,10.464 6.04685714,10.5782857 C5.91085714,10.6937143 5.78171429,10.7497143 5.656,10.7497143 L4.56228571,10.9062857 C4.43771429,10.928 4.31771429,10.9954286 4.20342857,11.1097143 C4.088,11.224 4.03085714,11.3542857 4.03085714,11.5005714 C4.01028571,11.6045714 4,11.7714286 4,12 L4.03085714,12.4994286 C4.03085714,12.6457143 4.088,12.776 4.20342857,12.8902857 C4.31771429,13.0057143 4.43771429,13.0731429 4.56228571,13.0937143 L5.656,13.2502857 C5.78171429,13.2502857 5.91085714,13.3074286 6.04685714,13.4217143 C6.18171429,13.5371429 6.27085714,13.656 6.312,13.7817143 L6.71885714,14.7817143 C6.864,15.0731429 6.83314286,15.3542857 6.62514286,15.6251429 L5.96914286,16.5005714 C5.78171429,16.7714286 5.76,16.9897143 5.90628571,17.1565714 C5.92685714,17.1771429 5.95314286,17.208 5.984,17.2502857 C6.016,17.2914286 6.05142857,17.3382857 6.09371429,17.3908571 C6.13485714,17.4422857 6.17714286,17.4902857 6.21828571,17.5314286 C6.26057143,17.5737143 6.30171429,17.6148571 6.344,17.656 C6.38514286,17.6982857 6.42628571,17.7394286 6.46857143,17.7817143 C6.50971429,17.8228571 6.552,17.8548571 6.59428571,17.8742857 C6.67657143,17.9588571 6.81714286,18.0205714 7.016,18.0628571 C7.21371429,18.104 7.37485714,18.0937143 7.50057143,18.0308571 L8.37485714,17.3748571 C8.64571429,17.1668571 8.92685714,17.136 9.21828571,17.2811429 L10.2182857,17.688 C10.344,17.7291429 10.464,17.8182857 10.5782857,17.9531429 C10.6925714,18.0891429 10.7497143,18.2182857 10.7497143,18.344 L10.9062857,19.4377143 C10.9268571,19.5622857 10.9942857,19.6822857 11.1097143,19.7965714 C11.224,19.9108571 11.3542857,19.968 11.4994286,19.968 C11.6034286,19.9897143 11.7702857,20 12,20 L12.4994286,19.9691429 C12.6457143,19.9691429 12.776,19.9108571 12.8902857,19.7965714 C13.0045714,19.6822857 13.072,19.5622857 13.0937143,19.4377143 L13.2502857,18.344 C13.2502857,18.2182857 13.3074286,18.0891429 13.4217143,17.9531429 C13.536,17.8182857 13.656,17.7291429 13.7817143,17.688 L14.7817143,17.2811429 C15.0731429,17.136 15.3542857,17.1668571 15.6251429,17.3748571 L16.5005714,18.0308571 C16.7702857,18.2182857 17.0308571,18.208 17.2811429,18 L18,17.2811429 C18.208,17.0308571 18.2182857,16.7714286 18.032,16.4994286 L17.344,15.6251429 C17.1565714,15.3542857 17.136,15.0731429 17.2811429,14.7817143 L17.688,13.7817143 C17.792,13.4685714 18.0102857,13.2914286 18.344,13.2502857 L19.4377143,13.0937143 C19.5622857,13.0731429 19.6822857,13.0057143 19.7965714,12.8902857 C19.9108571,12.776 19.9691429,12.6457143 19.9691429,12.4994286 C19.9897143,12.3965714 20,12.2297143 20,12 L19.9691429,11.5005714 Z"></path>
                    </svg>
                    <span className="uppercase text-sm font-bold">{t('settings')}</span>
                  </span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 bg-[#23252B] py-3 z-[1000] w-[200px] h-auto transition-all duration-200 shadow-lg">
                    <button 
                      onClick={() => { setIsModalOpen(true); setIsDropdownOpen(false); }}
                      className="block w-full py-2.5 px-4 text-sm text-left bg-none border-none text-[#A0A0A0] cursor-pointer hover:text-white hover:bg-[#141519] transition-all duration-200"
                      aria-label={t('editListName')}
                    >
                      {t('editListName')}
                    </button>
                    <button 
                      onClick={() => { setIsDeleteModalOpen(true); setIsDropdownOpen(false); }}
                      className="block w-full py-2.5 px-4 text-sm text-left bg-none border-none text-[#A0A0A0] cursor-pointer hover:text-white hover:bg-[#141519] transition-all duration-200"
                      aria-label={t('deleteList')}
                    >
                      {t('deleteList')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Feedback visual de erro */}
          {animesError && (
            <div className="text-red-500 text-center py-4">Erro ao carregar animes.</div>
          )}
          
          {/* Conteúdo da lista */}
          {currentList?.items && currentList.items.length > 0 ? (
            <div className="list-none p-0 m-0">
              {currentList.items.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  onRemove={(animeId) => currentList && removeItemFromList(currentList.id, animeId)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center mt-2 justify-center py-12 border border-dashed border-gray-400">
              <div className="flex flex-col items-center max-w-md text-center">
                <div className="mb-6">
                  <img 
                    src="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-single-cr-list.png" 
                    srcSet="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-single-cr-list@2x.png 2x, https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-single-cr-list@3x.png 3x" 
                    alt="Lista vazia"
                    className="w-36.5 h-auto"
                  />
                </div>
                <h4 className="text-lg text-white mb-4">
                  <div className="text-center">
                    Você pode adicionar itens a esta Crunchylista com a ferramenta de busca acima, ou adicionar direto pela{' '}
                    <Link 
                      href={`/${locale}/videos/popular`}
                      className="text-[#ff640a] hover:text-[#ff8533] underline transition-colors duration-200"
                    >
                      página do anime
                    </Link>
                    .
                  </div>
                </h4>
              </div>
            </div>
          )}
          <RenameModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onRename={handleRename}
            newListName={newListName}
            onNameChange={setNewListName}
          />
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={handleDelete}
          />
        </div>
      </>
  );
}
