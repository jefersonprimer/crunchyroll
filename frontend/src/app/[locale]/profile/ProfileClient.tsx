'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ConfirmationModal from '@/app/components/modals/ConfirmationModal';
import ImageSelectionModal from '@/app/components/modals/ImageSelectionModal';
import { useAuth } from '@/app/[locale]/hooks/useAuth';
import { useUpdateProfile } from '@/app/[locale]/hooks/useUpdateProfile';
import Loading from '../loading';

interface UserProfile {
  id: string;
  email: string;
  username: string;
  display_name: string;
  profile_image_url: string | null;
  background_image_url: string | null;
  created_at: string;
  last_login_at: string;
}

const ProfileClient = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    display_name: '',
    profile_image_url: '',
    background_image_url: ''
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { userProfile, isLoading, checkAuthState } = useAuth();
  const { updateProfile, isSaving, error } = useUpdateProfile();

  useEffect(() => {
    if (userProfile) {
      setFormData({
        display_name: userProfile.display_name,
        profile_image_url: userProfile.profile_image_url || '',
        background_image_url: userProfile.background_image_url || ''
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (userProfile) {
      const hasProfileChanges = 
        formData.display_name !== userProfile.display_name ||
        formData.profile_image_url !== (userProfile.profile_image_url || '') ||
        formData.background_image_url !== (userProfile.background_image_url || '');
      setHasChanges(hasProfileChanges);
    }
  }, [formData, userProfile]);

  useEffect(() => {
    if (!isLoading && !userProfile) {
      router.push(`/${locale}/login`);
    }
  }, [isLoading, userProfile, locale, router]);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleConfirmEdit = () => {
    setShowModal(false);
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!hasChanges) return;
    try {
      const updatedProfile = await updateProfile(formData);
      setFormData({
        display_name: updatedProfile.display_name,
        profile_image_url: updatedProfile.profile_image_url || '',
        background_image_url: updatedProfile.background_image_url || ''
      });
      setIsEditing(false);
      setHasChanges(false);
    } catch (error) {
      // erro já tratado no hook
    }
  };

  const handleProfileImageSelect = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, profile_image_url: imageUrl }));
    setShowProfileModal(false);
  };

  const handleBackgroundImageSelect = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, background_image_url: imageUrl }));
    setShowBackgroundModal(false);
  };

  if (isLoading) {
    return <Loading/>;
  }

  if (!userProfile) {
    return null; // Redirecionamento já será feito pelo useEffect
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000]">
        <span className="text-[#FFFFFF] text-4xl mb-6">Editar Perfil</span>
        <div className="flex items-center justify-center bg-[#141519] w-[510px] shadow-xl pb-4">
            <div className="w-full relative">
            <div className="w-full h-[140px] relative overflow-hidden group">
                <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${formData.background_image_url || '/default-background.jpg'})` }}
                />
                <div
                className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setShowBackgroundModal(true)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                </div>
            </div>
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[96px] h-[96px] rounded-full overflow-hidden shadow-lg z-50 group">
                <img
                src={formData.profile_image_url || '/default-avatar.jpg'}
                alt="Profile"
                className="w-full h-full object-cover"
                />
                <div
                className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setShowProfileModal(true)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                </div>
            </div>
            <div className="flex flex-col items-center mt-20 px-6">
                <div className="w-full space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1 text-white">Nome do Perfil</label>
                    <input
                    type="text"
                    name="display_name"
                    value={formData.display_name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700"
                    />
                    <p className="text-gray-400 text-sm mt-1">Este é visualizado dentro da sua casa e pode ser alterado a qualquer tempo.</p>
                </div>
        
                <div>
                    <label className="block text-sm font-medium mb-1 text-white">Nome de usuário (Opcional)</label>
                    <input
                    type="text"
                    value={userProfile.username}
                    disabled
                    className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 opacity-50"
                    />
                    <p className="text-gray-400 text-sm mt-1">Crie um nome de usuário para estar pronto para experiências futuras que vão compartilhar o seu amor por anime! Escolha um que ama, você não pode mudar depois!</p>
                </div>
                <div className="flex gap-4 justify-center mt-6">
                    <button
                    onClick={handleSave}
                    disabled={!hasChanges || isSaving}
                    className={`px-6 py-2 ${hasChanges ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'} text-white rounded flex items-center gap-2`}
                    >
                    {isSaving ? (
                        <>
                        <svg className="ah-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Salvando...</span>
                        </>
                    ) : (
                        <span>Salvar</span>
                    )}
                    </button>
                    <button onClick={() => router.back()} className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">Cancelar</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        <ConfirmationModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirmEdit}
            title="Edit Profile"
            message="Are you sure you want to edit your profile?"
        />
        <ImageSelectionModal
            isOpen={showProfileModal}
            onClose={() => setShowProfileModal(false)}
            onSelect={handleProfileImageSelect}
            type="profile"
            currentImage={formData.profile_image_url}
        />
        <ImageSelectionModal
            isOpen={showBackgroundModal}
            onClose={() => setShowBackgroundModal(false)}
            onSelect={handleBackgroundImageSelect}
            type="background"
            currentImage={formData.background_image_url}
        />
    </div>
  );
};

export default ProfileClient; 