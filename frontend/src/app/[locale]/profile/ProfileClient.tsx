'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ImageSelectionModal from '@/app/components/modals/ImageSelectionModal';
import { useAuth } from '@/app/[locale]/hooks/useAuth';
import { useUpdateProfile } from '@/app/[locale]/hooks/useUpdateProfile';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('profile');
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
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000]">
      <span className="text-[#FFFFFF] text-4xl mb-6">{t('title')}</span>
      <div className="flex items-center justify-center bg-[#141519] w-[510px] shadow-xl pb-4">
        <div className="w-full relative">
          <div className="w-full h-[140px] relative overflow-hidden group cursor-pointer" onClick={() => setShowBackgroundModal(true)}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${formData.background_image_url || '/default-background.jpg'})` }}
            />

            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
              <div className="text-white text-center py-2 px-4 rounded-2xl bg-[#202127] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium">{t('updateBackgroundImage')}</p>
              </div>
            </div>
            <div
              className="absolute bottom-2 right-2 bg-[#DADADA] bg-opacity-50 p-1 rounded-full cursor-pointer transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                setShowBackgroundModal(true);
              }}
            >
              <svg className="w-5 h-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                data-t="edit-svg" 
                aria-hidden="true" 
                role="img"
              >
                <path d="M18.566 6.368l-1.339 1.657-2.833-2.37 1.308-1.57a.994.994 0 0 1 .612-.317.716.716 0 0 1 .568.16l1.532 1.255c.17.148.288.377.317.612a.726.726 0 0 1-.165.573zM5.852 19.087l1.412-4.8.224-.272 2.82 2.338-.215.259-4.24 2.475zm10.26-9.696l-4.674 5.607-2.828-2.343 4.657-5.645 2.845 2.38zm4.368-3.81a2.775 2.775 0 0 0-.927-1.743L18.02 2.583c-1.027-.899-2.697-.743-3.658.357L5.789 13.304a.895.895 0 0 0-.166.312l-2.087 7.101a.881.881 0 0 0 1.29 1.01l6.29-3.67a.894.894 0 0 0 .232-.198l6.489-7.785 2.078-2.572c.452-.517.652-1.2.565-1.92z">
                </path>
              </svg>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[120px] h-[120px] rounded-full overflow-hidden z-50 group cursor-pointer" onClick={() => setShowProfileModal(true)}>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[96px] h-[96px] rounded-full overflow-hidden shadow-lg z-50">
              <img
                src={formData.profile_image_url || '/default-avatar.jpg'}
                alt="Profile"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center rounded-full">
                <div className="text-white py-2 px-4 rounded-2xl bg-[#202127] text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">{t('change')}</p>
                </div>
              </div>
            </div>
              <div
                className="absolute bottom-6 right-3 bg-[#DADADA] bg-opacity-50 p-0.5 rounded-full cursor-pointer transition-opacity z-50 border-2 border-black"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileModal(true);
                }}
              >
                <svg className="w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="edit-svg"
                  aria-hidden="true"
                  role="img"
                >
                  <path d="M18.566 6.368l-1.339 1.657-2.833-2.37 1.308-1.57a.994.994 0 0 1 .612-.317.716.716 0 0 1 .568.16l1.532 1.255c.17.148.288.377.317.612a.726.726 0 0 1-.165.573zM5.852 19.087l1.412-4.8.224-.272 2.82 2.338-.215.259-4.24 2.475zm10.26-9.696l-4.674 5.607-2.828-2.343 4.657-5.645 2.845 2.38zm4.368-3.81a2.775 2.775 0 0 0-.927-1.743L18.02 2.583c-1.027-.899-2.697-.743-3.658.357L5.789 13.304a.895.895 0 0 0-.166.312l-2.087 7.101a.881.881 0 0 0 1.29 1.01l6.29-3.67a.894.894 0 0 0 .232-.198l6.489-7.785 2.078-2.572c.452-.517.652-1.2.565-1.92z">
                  </path>
                </svg>
              </div>
          </div>
          <div className="flex flex-col items-center mt-20 px-6">
            <div className="w-full space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#A0A0A0]">{t('profileName')}</label>
                <input
                  type="text"
                  name="display_name"
                  value={formData.display_name}
                  onChange={handleInputChange}
                  className="w-full py-1  text-[#A0A0A0] border-b-2 border-[#59595B] focus:outline-none focus:border-[#FF640A]"
                />
                <p className="text-gray-400 text-sm mt-1">{t('profileNameDescription')}</p>
              </div>
      
              <div>
                <label className="block text-sm font-medium mb-1 text-[#A0A0A0]">{t('username')}</label>
                <input
                  type="text"
                  value={userProfile.username}
                  disabled
                    className="w-full py-1  text-[#A0A0A0] border-b-2 border-[#59595B] focus:outline-none focus:border-[#FF640A]"
                />
                <p className="text-gray-400 text-sm mt-1">{t('usernameDescription')}</p>
              </div>
              <div className="flex gap-4 justify-center mt-6">
                <button
                  onClick={handleSave}
                  disabled={!hasChanges || isSaving}
                  className={`cursor-pointer px-6 py-2 ${hasChanges ? 'bg-[#FF640A] text-black' : 'border-2 border-[#59595B] cursor-not-allowed'} text-[#59595B] flex items-center gap-2`}
                  >
                  {isSaving ? (
                      <>
                      <svg className="ah-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm font-bold uppercase">{t('saving')}</span>
                      </>
                  ) : (
                      <span className="text-sm font-bold uppercase">{t('save')}</span>
                  )}
                </button>
                
                <button 
                  className="px-6 py-2 text-[#FF640A] border-2 border-[#FF640A] cursor-pointer"
                  onClick={() => router.back()} 
                >
                  <span className="text-sm font-bold uppercase">{t('cancel')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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