"use client";

import React, { useState } from 'react';
import CookieSettingsModal from './CookieSettingsModal';
import { useCookieConsent, CookiePreferences } from '../../[locale]/hooks/useCookieConsent';

interface CookieSettingsButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const CookieSettingsButton: React.FC<CookieSettingsButtonProps> = ({
  className = "",
  children
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { savePreferences } = useCookieConsent();

  const handleOpenSettings = () => {
    setIsModalOpen(true);
  };

  const handleCloseSettings = () => {
    setIsModalOpen(false);
  };

  const handleSaveSettings = (preferences: CookiePreferences) => {
    savePreferences(preferences);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenSettings}
        className={`text-sm text-gray-600 hover:text-gray-800 transition-colors ${className}`}
      >
        {children || "Configurações de Cookies"}
      </button>

      <CookieSettingsModal
        isOpen={isModalOpen}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}
      />
    </>
  );
};

export default CookieSettingsButton; 