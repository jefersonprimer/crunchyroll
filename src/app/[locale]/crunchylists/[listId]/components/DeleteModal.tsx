import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete }) => {
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
        className="bg-[#23252B] p-4 md:p-[20px] w-full max-w-[90vw] md:max-w-[720px] h-auto md:h-[336px] flex flex-col justify-center"
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
            Deletar Crunchylista
          </h2>
          <div className="modal__body--wA4Z6 mb-[40px] w-full flex flex-col items-center">
            <p className="text--gq6o- text--is-l--iccTo modal__text--T4seZ text-center text-[#A0A0A0]" data-t="description">
              Tem certeza de que deseja deletar esta Crunchylista? <br /> Esta ação não pode ser revertida.
            </p>
          </div>
          <div className="modal-buttons-group--E3Pc2 w-full flex justify-center">
            <div className="buttons-group--LXd6Q buttons-group--is-type-one--5ZGbi flex gap-[10px]">
              <button
                tabIndex={0}
                className="button--xqVd0 button--is-type-one--3uIzT buttons-group__item--ThNEA py-[8px] px-[32px] cursor-pointer bg-[#FF640A] text-[#000000] font-bold"
                data-t="delete-btn"
                onClick={onDelete}
              >
                <span className="call-to-action--PEidl call-to-action--is-m--RVdkI button__cta--LOqDH">Deletar Lista</span>
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
    </div>,
    document.body
  );
};

export default DeleteModal; 