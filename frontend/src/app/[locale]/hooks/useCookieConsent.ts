import { useState, useEffect } from 'react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export const useCookieConsent = () => {
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    // Verificar se o usuário já deu consentimento
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const savedPreferences = localStorage.getItem('cookiePreferences');
    
    if (cookiesAccepted === 'true') {
      setHasConsented(true);
      if (savedPreferences) {
        try {
          const parsed = JSON.parse(savedPreferences);
          setPreferences(parsed);
        } catch (error) {
          console.error('Erro ao carregar preferências de cookies:', error);
        }
      }
    } else {
      setHasConsented(false);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    
    setHasConsented(true);
    setPreferences(allAccepted);
  };

  const rejectAll = () => {
    const allRejected = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(allRejected));
    
    setHasConsented(true);
    setPreferences(allRejected);
  };

  const savePreferences = (newPreferences: CookiePreferences) => {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(newPreferences));
    
    setHasConsented(true);
    setPreferences(newPreferences);
  };

  const resetConsent = () => {
    localStorage.removeItem('cookiesAccepted');
    localStorage.removeItem('cookiePreferences');
    
    setHasConsented(false);
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    });
  };

  return {
    hasConsented,
    preferences,
    acceptAll,
    rejectAll,
    savePreferences,
    resetConsent
  };
}; 