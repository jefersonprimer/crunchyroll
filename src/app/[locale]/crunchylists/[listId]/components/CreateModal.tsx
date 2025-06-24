import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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
        <div className="modal-content__wrapper--NV-Wa flex flex-col items-center justify-center h-full">
          <h2 className="heading--nKNOf heading--is-xs--UyvXH heading--is-family-type-one--GqBzU modal__header--W7gLI text-[#FFFFFF] mb-[20px] font-weight-600 text-[1.375rem]" data-t="title">
            Criar Crunchylista
          </h2>
          <div className="modal__body--wA4Z6 mb-[40px] w-full flex flex-col items-center">
            <div className="erc-create-custom-list-form w-full flex flex-col items-center">
              <div className="modal-description w-full flex flex-col items-center">
                <div className="text--gq6o- text--is-fixed-size--5i4oU text--is-xl---ywR- label--57-z9 label--is-dirty--oQgf4 basic-input--rrvny w-full max-w-[560px]" data-t="list-name-input">
                  <label className="basic-input__label--hOfP- w-full">
                    <div className="label__text-wrapper--9phMH">
                      <span className="label__text--wmphn" data-t="create-list-label">Nome da Lista</span>
                    </div>
                    <input
                      ref={inputRef}
                      className="input--mOn64 basic-input__field--bPk55 w-full p-[10px] bg-[#23252B] text-white border-b border-b-[#59595B] outline-none focus:border-b-[#FF640A] focus:outline-none"
                      placeholder=""
                      autoComplete="on"
                      aria-invalid="false"
                      type="text"
                      value={newListName}
                      name="list"
                      maxLength={maxCharacters}
                      onChange={e => onNameChange(e.target.value)}
                    />
                  </label>
                </div>
                <div className="text--gq6o- text--is-semibold--AHOYN text--is-s--JP2oa character-counter--dBmhc input-counter self-end pr-2 pt-1" data-t="character-count">
                  {characterCount}/{maxCharacters}
                </div>
              </div>
              <div className="modal-buttons-group--E3Pc2 w-full flex justify-center mt-6">
                <div className="buttons-group--LXd6Q buttons-group--is-type-one--5ZGbi flex gap-[10px]">
                  <button
                    tabIndex={0}
                    className="button--xqVd0 button--is-type-one--3uIzT buttons-group__item--ThNEA py-[8px] px-[32px] cursor-pointer bg-[#FF640A] text-[#000000] font-bold"
                    data-t="create-list-btn"
                    onClick={onCreate}
                    disabled={!newListName.trim()}
                  >
                    <span className="call-to-action--PEidl call-to-action--is-m--RVdkI button__cta--LOqDH">Criar Lista</span>
                  </button>
                  <button
                    tabIndex={0}
                    className="button--xqVd0 button--is-type-one-weak--KLvCX buttons-group__item--ThNEA py-[8px] px-[32px] cursor-pointer border-1 border-[#FF640A] text-[#FF640A] font-bold"
                    data-t="cancel-btn"
                    onClick={onClose}
                  >
                    <span className="call-to-action--PEidl call-to-action--is-m--RVdkI button__cta--LOqDH">Cancelar</span>
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