'use client';

import styles from './CrunchyList.module.css';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useLists } from '../contexts/ListsContext';

import AddToListModal from '../components/modal/AddToListModal';
import { Anime } from '@/types/anime';

interface List {
  id: string;
  name: string;
  items: Anime[];
  updatedAt: string;
}

// Componente Modal para renomear a lista
const RenameListModal = ({
  currentName,
  onSave,
  onClose
}: {
  currentName: string;
  onSave: (newName: string) => void;  // Passando a função para salvar o novo nome
  onClose: () => void;
}) => {
  const [newListName, setNewListName] = useState(currentName);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Renomear Crunchylista</h2>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className={styles.renameInput}
        />
        <div>
          <button
             className={styles.saveRenameButton}
             onClick={() => onSave(newListName)}  // Passa o novo nome para o onSave
          >
            RENOMEAR LISTA
          </button>
          <button
            className={styles.cancelButton}
            onClick={onClose} // Fecha o modal sem salvar
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
};

const CrunchyList = () => {
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

  const router = useRouter(); // Inicializa o roteador do Next.js

  const handleNavigateToList = (listId: string) => {
    router.push(`/crunchylists/${listId}`); // Redireciona para a página detalhada
  };

  const handleRemoveItem = (listId: string, itemId: string) => {
    removeItemFromList(listId, itemId);
    setLocalLists(prevLists => 
      prevLists.map(list => 
        list.id === listId 
          ? {
              ...list,
              items: list.items.filter(item => item.id !== itemId),
              updatedAt: new Date().toISOString()
            }
          : list
      )
    );
  };

  const handleDeleteList = (listId: string) => {
    removeList(listId);
    setLocalLists(prevLists => prevLists.filter(list => list.id !== listId));
    setEditingListId(null); // Fecha o modal quando a lista for excluída
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
      setEditingListId(null); // Fecha o modal após salvar o novo nome
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
      alert('Você atingiu o limite de 10 listas.');
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
              updatedAt: new Date().toISOString()
            }
          : list
      )
    );
  };

  return (
    <div className={styles.crunchyListContainer}>
      <div className={styles.header}>
        <button onClick={handleCreateList} className={styles.createListBtn}>
          CRIAR NOVA LISTA
        </button>
        <span className={styles.listLength}>{localLists.length}/10 listas</span>
      </div>

      <div className={styles.listsContainer}>
        {localLists.length === 0 ? (
          <p>Não há listas criadas ainda.</p>
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
                <p>{`${list.items.length} Itens`}</p>
                <p className={styles.updatedAt}>
                  - Atualizada em {formatDate(list.updatedAt)}
                </p>
              </div>

              {expandedList === list.id && (
                <div className={styles.listItems}>
                  {list.items.length === 0 ? (
                    <p>Sem itens na lista.</p>
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
                          Remover
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
                        handleRenameList(list.id, list.name);  // Abre o modal de renomear
                        setVisibleMenu(null);  // Fecha o menu
                      }}
                      className={styles.dropdownItem}
                    >
                      Renomear
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteList(list.id);  // Exclui a lista
                        setVisibleMenu(null);  // Fecha o menu
                      }}
                      className={styles.dropdownItem}
                    >
                      Excluir Lista
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
        <RenameListModal
          currentName={newListName}
          onSave={handleSaveNewName}  // Passando a função para o modal
          onClose={() => setEditingListId(null)} // Fecha o modal sem salvar
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
  );
};

export default CrunchyList;
