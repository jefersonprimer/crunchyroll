import { useState } from 'react';

export function useUpdateProfile() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (formData: {
    display_name: string;
    profile_image_url: string;
    background_image_url: string;
  }) => {
    setIsSaving(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar perfil');
      }
      const updatedProfile = await response.json();
      return updatedProfile;
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return { updateProfile, isSaving, error };
} 