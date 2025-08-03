"use client"

import React, { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import TooltipPortal from '../utils/TooltipPortal';

interface BookmarkButtonProps {
  isFavorited: boolean;
  onToggle: () => void;
  color?: string;
  outline?: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isFavorited, onToggle, color, outline }) => {
  const t = useTranslations('BookmarkButton');
  const iconColor = color || '#FF640A';
  const btnRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number } | null>(null);

  const handleMouseEnter = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setTooltipPos({
        left: rect.left + rect.width / 2,
        top: rect.top - 8,
      });
      setShowTooltip(true);
    }
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <div
        ref={btnRef}
        className="relative inline-block cursor-pointer group"
        onClick={onToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={outline ? { border: `2px solid ${iconColor}`, padding: '6px' } : undefined}
      >
        {isFavorited ? (
          <svg 
            className="w-6 h-6 fill-[#FF640A] transition-all duration-300 ease-in-out transform "
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            data-t="watchlist-filled-svg" 
            aria-hidden="false" 
            role="img" 
            aria-labelledby="watchlist-filled-svg"
          >
            <path d="M18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z"></path>
          </svg>
        ) : (
          <svg 
            className="w-6 h-6 transition-all duration-300 ease-in-out transform "
            style={{ fill: iconColor }}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            data-t="watchlist-svg" 
            aria-hidden="false" 
            role="img" 
            aria-labelledby="watchlist-svg"
          >
            <path d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z"></path>
          </svg>
        )}
      </div>
      {showTooltip && tooltipPos && (
        <TooltipPortal>
          <span
            style={{
              position: 'fixed',
              left: tooltipPos.left,
              top: tooltipPos.top - 50, // 32px acima do topo do botão, ajuste se necessário
              transform: 'translateX(-50%)',
              zIndex: 9999,
              background: '#4A4E58',
              color: '#fff',
              padding: '12px 12px',
              fontSize: '12px',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            {isFavorited ? t('removeFromQueue') : t('addToQueue')}
          </span>
          <span
            style={{
              position: 'fixed',
              left: tooltipPos.left,
              top: tooltipPos.top - 12, // logo abaixo do tooltip
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '12px solid #4A4E58',
              zIndex: 9999,
              pointerEvents: 'none',
            }}
          />
        </TooltipPortal>
      )}
    </>
  );
};

export default BookmarkButton;