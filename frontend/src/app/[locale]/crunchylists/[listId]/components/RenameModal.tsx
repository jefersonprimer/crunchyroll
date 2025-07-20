import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslations } from 'next-intl';

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRename: () => void;
  newListName: string;
  onNameChange: (name: string) => void;
}

const RenameModal: React.FC<RenameModalProps> = ({
  isOpen,
  onClose,
  onRename,
  newListName,
  onNameChange
}) => {
    const t = useTranslations('ListDetails');

  // Fechar com ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[1000] bg-[#23252B]/60"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      tabIndex={-1}
    >
      <div
        className="bg-[#23252B] p-4 md:p-[20px] w-full max-w-[90vw] md:max-w-[720px] h-auto md:h-[336px]"
        onClick={e => e.stopPropagation()}
      >
        <div className='cursor-pointer flex justify-end'>
          <button onClick={onClose} className='cursor-pointer' aria-label={t('cancelButton')}>
          <svg 
            className='text-[#FFFFFF] w-6 h-6' 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            data-t="cross-svg" 
            aria-hidden="true" 
            role="img"
            fill='currentColor'
            >
              <path d="M13.414 12l5.293-5.293a.999.999 0 1 0-1.414-1.414L12 10.586 6.707 5.293a.999.999 0 1 0-1.414 1.414L10.586 12l-5.293 5.293a.999.999 0 0 0 0 1.414.993.993 0 0 0 1.414 0L12 13.414l5.293 5.293a.999.999 0 1 0 1.414-1.414L13.414 12z">
            </path>
          </svg>
          </button>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h2 className="text-[#FFFFFF] mb-[20px] font-weight-600 text-[1.375rem]">{t('renameTitle')}</h2>
          <div className="mb-[60px] w-full flex flex-col items-center">
            <label htmlFor="listNameInput" className="block text-[#A0A0A0] self-start ml-[calc(50%-280px)]">{t('listName')}</label>
            <input
              id="listNameInput"
              type="text"
              value={newListName}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full max-w-[560px] p-[10px] bg-[#23252B] text-white border-b border-b-[#59595B] outline-none focus:border-b-[#FF640A] focus:outline-none"
            />
          </div>
          <div className="flex justify-center gap-[10px] w-full max-w-[560px]">
            <button
              onClick={onRename}
              className="py-[8px] px-[32px] cursor-pointer bg-[#FF640A] text-[#000000] font-bold"
              disabled={!newListName.trim()}
            >
              {t('renameButton')}
            </button>
            <button onClick={onClose} className="py-[8px] px-[32px] cursor-pointer border-1 border-[#FF640A] text-[#FF640A] font-bold">{t('cancelButton')}</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RenameModal; 