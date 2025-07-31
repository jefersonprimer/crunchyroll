'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useMultipleAccountsContext } from '@/app/[locale]/contexts/MultipleAccountsContext';
import { StoredAccount } from '@/app/[locale]/hooks/useMultipleAccounts';
import ConfirmationModal from '@/app/components/modals/ConfirmationModal';

interface ProfileSelectionClientProps {
  locale: string;
}

const ProfileSelectionClient: React.FC<ProfileSelectionClientProps> = ({ locale }) => {
  const t = useTranslations('profileSelection');
  const router = useRouter();
  const { accounts, currentAccount, isLoading, switchAccount, removeAccount, logoutCurrentAccount } = useMultipleAccountsContext();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [accountToRemove, setAccountToRemove] = useState<StoredAccount | null>(null);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Handle initial load and account changes
  useEffect(() => {
    if (currentAccount) {
      if (currentAccount.background_image_url) {
        setBackgroundLoaded(false);
      } else {
        setBackgroundLoaded(true);
      }
    } else {
      // Se não há conta atual, mostrar fallback
      setBackgroundLoaded(true);
    }
    
    // Marcar que não é mais o carregamento inicial
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [currentAccount, isInitialLoad]);

  // Reset background loaded state when account changes
  useEffect(() => {
    // Se temos uma conta atual com imagem de fundo, resetar o estado
    if (currentAccount?.background_image_url) {
      setBackgroundLoaded(false);
    } else {
      // Se não temos imagem de fundo, marcar como carregado para mostrar o fallback
      setBackgroundLoaded(true);
    }
  }, [currentAccount?.id, currentAccount?.background_image_url]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(locale === 'pt-br' ? 'pt-BR' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const handleProfileClick = (account: StoredAccount) => {
    // Se for a mesma conta, apenas navegar
    if (currentAccount?.id === account.id) {
      router.push(`/${locale}`);
      return;
    }
    
    // Se for uma conta diferente, mostrar feedback visual
    switchAccount(account.id);
    
    // Pequeno delay para mostrar a mudança de background
    setTimeout(() => {
      router.push(`/${locale}`);
    }, 300);
  };

  const handleAddProfile = () => {
    // Deslogar o usuário atual antes de redirecionar para login
    logoutCurrentAccount();
    
    // Redirecionar para login
    router.push(`/${locale}/login`);
  };

  const handleRemoveAccount = (account: StoredAccount, e: React.MouseEvent) => {
    e.stopPropagation();
    setAccountToRemove(account);
    setShowRemoveModal(true);
  };

  const confirmRemoveAccount = () => {
    if (accountToRemove) {
      removeAccount(accountToRemove.id);
      setShowRemoveModal(false);
      setAccountToRemove(null);
    }
  };

  const cancelRemoveAccount = () => {
    setShowRemoveModal(false);
    setAccountToRemove(null);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto relative min-h-screen">
      {/* Background Image */}
      {currentAccount?.background_image_url && !isInitialLoad ? (
        <div 
          className="fixed inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${currentAccount.background_image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: backgroundLoaded ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: -1
          }}
        >
          {/* Overlay para melhorar legibilidade */}
          <div className="absolute inset-0 bg-black/70" />
          
          {/* Hidden image for loading detection */}
          <img
            src={currentAccount.background_image_url}
            alt=""
            className="hidden"
            onLoad={() => setBackgroundLoaded(true)}
            onError={() => setBackgroundLoaded(true)}
          />
        </div>
      ) : (
        /* Fallback gradient background */
        <div 
          className="fixed inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          style={{ zIndex: -1 }}
        />
      )}
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-4xl font-medium text-white mb-4">
          {t('titlePage')}
        </h1>
        <p className="text-xl text-gray-300 mb-4">
          {t('subtitle')}
        </p>
        
        {/* Current Account Indicator */}
        {currentAccount && (
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-xs font-bold">
              {currentAccount.profile_image_url ? (
                <img
                  src={currentAccount.profile_image_url}
                  alt={currentAccount.display_name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                currentAccount.display_name.charAt(0).toUpperCase()
              )}
            </div>
            <span className="text-white text-sm font-medium">
              {currentAccount.display_name}
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {/* Existing Profiles */}
        {accounts.map((account) => (
                     <div
             key={account.id}
             className="group relative bg-gray-900/90 backdrop-blur-sm rounded-lg p-6 cursor-pointer transition-all duration-300 hover:bg-gray-800/95 hover:scale-105 border-2 border-transparent hover:border-orange-500 shadow-lg"
             onClick={() => handleProfileClick(account)}
           >
            {/* Profile Image */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-2xl font-bold">
                {account.profile_image_url ? (
                  <img
                    src={account.profile_image_url}
                    alt={account.display_name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  account.display_name.charAt(0).toUpperCase()
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center">
              <h3 className="text-white text-lg font-semibold mb-2">
                {account.display_name}
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                @{account.username}
              </p>
              <p className="text-gray-500 text-xs">
                {t('lastLogin', { date: formatDate(account.lastLoginAt) })}
              </p>
            </div>

            {/* Current Account Indicator */}
            {currentAccount?.id === account.id && (
              <div className="absolute top-2 right-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            )}

            {/* Remove Button */}
            <button
              onClick={(e) => handleRemoveAccount(account, e)}
              className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              title={t('removeAccount')}
            >
                <svg 
                    className="w-6 h-6" 
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
        ))}

                 {/* Add Profile Card */}
         <div
           className="group bg-gray-900/90 backdrop-blur-sm rounded-lg p-6 cursor-pointer transition-all duration-300 hover:bg-gray-800/95 hover:scale-105 border-2 border-dashed border-gray-600 hover:border-orange-500 shadow-lg"
           onClick={handleAddProfile}
         >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mb-4 group-hover:bg-gray-600 transition-colors duration-200">
              <svg
                className="w-8 h-8 text-gray-400 group-hover:text-orange-500 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold text-center">
              {t('addProfile')}
            </h3>
            <p className="text-gray-400 text-sm text-center mt-2">
              {t('addNewAccount')}
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {accounts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h3 className="text-white text-xl font-semibold mb-2">
            {t('noProfiles')}
          </h3>
          <p className="text-gray-400 mb-6">
            {t('loginToAddProfile')}
          </p>
          <button
            onClick={handleAddProfile}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            {t('addProfile')}
          </button>
        </div>
      )}

             {/* Confirmation Modal */}
       <ConfirmationModal
         isOpen={showRemoveModal}
         onClose={cancelRemoveAccount}
         onConfirm={confirmRemoveAccount}
         title={t('confirmRemove')}
         message={t('confirmRemoveDescription')}
       />
    </div>
  );
};

export default ProfileSelectionClient; 