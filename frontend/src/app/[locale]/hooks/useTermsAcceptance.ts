import { useState, useEffect } from 'react';

export const useTermsAcceptance = () => {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificar se o usuário já aceitou os termos
    const termsAccepted = localStorage.getItem('termsAccepted');
    setHasAcceptedTerms(termsAccepted === 'true');
  }, []);

  const acceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true');
    setHasAcceptedTerms(true);
  };

  const resetTermsAcceptance = () => {
    localStorage.removeItem('termsAccepted');
    setHasAcceptedTerms(false);
  };

  return {
    hasAcceptedTerms,
    acceptTerms,
    resetTermsAcceptance
  };
}; 