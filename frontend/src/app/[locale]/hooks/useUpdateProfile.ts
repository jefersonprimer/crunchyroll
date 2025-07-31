import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function useUpdateProfile() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('profile.errors');

  const getToken = () => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };

  const updateProfile = async (formData: {
    display_name: string;
    profile_image_url: string;
    background_image_url: string;
  }) => {
    setIsSaving(true);
    setError(null);
    try {
      const token = getToken();
      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error(t('updateProfile'));
      }
      const updatedProfile = await response.json();
      
      // Dispatch event to update global auth state with a small delay
      setTimeout(() => {
        window.dispatchEvent(new Event('auth-state-changed'));
      }, 100);
      
      return updatedProfile;
    } catch (err: any) {
      setError(err.message || t('unknownError'));
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return { updateProfile, isSaving, error };
} 