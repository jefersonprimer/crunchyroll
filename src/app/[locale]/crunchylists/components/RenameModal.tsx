import { useTranslations } from 'next-intl';
import React, { useState, useEffect, useRef } from 'react';

interface RenameModalProps {
  currentName: string;
  onSave: (newName: string) => void;
  onClose: () => void;
}

const RenameModal: React.FC<RenameModalProps> = ({ currentName, onSave, onClose }) => {
  const t = useTranslations('CrunchylistComponent');
  const [newListName, setNewListName] = useState(currentName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNewListName(currentName);
  }, [currentName]);

  useEffect(() => {
    inputRef.current?.focus();
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const isSaveDisabled = !newListName.trim() || newListName === currentName;

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[1000] bg-[#23252B]/60"
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#23252B] p-[20px] w-full max-w-[720px] h-[336px] flex flex-col justify-between">
        <div className='cursor-pointer flex justify-end'>
          <button onClick={onClose} className='cursor-pointer' aria-label={t('cancel')}>
            <svg 
              className='text-[#FFFFFF] w-6 h-6' 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              data-t="cross-svg" 
              aria-hidden="true" 
              role="img"
              fill='currentColor'
            >
              <path d="M13.414 12l5.293-5.293a.999.999 0 1 0-1.414-1.414L12 10.586 6.707 5.293a.999.999 0 1 0-1.414 1.414L10.586 12l-5.293 5.293a.999.999 0 0 0 0 1.414.993.993 0 0 0 1.414 0L12 13.414l5.293 5.293a.999.999 0 1 0 1.414-1.414L13.414 12z" />
            </svg>
          </button>
        </div>
        <div className='flex flex-col justify-center items-center flex-1'>
          <h2 className="text-[#FFFFFF] mb-[20px] font-weight-600 text-[1.375rem]">{t('renameList')}</h2>
          <div className="mb-[60px] w-full flex flex-col items-center">
            <label htmlFor="rename-list-input" className="block text-[#A0A0A0] self-start ml-[calc(50%-280px)]">{t('listName')}</label>
            <input
              ref={inputRef}
              id="rename-list-input"
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="w-full max-w-[560px] p-[10px] bg-[#23252B] text-white border-b border-b-[#59595B] outline-none focus:border-b-[#FF640A] focus:outline-none"
            />
          </div>
          <div className="flex justify-center gap-[10px] w-full max-w-[560px]">
            <button
              onClick={() => onSave(newListName)}
              disabled={isSaveDisabled}
              className={`py-[8px] px-[32px] cursor-pointer bg-[#FF640A] text-[#000000] font-bold ${isSaveDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {t('renameButton')}
            </button>
            <button onClick={onClose} className="py-[8px] px-[32px] cursor-pointer border border-[#FF640A] text-[#FF640A] font-bold">
              {t('cancel')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenameModal; 
