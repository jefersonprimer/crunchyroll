import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
  newListName: string;
  onNameChange: (name: string) => void;
  characterCount?: number;
  maxCharacters?: number;
}

const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  newListName,
  onNameChange,
  characterCount = 0,
  maxCharacters = 50,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // useEffect(() => {
  //   if (isOpen && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [isOpen]);

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
          <button onClick={onClose} className='cursor-pointer' aria-label="Cancelar">
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
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className=" text-[#FFFFFF] mb-[20px] font-weight-600 text-[1.375rem]" data-t="title">
            Criar Crunchylista
          </h2>
          <div className=" mb-[40px] w-full flex flex-col items-center">
            <div className="w-full flex flex-col items-center">
              <div className="w-full flex flex-col items-center">
                <div className="w-full max-w-[560px] relative" data-t="list-name-input">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      className=" w-full text-base pt-[20px] pb-[6px] bg-[#23252B] text-white border-b-2 border-b-[#59595B] outline-none focus:border-b-[#FF640A] focus:outline-none"
                      placeholder=""
                      autoComplete="on"
                      aria-invalid="false"
                      type="text"
                      value={newListName}
                      name="list"
                      maxLength={maxCharacters}
                      onChange={e => onNameChange(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                    <label 
                      className={`absolute left-0 transition-all duration-200 pointer-events-none ${
                        newListName || isFocused
                          ? 'top-[2px] text-[12px] text-[#FF640A]'
                          : 'bottom-2 text-[18px] text-[#A0A0A0]'
                      }`}
                      data-t="create-list-label"
                    >
                      Nome da Lista
                    </label>
                  </div>
                </div>
              </div>
              <div className=" w-full flex justify-center mt-10">
                <div className=" flex gap-[10px]">
                  <button
                    tabIndex={0}
                    className=" py-[8px] px-[64px] cursor-pointer hover:opacity-100 opacity-90 bg-[#FF640A] text-[#000000] font-bold"
                    data-t="create-list-btn"
                    onClick={onCreate}
                    disabled={!newListName.trim()}
                  >
                    <span className="text-sm font-bold uppercase">Criar Lista</span>
                  </button>
                  <button
                    tabIndex={0}
                    className="py-[8px] px-[64px] cursor-pointer border-2 hover:opacity-100 opacity-90 border-[#FF640A] text-[#FF640A] font-bold"
                    data-t="cancel-btn"
                    onClick={onClose}
                  >
                    <span className="text-sm font-bold uppercase">Cancelar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CreateModal; 