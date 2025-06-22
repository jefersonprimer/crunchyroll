import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

interface RenameModalProps {
  currentName: string;
  onSave: (newName: string) => void;
  onClose: () => void;
}

const RenameModal: React.FC<RenameModalProps> = ({ currentName, onSave, onClose }) => {
  const t = useTranslations('CrunchylistComponent');
  const [newListName, setNewListName] = useState(currentName);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-[#23252B] p-[20px] max-w-[400px] w-full text-center">
        <h2>{t('renameList')}</h2>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="w-full my-5 text-white bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-[#FF640A]"
        />
        <div>
          <button
            className="py-[8px] px-[16px] m-[5px] cursor-pointer font-bold bg-[#FF640A] text-black border-none"
            onClick={() => onSave(newListName)}
          >
            {t('renameButton')}
          </button>
          <button
            className="py-[8px] px-[16px] m-[5px] cursor-pointer font-bold bg-transparent text-[#FF640A] border-1 border-[#FF640A]"
            onClick={onClose}
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal; 