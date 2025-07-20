"use client";

import React from 'react';
import { useTermsAcceptance } from '../../[locale]/hooks/useTermsAcceptance';

interface TermsUpdateModalProps {
  onContinue?: () => void;
}

const TermsUpdateModal: React.FC<TermsUpdateModalProps> = ({
  onContinue
}) => {
  const { hasAcceptedTerms, acceptTerms } = useTermsAcceptance();

  const handleContinue = () => {
    acceptTerms();
    onContinue?.();
  };

  // Não mostrar o modal se o usuário já aceitou os termos
  if (hasAcceptedTerms !== false) {
    return null;
  }

  return (
    <div className="top-20 inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Atualizamos nossos Termos
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 text-center leading-relaxed">
            Atualizamos nossos Termos de Uso para o uso da Crunchyroll. Revise os termos atualizados. 
            Ao continuar, você concorda com os novos termos.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-center p-6 border-t border-gray-200">
          <button
            onClick={handleContinue}
            className="px-6 py-3 text-sm font-medium text-white bg-[#00BFFF] hover:opacity-80 rounded-md transition-colors duration-200"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsUpdateModal; 