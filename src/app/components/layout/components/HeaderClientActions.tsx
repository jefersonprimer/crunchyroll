// app/components/layout/HeaderClientActions.tsx
"use client"; // MARQUE COMO CLIENT COMPONENT

import React, { useState, useEffect } from "react";
import NavigationMenu from "./NavigationMenu"; // Ajuste o caminho
import MobileMenu from "./MobileMenu"; // Ajuste o caminho
import { useAuth } from "@/app/[locale]/hooks/useAuth"; // Seu hook de autenticação
import HeaderActions from "./HeaderActions"; // Ajuste o caminho

// Defina as props que este Client Component receberá do Server Component pai
interface HeaderClientActionsProps {
  locale: string;
  initialUserProfile: any | null; // Recebe o userProfile inicial do servidor
}

export default function HeaderClientActions({ locale, initialUserProfile }: HeaderClientActionsProps) {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isAnonymousModalOpen, setIsAnonymousModalOpen] = useState(false);

  // useAuth agora é chamado aqui no Client Component
  // Você pode inicializá-lo com o userProfile vindo do servidor para evitar um flash de loading
  const { userProfile, isLoading, checkAuthState } = useAuth(initialUserProfile); // Adapte useAuth para aceitar initialProfile

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize(); // Executa na montagem inicial
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleUserClick = async () => {
    await checkAuthState(); // Garante que o estado de auth está atualizado
    if (userProfile) {
      setIsAccountModalOpen(true);
    } else {
      setIsAnonymousModalOpen(true);
    }
  };

  // Se o HeaderSkeleton for apenas para o estado de carregamento do auth no cliente,
  // você pode renderizá-lo aqui. Se for para o header inteiro, pode ser melhor
  // gerenciado pelo `loading.tsx` da rota.
  // Por simplicidade, vou assumir que o HeaderSkeleton é para o carregamento de dados do useAuth.
  if (isLoading) {
    // Retorne um esqueleto ou null se quiser que a parte do Server Component apareça antes.
    // Ou, se o HeaderSkeleton representa todo o conteúdo dinâmico, pode ser aqui.
    // Para um Header que é Server Component, o ideal é que ele já carregue o userProfile
    // e o esqueleto seja para o cliente se o userProfile ainda estiver sendo verificado.
    return (
        <div className="flex flex-1 justify-end items-center">
            {/* Um placeholder para as ações enquanto carrega */}
            <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse mr-2"></div>
            <div className="w-16 h-6 bg-gray-700 rounded animate-pulse"></div>
        </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 justify-start -ml-5">
        {isMobileView ? (
          <MobileMenu locale={locale} /> {/* Passe o locale para MobileMenu */}
        ) : (
          <NavigationMenu locale={locale} /> {/* Passe o locale para NavigationMenu */}
        )}
      </div>

      <HeaderActions
        userProfile={userProfile}
        onUserClick={handleUserClick}
        // isAccountModalOpen={isAccountModalOpen} // Não é mais necessário aqui, use o estado interno
        // isAnonymousModalOpen={isAnonymousModalOpen} // Não é mais necessário aqui
      />

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        userProfile={userProfile}
      />
      <AnonymousUserModal
        isOpen={isAnonymousModalOpen}
        onClose={() => setIsAnonymousModalOpen(false)}
      />
    </>
  );
}