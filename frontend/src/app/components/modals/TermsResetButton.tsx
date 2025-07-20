"use client";

import React from 'react';
import { useTermsAcceptance } from '../../[locale]/hooks/useTermsAcceptance';

interface TermsResetButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const TermsResetButton: React.FC<TermsResetButtonProps> = ({
  className = "",
  children
}) => {
  const { resetTermsAcceptance } = useTermsAcceptance();

  const handleReset = () => {
    resetTermsAcceptance();
    // Recarregar a página para mostrar o banner novamente
    window.location.reload();
  };

  return (
    <button
      onClick={handleReset}
      className={`text-sm text-gray-600 hover:text-gray-800 transition-colors ${className}`}
    >
      {children || "Resetar Termos"}
    </button>
  );
};

export default TermsResetButton; 