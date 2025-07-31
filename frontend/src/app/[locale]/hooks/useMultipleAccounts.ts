import { useState, useEffect, useCallback } from 'react';
import { UserProfile } from '@/types/header';

export interface StoredAccount {
  id: string;
  email: string;
  username: string;
  display_name: string;
  profile_image_url: string | null;
  background_image_url: string | null;
  token: string;
  lastLoginAt: string;
  createdAt: string;
}

export interface MultipleAccountsHook {
  accounts: StoredAccount[];
  currentAccount: StoredAccount | null;
  isLoading: boolean;
  addAccount: (userProfile: UserProfile, token: string) => void;
  removeAccount: (accountId: string) => void;
  switchAccount: (accountId: string) => void;
  getCurrentAccount: () => StoredAccount | null;
  clearAllAccounts: () => void;
  logoutCurrentAccount: () => void;
  updateAccount: (accountId: string, updates: Partial<StoredAccount>) => void;
}

const STORAGE_KEY = 'crunchyroll_accounts';
const CURRENT_ACCOUNT_KEY = 'crunchyroll_current_account';

export const useMultipleAccounts = (): MultipleAccountsHook => {
  const [accounts, setAccounts] = useState<StoredAccount[]>([]);
  const [currentAccount, setCurrentAccount] = useState<StoredAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar contas do localStorage
  const loadAccounts = useCallback(() => {
    try {
      const storedAccounts = localStorage.getItem(STORAGE_KEY);
      const storedCurrentAccount = localStorage.getItem(CURRENT_ACCOUNT_KEY);
      
      if (storedAccounts) {
        const parsedAccounts = JSON.parse(storedAccounts);
        setAccounts(parsedAccounts);
        
        if (storedCurrentAccount) {
          const current = JSON.parse(storedCurrentAccount);
          setCurrentAccount(current);
        } else if (parsedAccounts.length > 0) {
          // Se não há conta atual, usar a primeira
          setCurrentAccount(parsedAccounts[0]);
          localStorage.setItem(CURRENT_ACCOUNT_KEY, JSON.stringify(parsedAccounts[0]));
        }
      }
    } catch (error) {
      console.error('Error loading accounts from localStorage:', error);
      // Limpar dados corrompidos
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(CURRENT_ACCOUNT_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Salvar contas no localStorage
  const saveAccounts = useCallback((newAccounts: StoredAccount[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAccounts));
    } catch (error) {
      console.error('Error saving accounts to localStorage:', error);
    }
  }, []);

  // Salvar conta atual no localStorage
  const saveCurrentAccount = useCallback((account: StoredAccount | null) => {
    try {
      if (account) {
        localStorage.setItem(CURRENT_ACCOUNT_KEY, JSON.stringify(account));
      } else {
        localStorage.removeItem(CURRENT_ACCOUNT_KEY);
      }
    } catch (error) {
      console.error('Error saving current account to localStorage:', error);
    }
  }, []);

  // Adicionar nova conta
  const addAccount = useCallback((userProfile: UserProfile, token: string) => {
    const newAccount: StoredAccount = {
      id: userProfile.id,
      email: userProfile.email,
      username: userProfile.username,
      display_name: userProfile.display_name,
      profile_image_url: userProfile.profile_image_url,
      background_image_url: userProfile.background_image_url,
      token,
      lastLoginAt: userProfile.last_login_at,
      createdAt: userProfile.created_at,
    };

    setAccounts(prevAccounts => {
      // Verificar se a conta já existe
      const existingIndex = prevAccounts.findIndex(acc => acc.id === newAccount.id);
      let updatedAccounts;
      
      if (existingIndex >= 0) {
        // Atualizar conta existente
        updatedAccounts = [...prevAccounts];
        updatedAccounts[existingIndex] = { ...newAccount, lastLoginAt: new Date().toISOString() };
      } else {
        // Adicionar nova conta
        updatedAccounts = [...prevAccounts, { ...newAccount, lastLoginAt: new Date().toISOString() }];
      }
      
      saveAccounts(updatedAccounts);
      return updatedAccounts;
    });

    // Definir como conta atual
    setCurrentAccount(newAccount);
    saveCurrentAccount(newAccount);
  }, [saveAccounts, saveCurrentAccount]);

  // Remover conta
  const removeAccount = useCallback((accountId: string) => {
    setAccounts(prevAccounts => {
      const updatedAccounts = prevAccounts.filter(acc => acc.id !== accountId);
      saveAccounts(updatedAccounts);
      return updatedAccounts;
    });

    // Se a conta removida era a atual, definir a primeira como atual
    setCurrentAccount(prevCurrent => {
      if (prevCurrent?.id === accountId) {
        const remainingAccounts = accounts.filter(acc => acc.id !== accountId);
        const newCurrent = remainingAccounts.length > 0 ? remainingAccounts[0] : null;
        saveCurrentAccount(newCurrent);
        return newCurrent;
      }
      return prevCurrent;
    });
  }, [accounts, saveAccounts, saveCurrentAccount]);

  // Trocar conta
  const switchAccount = useCallback((accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    if (account) {
      setCurrentAccount(account);
      saveCurrentAccount(account);
      
      // Atualizar token no localStorage e cookies
      localStorage.setItem('token', account.token);
      document.cookie = `token=${account.token}; path=/; max-age=86400; SameSite=Lax`;
      
      // Disparar evento de mudança de autenticação
      window.dispatchEvent(new Event('auth-state-changed'));
    }
  }, [accounts, saveCurrentAccount]);

  // Obter conta atual
  const getCurrentAccount = useCallback(() => {
    return currentAccount;
  }, [currentAccount]);

  // Limpar todas as contas
  const clearAllAccounts = useCallback(() => {
    setAccounts([]);
    setCurrentAccount(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CURRENT_ACCOUNT_KEY);
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }, []);

  // Logout da conta atual (mantém outras contas)
  const logoutCurrentAccount = useCallback(() => {
    setCurrentAccount(null);
    localStorage.removeItem(CURRENT_ACCOUNT_KEY);
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    sessionStorage.clear();
    window.dispatchEvent(new Event('auth-state-changed'));
  }, []);

  // Atualizar conta
  const updateAccount = useCallback((accountId: string, updates: Partial<StoredAccount>) => {
    setAccounts(prevAccounts => {
      const updatedAccounts = prevAccounts.map(acc => 
        acc.id === accountId ? { ...acc, ...updates } : acc
      );
      saveAccounts(updatedAccounts);
      return updatedAccounts;
    });

    // Se a conta atual foi atualizada, atualizar também
    setCurrentAccount(prevCurrent => {
      if (prevCurrent?.id === accountId) {
        const updated = { ...prevCurrent, ...updates };
        saveCurrentAccount(updated);
        return updated;
      }
      return prevCurrent;
    });
  }, [saveAccounts, saveCurrentAccount]);

  // Carregar contas na inicialização
  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  return {
    accounts,
    currentAccount,
    isLoading,
    addAccount,
    removeAccount,
    switchAccount,
    getCurrentAccount,
    clearAllAccounts,
    logoutCurrentAccount,
    updateAccount,
  };
}; 