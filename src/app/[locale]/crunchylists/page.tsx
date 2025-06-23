'use client';

import React, { useState, useEffect } from 'react';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import { ListsProvider } from '../contexts/ListsContext';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import TabsNavigation from '@/app/components/layout/TabsNavigation';
import styles from './styles.module.css';
import { useLists } from '../contexts/ListsContext';
import AddToListModal from '../../components/modals/AddToListModal';
import { Anime } from '@/types/anime';
import RenameModal from './components/RenameModal';

interface List {
  id: string;
  name: string;
  items: Anime[];
  updatedAt: string;
}

const CrunchyListPage = () => {
  const tTabs = useTranslations('Crunchylist');
  const t = useTranslations('CrunchylistComponent');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case 'fila':
        router.push('/watchlist');
        break;
      case 'historico':
        router.push('/history');
        break;
      case 'crunchylists':
        router.push('/crunchylists');
        break;
      default:
        break;
    }
  };

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  let selectedTab = 'crunchylists';
  if (pathname.includes('watchlist')) selectedTab = 'fila';
  else if (pathname.includes('history')) selectedTab = 'historico';

  // CrunchyList logic
  const { lists, addItemToList, removeItemFromList, removeList, updateListName, createList } = useLists();
  const [showModal, setShowModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [expandedList, setExpandedList] = useState<string | null>(null);
  const [editingListId, setEditingListId] = useState<string | null>(null);
  const [newListName, setNewListName] = useState('');
  const [visibleMenu, setVisibleMenu] = useState<string | null>(null);
  const [localLists, setLocalLists] = useState<List[]>(lists);

  useEffect(() => {
    setLocalLists(lists);
  }, [lists]);

  const handleNavigateToList = (listId: string) => {
    router.push(`/crunchylists/${listId}`);
  };

  const handleRemoveItem = (listId: string, itemId: string) => {
    removeItemFromList(listId, itemId);
    setLocalLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? {
              ...list,
              items: list.items.filter(item => item.id !== itemId),
              updatedAt: new Date().toISOString(),
            }
          : list
      )
    );
  };

  const handleDeleteList = (listId: string) => {
    removeList(listId);
    setLocalLists(prevLists => prevLists.filter(list => list.id !== listId));
    setEditingListId(null);
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
  };

  const handleRenameList = (listId: string, currentName: string) => {
    setEditingListId(listId);
    setNewListName(currentName);
  };

  const handleSaveNewName = (newName: string) => {
    if (editingListId) {
      updateListName(editingListId, newName);
      setLocalLists(prevLists =>
        prevLists.map(list =>
          list.id === editingListId
            ? { ...list, name: newName, updatedAt: new Date().toISOString() }
            : list
        )
      );
      setEditingListId(null);
    }
  };

  const handleCreateList = () => {
    if (localLists.length < 10) {
      const newList: List = {
        id: Date.now().toString(),
        name: `Minha Lista ${localLists.length + 1}`,
        items: [],
        updatedAt: new Date().toISOString(),
      };
      createList(newList.name);
      setLocalLists(prevLists => [...prevLists, newList]);
    } else {
      alert(t('listLimit'));
    }
  };

  const handleAddToList = (listId: string, anime: Anime) => {
    addItemToList(listId, anime);
    setLocalLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? {
              ...list,
              items: [...list.items, anime],
              updatedAt: new Date().toISOString(),
            }
          : list
      )
    );
  };

  if (!isMounted) {
    return null;
  }

  return (
    <FavoritesProvider>
      <ListsProvider>
        <Header/>
        <TabsNavigation
          selectedTab={selectedTab}
          onTabChange={handleTabClick}
          labels={{
            fila: tTabs('queue'),
            crunchylists: tTabs('crunchylists'),
            historico: tTabs('history'),
            'Minhas Listas': tTabs('title')
          }}
        >
          <div className={styles.crunchyListContainer}>
            <div className={styles.header}>
              <button onClick={handleCreateList} className={styles.createListBtn}>
                {t('createNewList')}
              </button>
              <span className={styles.listLength}>{t('listsCount', { count: localLists.length })}</span>
            </div>

            <div className={styles.listsContainer}>
              {localLists.length === 0 ? (
                <p>{t('noLists')}</p>
              ) : (
                localLists.map((list) => (
                  <div key={list.id} className={styles.listItem}>
                    <div className={styles.listTitleContainer}>
                      <h3
                        className={styles.listTitle}
                        onClick={() => handleNavigateToList(list.id)}
                      >
                        {list.name}
                      </h3>
                    </div>
                    <div className={styles.listInfo}>
                      <p>{`${list.items.length} ${t('items')}`}</p>
                      <p className={styles.updatedAt}>
                        - {t('updatedAt')} {formatDate(list.updatedAt)}
                      </p>
                    </div>
                    {expandedList === list.id && (
                      <div className={styles.listItems}>
                        {list.items.length === 0 ? (
                          <p>{t('noItems')}</p>
                        ) : (
                          list.items.map((anime) => (
                            <div key={anime.id} className={styles.animeItem}>
                              <img
                                src={anime.imageCardCompact}
                                alt={anime.name}
                                className={styles.animeImage}
                              />
                              <span>{anime.name}</span>
                              <button
                                className={styles.removeButton}
                                onClick={() => handleRemoveItem(list.id, anime.id)}
                              >
                                {t('remove')}
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                    <div className={styles.menuContainer}>
                      <button
                        className={styles.menuIcon}
                        onClick={() => setVisibleMenu(visibleMenu === list.id ? null : list.id)}
                      >
                        &#x22EE;
                      </button>
                      {visibleMenu === list.id && (
                        <div className={styles.dropdownMenu}>
                          <button
                            onClick={() => {
                              handleRenameList(list.id, list.name);
                              setVisibleMenu(null);
                            }}
                            className={styles.dropdownItem}
                          >
                            {t('rename')}
                          </button>
                          <button
                            onClick={() => {
                              handleDeleteList(list.id);
                              setVisibleMenu(null);
                            }}
                            className={styles.dropdownItem}
                          >
                            {t('deleteList')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Modal para Renomear Lista */}
            {editingListId && (
              <RenameModal
                currentName={newListName}
                onSave={handleSaveNewName}
                onClose={() => setEditingListId(null)}
              />
            )}
            {showModal && selectedAnime && (
              <AddToListModal
                anime={selectedAnime}
                onClose={() => setShowModal(false)}
                onAddToList={handleAddToList}
              />
            )}
          </div>
        </TabsNavigation>
        <Footer/>
      </ListsProvider>
    </FavoritesProvider>
  );
};

export default CrunchyListPage;