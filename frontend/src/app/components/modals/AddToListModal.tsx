"use client"

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useLists } from "../../[locale]/contexts/ListsContext";
import { Anime } from "@/types/anime";
import { useTranslations } from 'next-intl';
import CreateModal from "../../[locale]/crunchylists/[listId]/components/CreateModal";

interface AddToListModalProps {
  anime: Anime;
  onClose: () => void;
  onAddToList?: (listId: string, anime: Anime) => void;
}

const AddToListModal: React.FC<AddToListModalProps> = ({ anime, onClose, onAddToList }) => {
  const { lists, addItemToList, removeItemFromList, createList } = useLists();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const t = useTranslations('addToListModal');

  const handleCreateList = () => {
    createList(newListName);
    setNewListName("");
    setIsCreateModalOpen(false);
  };

  const handleAddToList = (listId: string) => {
    if (onAddToList) {
      onAddToList(listId, anime);
    } else {
      addItemToList(listId, anime);
    }
  };

  const handleRemoveFromList = (listId: string) => {
    removeItemFromList(listId, anime.id);
  };

  const isAnimeInList = (listId: string) => {
    const list = lists.find((list) => list.id === listId);
    return list?.items.some((item) => item.id === anime.id) ?? false;
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[1000] bg-[#23252B]/60"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-[#23252B] p-5 w-full h-auto max-w-[720px] max-h-[512px]">
        <button
          className="absolute top-2 right-2 bg-transparent border-none text-2xl cursor-pointer text-white"
          onClick={onClose}
        >
          <svg 
            className="w-6 h-6" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            data-t="cross-svg" 
            aria-hidden="true" 
            role="img"
            fill="currentColor"
          >
            <path d="M13.414 12l5.293-5.293a.999.999 0 1 0-1.414-1.414L12 10.586 6.707 5.293a.999.999 0 1 0-1.414 1.414L10.586 12l-5.293 5.293a.999.999 0 0 0 0 1.414.993.993 0 0 0 1.414 0L12 13.414l5.293 5.293a.999.999 0 1 0 1.414-1.414L13.414 12z">
            </path>
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-center mt-5">{t('title')}</h2>

        <div className="mt-5 p-2 max-h-[300px] overflow-y-auto">
          <div className="flex flex-col gap-2">
       

            <div className="flex justify-between items-center py-5 px-2 border-b-2 border-[#4A4E58]">
              <span className="font-medium text-base text-[#a0a0a0]">{lists.length}/10 {t('listCount')}</span>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-transparent border-none cursor-pointer font-bold text-sm text-[#a0a0a0] hover:text-white uppercase"
              >
                {t('createNewList')}
              </button>
            </div>
          </div>

          {lists.map((list) => (
            <div
              key={list.id}
              className="flex justify-between p-4 border-b-2 border-[#4A4E58] hover:bg-[#141519] cursor-pointer"
            >
              <div>
                <p className="pb-2 font-semibold text-white text-base">{list.name}</p>
                <span className="text-[#a0a0a0] text-sm">{list.items.length} {t('items')}</span>
              </div>
              <button
                onClick={() =>
                  isAnimeInList(list.id)
                    ? handleRemoveFromList(list.id)
                    : handleAddToList(list.id)
                }
                className="text-orange-600 cursor-pointer p-1 text-2xl bg-transparent border-none"
              >
                {isAnimeInList(list.id) ? "-" : "+"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateList}
          newListName={newListName}
          onNameChange={setNewListName}
          characterCount={newListName.length}
          maxCharacters={50}
        />
      )}
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default AddToListModal;


