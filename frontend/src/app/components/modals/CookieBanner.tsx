"use client";

import React, { useState } from 'react';
import CookieSettingsModal from './CookieSettingsModal';
import { useCookieConsent, CookiePreferences } from '../../[locale]/hooks/useCookieConsent';
import Link from 'next/link';

interface CookieBannerProps {
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  onSettings?: () => void;
  onClose?: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({
  onAcceptAll,
  onRejectAll,
  onSettings,
  onClose
}) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const { hasConsented, acceptAll, rejectAll, savePreferences } = useCookieConsent();

  const handleAcceptAll = () => {
    acceptAll();
    onAcceptAll?.();
  };

  const handleRejectAll = () => {
    rejectAll();
    onRejectAll?.();
  };

  const handleSettings = () => {
    setIsSettingsModalOpen(true);
  };

  const handleSettingsSave = (preferences: CookiePreferences) => {
    savePreferences(preferences);
    setIsSettingsModalOpen(false);
    onSettings?.();
  };

  const handleSettingsClose = () => {
    setIsSettingsModalOpen(false);
  };

  const handleClose = () => {
    onClose?.();
  };

  // Não mostrar o banner se o usuário já deu consentimento
  if (hasConsented !== false) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            {/* Mensagem de cookies */}
            <div className="flex-1 text-sm text-white">
              <p>
                Nosso site usa cookies e outras tecnologias ("cookies") para melhorar seu funcionamento,
                torná-lo mais pessoal para você e fornecer publicidade com base em suas atividades de navegação
                e interesses neste site e em outros. Para saber mais veja a nossa <Link href="/politica-privacidade" className="text-[#00BFFF] underline">Política de Privacidade e Cookies</Link>.
                Para fazer escolhas sobre cookies específicos, incluída a retirada do consentimento após tê-lo concedido,
                acesse nossa  <Link href="#" className="text-[#00BFFF] underline">Ferramenta de Consentimento de Cookies</Link> (disponível em todas as páginas).
                Você não precisa ter cookies ativados para usar nossos sites e aplicativos,
                mas desativá-los pode afetar sua experiência neles. Ao clicar em "Aceitar",
                você concorda que os cookies possam ser usados para esses fins e para o compartilhamento de seus dados
                com a <Link href="#" className="text-[#00BFFF] underline">Sony Pictures</Link> e <Link href="#" className="text-[#00BFFF] underline">empresas do grupo Sony</Link>.{' '}
              </p>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handleSettings}
                className="px-4 py-2 text-sm font-medium cursor-pointer text-black bg-[#00BFFF] hover:opacity-60 transition-colors duration-200 whitespace-nowrap"
              >
                Definições de Cookie
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm font-medium cursor-pointer text-black bg-[#00BFFF] hover:opacity-60 transition-colors duration-200 whitespace-nowrap"
              >
                Rejeitar Todos
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium cursor-pointer text-black bg-[#00BFFF] hover:opacity-60 transition-colors duration-200 whitespace-nowrap"
              >
                Aceitar Todos
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium cursor-pointer hover:opacity-60 transition-colors duration-200 whitespace-nowrap"
              >
                <svg 
                  className="w-6 h-6 text-[#565656]" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  data-t="cross-svg" 
                  aria-hidden="true" 
                  role="img"
                  fill="currentColor"
                >
                  <path d="M13.414 12l5.293-5.293a.999.999 0 1 0-1.414-1.414L12 10.586 6.707 5.293a.999.999 0 1 0-1.414 1.414L10.586 12l-5.293 5.293a.999.999 0 0 0 0 1.414.993.993 0 0 0 1.414 0L12 13.414l5.293 5.293a.999.999 0 1 0 1.414-1.414L13.414 12z">
                  </path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Configurações */}
      <CookieSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={handleSettingsClose}
        onSave={handleSettingsSave}
      />
    </>
  );
};

export default CookieBanner; 