"use client";

import React from 'react';
import { useTermsAcceptance } from '../../[locale]/hooks/useTermsAcceptance';
import Link from 'next/link';

interface TermsUpdateBannerProps {
  onContinue?: () => void;
}

const TermsUpdateBanner: React.FC<TermsUpdateBannerProps> = ({
  onContinue
}) => {
  const { hasAcceptedTerms, acceptTerms } = useTermsAcceptance();

  const handleContinue = () => {
    acceptTerms();
    onContinue?.();
  };

  // Não mostrar o banner se o usuário já aceitou os termos
  if (hasAcceptedTerms !== false) {
    return null;
  }

  return (
    <div className="w-full bg-[#ECE1C2] text-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          {/* Mensagem */}
          <div className="flex-1">
            <h2 className="text-2xl font-medium my-4">
              Atualizamos nossos Termos
            </h2>
            <p className="text-[18px] font-medium">
              Atualizamos nossos <Link href="#" className="underline hover:text-[#FF640A]">Termos de Uso</Link> para o uso da Crunchyroll. Revise os termos atualizados. 
              Ao continuar, você concorda com os <br/> novos termos.
            </p>
          {/* Botão */}
          <div className="flex-shrink-0 my-6">
            <button
              onClick={handleContinue}
              className="px-4 py-2 text-[0.875rem] cursor-pointer bg-black hover:opacity-90 transition-colors duration-200 whitespace-nowrap"
            >
             <span className="font-semibold text-[#FF640A] uppercase">continuar</span>
            </button>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsUpdateBanner; 