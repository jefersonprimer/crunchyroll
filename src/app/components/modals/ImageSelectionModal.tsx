import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface ImageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
  type: 'profile' | 'background';
  currentImage: string;
}

interface Image {
  id: string;
  anime_name: string;
  image_url: string;
}

const ImageSelectionModal: React.FC<ImageSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  type,
  currentImage
}) => {
  const t = useTranslations('imageSelectionModal');
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>(currentImage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const endpoint = type === 'profile' 
        ? 'http://localhost:3000/api/profile-images'
        : 'http://localhost:3000/api/background-images';
      
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#141519] p-6 rounded-lg w-[800px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {type === 'profile' ? t('profileTitle') : t('backgroundTitle')}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-6 mb-6">
          <div className="w-1/2">
            <h3 className="text-white mb-2">{t('selectedImage')}</h3>
            <div className={`${type === 'profile' ? 'w-48 h-48 rounded-full' : 'w-full h-48'} overflow-hidden`}>
              <img 
                src={selectedImage || (type === 'profile' ? '/default-avatar.jpg' : '/default-background.jpg')} 
                alt="Selected" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center">
            <div className="flex gap-4">
              <button 
                onClick={() => onSelect(selectedImage)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {t('save')}
              </button>
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-4 text-center text-white">{t('loading')}</div>
          ) : (
            images.map((image) => (
              <div 
                key={image.id}
                className={`cursor-pointer ${type === 'profile' ? 'rounded-full' : ''} overflow-hidden border-2 ${
                  selectedImage === image.image_url ? 'border-blue-500' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(image.image_url)}
              >
                <img 
                  src={image.image_url} 
                  alt={image.anime_name} 
                  className="w-full h-32 object-cover"
                />
                <p className="text-white text-sm mt-1 truncate">{image.anime_name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSelectionModal; 

