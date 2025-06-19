import React from 'react';
import { useTranslations } from 'next-intl';

interface BookmarkButtonProps {
  isFavorited: boolean;
  onToggle: () => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isFavorited, onToggle }) => {
  const t = useTranslations('BookmarkButton');

  return (
    <div 
      className="relative inline-block cursor-pointer group" 
      onClick={onToggle}
    >
      <span className="
        absolute bottom-full left-1/2 -translate-x-1/2
        px-3 py-2 bg-[#23252B] text-white text-xs
        whitespace-nowrap mb-2 pointer-events-none
        opacity-0 group-hover:opacity-100 transition-opacity duration-200
        after:content-[''] after:absolute after:top-full after:left-1/2
        after:-ml-1 after:border-4 after:border-t-[#23252B]
        after:border-transparent after:border-x-transparent
      ">
        {isFavorited ? t('removeFromQueue') : t('addToQueue')}
      </span>
      
      {isFavorited ? (
        <svg 
          className="w-6 h-6 fill-[#FF640A] transition-all duration-300 ease-in-out transform group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          data-t="watchlist-filled-svg" 
          aria-hidden="false" 
          role="img" 
          aria-labelledby="watchlist-filled-svg"
        >
          <title id="watchlist-filled-svg">Remover da Lista</title>
          <path d="M18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z"></path>
        </svg>
      ) : (
        <svg 
          className="w-6 h-6 fill-[#FF640A] transition-all duration-300 ease-in-out transform group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          data-t="watchlist-svg" 
          aria-hidden="false" 
          role="img" 
          aria-labelledby="watchlist-svg"
        >
          <title id="watchlist-svg">Lista</title>
          <path d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z"></path>
        </svg>
      )}
    </div>
  );
};

export default BookmarkButton;