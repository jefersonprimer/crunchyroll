import React from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-[#23252B]/60">
      <div className="relative p-8 bg-[#23252B] shadow-xl max-w-[710px] w-full mx-4">
        <button
          aria-label="Close Modal"
          tabIndex={0}
          className="absolute top-4 right-4 text-white cursor-pointer"
          onClick={onClose}
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" role="img" fill="currentColor">
            <path d="M13.414 12l5.293-5.293a.999.999 0 1 0-1.414-1.414L12 10.586 6.707 5.293a.999.999 0 1 0-1.414 1.414L10.586 12l-5.293 5.293a.999.999 0 0 0 0 1.414.993.993 0 0 0 1.414 0L12 13.414l5.293 5.293a.999.999 0 1 0 1.414-1.414L13.414 12z"></path>
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          <img
            className="w-58 h-auto mb-6"
            src="https://www.crunchyroll.com/build/assets/img/auth_modal/auth-hime.png"
            srcSet="https://www.crunchyroll.com/build/assets/img/auth_modal/auth-hime@2x.png 2x"
            alt="Personagem Crunchyroll Hime"
          />
          <h2 className="text-2xl font-bold text-white mb-4">Fazer Login ou Criar Conta</h2>
          <p className="text-lg text-[#A0A0A0] mb-6">
            Faça login para adicionar séries e filmes à sua Fila, customizar suas preferências e mais! Novo por aqui? Crie uma conta da Crunchyroll.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
            <a
              tabIndex={0}
              className="uppercase text-sm w-full sm:w-1/2 bg-[#FF640A] hover:opacity-100 opacity-90 text-black font-extrabold py-3 px-6 ease-in-out text-center"
              href="/login"
            >
              login
            </a>
            <a
              tabIndex={0}
              className="uppercase text-sm w-full sm:w-1/2 bg-[#FF640A] hover:opacity-100 opacity-90 text-black font-extrabold py-3 px-6 ease-in-out text-center"
              href="/register"
            >
              criar conta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;