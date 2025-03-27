"use client";

import React, { useState } from 'react';

interface LoginButtonProps {
  isDark: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ isDark }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleModal}
        className={`cursor-pointer ${isDark ? "text-white hover:bg-[#4A4E58]" : "text-[#4A4E62] hover:bg-[#E6E5E3]"} ${isModalOpen ? (isDark ? "bg-[#4A4E58]" : "bg-[#fff]") : ""} hover:text-[#008382] transition-colors px-4 py-[21px] lg:py-[10px] group-hover:text-[#008382] group`}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 32 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`stroke-[#52565F] group-hover:stroke-[#2ABDBB] ${isDark ? "stroke-white" : ""} ${isModalOpen ? "stroke-[#2ABDBB]" : ""}`}
        >
          <path
            d="M16.1907 14.6737C19.9366 14.6737 22.9732 11.6328 22.9732 7.88155C22.9732 4.13032 19.9366 1.08936 16.1907 1.08936C12.4448 1.08936 9.4082 4.13032 9.4082 7.88155C9.4082 11.6328 12.4448 14.6737 16.1907 14.6737Z"
            strokeWidth="2"
          ></path>
          <path
            d="M2 17.8427L16.1894 15.0577L30.3787 17.8427C30.3787 22.2477 24.0219 29.5088 16.1894 29.5088C8.35683 29.5088 2 22.2477 2 17.8427Z"
            strokeWidth="2"
          ></path>
        </svg>
      </button>

      {/* Modal posicionado abaixo do ícone */}
      {isModalOpen && (
           <div className={`
            fixed md:absolute 
            inset-0 md:inset-auto 
            z-50 
            md:right-0 md:top-full 
            w-full md:w-64 
            h-[calc(100%-60px)] md:h-auto  /* Ajuste para deixar espaço para o header */
            mt-[60px] md:mt-1 /* Espaço para o header em mobile */
            ${isDark ? "bg-[#2B2D32]" : "bg-white"} 
            shadow-lg 
            md:rounded-md 
            overflow-y-auto
          `}>
          {/* Opção de Login */}
          <div className={`px-4 py-3 ${isDark ? "hover:bg-[#4A4E58]" : "hover:bg-[#E6E5E3]"}`}>
            <button className="w-full text-left">
              <h3 className={`text-xl ${isDark ? "text-white" : "text-[#000000]"}`}>Criar Conta</h3>
              <p className={`${isDark ? "text-[#A0A0A0]" : "text-[#4A4E58]"} text-sm mt-1`}>Cadastre-se de graça ou torne-se Premium.</p>
            </button>
          </div>

          {/* Opção de Criar Conta */}
          <div className={`px-4 py-3 ${isDark ? "hover:bg-[#4A4E58]" : "hover:bg-[#E6E5E3]"}`}>
            <button className="w-full text-left">
              <h3 className={`text-xl ${isDark ? "text-white" : "text-[#000000]"}`}>Login</h3>
              <p className={`${isDark ? "text-[#A0A0A0]" : "text-[#4A4E58]"} text-sm mt-1`}>Já é membro da Crunchyroll? Seja bem-vindo.</p>
            </button>
          </div>

          {/* Div ajustada com background e conteúdo centralizado */}
          <div className="px-4 py-3">
            <a 
              href="https://www.crunchyroll.com/pt-br/premium?referrer=newweb_organic_acct_menu_news&return_url=https%3A%2F%2Fwww.crunchyroll.com%2Fpt-br%2Fnews#plans" 
              className="flex items-center justify-center gap-2 bg-[#FABB18] hover:bg-[#e6a900] text-black font-medium py-2 px-4 transition-colors w-full"
            >
              <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.7733 5.76876L12.1951 6.37871L12.9012 6.15222L16.5297 4.98844L14.5439 12H3.45612L1.47001 4.98733L5.10881 6.15238L5.8156 6.37867L6.23694 5.76774L9.00109 1.75978L11.7733 5.76876Z" stroke="black" strokeWidth="2"></path>
              </svg>
              TESTE GRÁTIS
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;