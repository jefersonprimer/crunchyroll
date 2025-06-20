import React, { useState } from 'react';
import { useTranslations } from 'next-intl'; 

interface ShareButtonProps {
  url: string;
  title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {
  const t = useTranslations('ShareButton')
  const [showTooltip, setShowTooltip] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          url: url,
        });
      } else {
        // Fallback para copiar o link
        await navigator.clipboard.writeText(url);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        tabIndex={0}
        className="bg-transparent border-none p-2 cursor-pointer flex items-center justify-center"
        onClick={handleShare}
        data-t="share-btn"
      >
        <div className="relative inline-flex items-center group">
          <span className={`
            absolute bottom-full left-1/2 -translate-x-1/2
            px-3 py-2 bg-[#23252B] text-white text-xs
            whitespace-nowrap mb-2 pointer-events-none
            transition-opacity duration-200
            after:content-[''] after:absolute after:top-full after:left-1/2
            after:-ml-1 after:border-4 after:border-t-[#23252B]
            after:border-transparent after:border-x-transparent
            ${showTooltip ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          `}>
            {showTooltip ? t('copy') : t('share')}
          </span>
          <svg
            className="w-6 h-6 fill-current text-[#ff640a] transition-all duration-300 ease-in-out hover:text-[#FF640A]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M18 2c2.21 0 4 1.79 4 4s-1.79 4-4 4c-1.385 0-2.606-.704-3.323-1.773l-5.02 2.151c.22.496.343 1.045.343 1.622 0 .577-.122 1.126-.342 1.622l5.019 2.151C15.394 14.703 16.615 14 18 14c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4c0-.113.005-.225.014-.335L8.35 15.238C7.69 15.718 6.878 16 6 16c-2.21 0-4-1.79-4-4s1.79-4 4-4c.878 0 1.69.283 2.35.762l5.664-2.427C14.004 6.225 14 6.113 14 6c0-2.21 1.79-4 4-4zm0 14c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zM6 10c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm12-6c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default ShareButton;