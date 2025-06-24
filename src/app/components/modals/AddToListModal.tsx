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
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[1000] bg-black/50"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#23252B] p-5 max-w-lg w-[90%] relative">
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
        <h3 className="text-xl text-center mt-5">{t('title')}</h3>

        <div className="mt-5 p-2 max-h-[300px] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder={t('newListName')}
              className="text-white border-b border-gray-500 bg-transparent p-2 outline-none transition duration-300 focus:border-orange-500"
            />

            <div className="flex justify-between items-center py-5 border-b border-gray-500">
              <span>{lists.length}/10 {t('listCount')}</span>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-transparent border-none cursor-pointer text-gray-500 hover:text-white"
              >
                {t('createNewList')}
              </button>
            </div>
          </div>

          {lists.map((list) => (
            <div
              key={list.id}
              className="flex justify-between p-2 border-b border-gray-500 hover:bg-[#141519]"
            >
              <div>
                <p className="pb-2">{list.name}</p>
                <span>{list.items.length} {t('items')}</span>
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


