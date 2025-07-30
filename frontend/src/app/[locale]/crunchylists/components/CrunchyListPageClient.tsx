'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLists } from '../../contexts/ListsContext';
import RenameModal from '../[listId]/components/RenameModal';
import CreateModal from '../[listId]/components/CreateModal';
import DeleteModal from '../[listId]/components/DeleteModal';
import Loading from '../../loading';

const CrunchyListPageClient = () => {
  const t = useTranslations('Crunchylist');
  const router = useRouter();
  const { lists, isLoading, removeList, updateListName, createList } = useLists();
  const [editingListId, setEditingListId] = useState<string | null>(null);
  const [newListName, setNewListName] = useState('');
  const [visibleMenu, setVisibleMenu] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createListName, setCreateListName] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState<string | null>(null);

  const handleNavigateToList = (listId: string) => {
    router.push(`/crunchylists/${listId}`);
  };

  const handleDeleteList = (listId: string) => {
    removeList(listId);
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
      setEditingListId(null);
    }
  };

  const handleCreateList = () => {
    setIsCreateModalOpen(true);
    setCreateListName('');
  };

  const handleConfirmCreateList = () => {
    if (createListName.trim() && lists.length < 10) {
      createList(createListName);
      setIsCreateModalOpen(false);
      setCreateListName('');
    } else if (lists.length >= 10) {
      alert(t('listLimit'));
    }
  };

  const openDeleteModal = (listId: string) => {
    setListToDelete(listId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setListToDelete(null);
  };

  const confirmDeleteList = () => {
    if (listToDelete) {
      handleDeleteList(listToDelete);
      closeDeleteModal();
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : lists.length === 0 ? (
        <div className="w-full max-w-[1055px] h-auto mx-auto border border-dashed border-gray-400 mt-1 py-10 px-8 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <img
              src="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-cr-list.png"
              srcSet="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-cr-list@2x.png 2x, https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-cr-list@3x.png 3x"
              alt="Empty Crunchylist"
              className="w-41.5 h-53 mb-4"
            />
          </div>
          <h4 className="text-[#dadada] mb-[1rem] leading-[1.5] text-center">
            Você ainda não tem nenhuma Crunchylista.<br />Vamos criar uma!
          </h4>
          <div>
            <button
              tabIndex={0}
              className="inline-block py-2 px-4 bg-[#FF640A] opacity-90 hover:opacity-100 cursor-pointer"
              data-t="create-list-btn"
              onClick={handleCreateList}
            >
              <span className="text-black font-semibold text-sm uppercase">Criar Nova Lista</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[445px] lg:max-w-[1055px] mx-auto ">
          <div className="flex flex-col sm:flex-row sm:items-center mb-6 mt-1 w-full px-2 lg:px-0">
            <button
              onClick={handleCreateList}
              className="uppercase text-sm font-bold mr-4 px-4 py-2 border-2 border-[#FF640A] text-[#FF640A] bg-black cursor-pointer disabled:opacity-50"
              disabled={lists.length >= 10}
              aria-label={t('createNewList')}
            >
              {t('createNewList')}
            </button>
            <span className="text-[#A0A0A0] text-base">{t('listsCount', { count: lists.length })}</span>
          </div>

          <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2  gap-4 lg:gap-8 items-start justify-center">
            {lists.map((list) => (
              <div key={list.id} className="p-5 bg-[#141519] hover:bg-[#23252B] relative w-full max-w-full sm:max-w-xl mx-auto cursor-pointer" onClick={() => handleNavigateToList(list.id)}>
                <div>
                  <h3
                    className="text-xl m-0 cursor-pointer"
                    onClick={() => handleNavigateToList(list.id)}
                    tabIndex={0}
                    aria-label={list.name}
                    role="button"
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleNavigateToList(list.id); }}
                  >
                    {list.name}
                  </h3>
                </div>
                <div className="mt-2 flex gap-2 text-sm text-[#A0A0A0] flex-wrap">
                  <p>{`${list.items.length} ${t('items')}`}</p>
                  <p>
                    - {t('updatedAt')} {formatDate(list.updatedAt)}
                  </p>
                </div>
                <div className="absolute top-4 right-4">
                  <button
                    className="border-none text-2xl cursor-pointer text-[#A0A0A0] hover:text-white"
                    onClick={() => setVisibleMenu(visibleMenu === list.id ? null : list.id)}
                    aria-label={t('openMenu')}
                  >
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg>
                  </button>
                  {visibleMenu === list.id && (
                    <div className="w-48 absolute top-8 right-0 bg-[#23252B] z-10 py-2 flex flex-col shadow-lg ">
                      <button
                        onClick={() => {
                          handleRenameList(list.id, list.name);
                          setVisibleMenu(null);
                        }}
                        className="border-none text-left py-3 px-5 cursor-pointer text-base text-[#A0A0A0] hover:bg-[#141519] hover:text-white"
                        aria-label={t('rename')}
                      >
                        {t('rename')}
                      </button>
                      <button
                        onClick={() => {
                          openDeleteModal(list.id);
                          setVisibleMenu(null);
                        }}
                        className="border-none text-left py-3 px-5 cursor-pointer text-base text-[#A0A0A0] hover:bg-[#141519] hover:text-white"
                        aria-label={t('deleteList')}
                      >
                        {t('deleteList')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <RenameModal
        isOpen={!!editingListId}
        onClose={() => setEditingListId(null)}
        onRename={() => handleSaveNewName(newListName)}
        newListName={newListName}
        onNameChange={setNewListName}
      />
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleConfirmCreateList}
        newListName={createListName}
        onNameChange={setCreateListName}
        characterCount={createListName.length}
        maxCharacters={50}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={confirmDeleteList}
      />
    </div>
  );
};

export default CrunchyListPageClient;