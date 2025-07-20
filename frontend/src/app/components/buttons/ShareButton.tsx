import React, { useState } from 'react';
import { useTranslations } from 'next-intl'; 
import TooltipPortal from '../utils/TooltipPortal';

interface ShareButtonProps {
  url: string;
  title: string;
  onOpen?: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title, onOpen }) => {
  const t = useTranslations('ShareButton')
  const [showTooltip, setShowTooltip] = useState(false);
  const btnRef = React.useRef<HTMLDivElement>(null);
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
        setTimeout(() => setShowTooltip(false), 1000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleClick = async () => {
    if (onOpen) {
      onOpen();
    } else {
      await handleShare();
    }
  };

  return (
    <>
      <div
        ref={btnRef}
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          tabIndex={0}
          className="bg-transparent border-none p-2 cursor-pointer flex items-center justify-center"
          onClick={handleClick}
          data-t="share-btn"
        >
          <div className="relative inline-flex items-center group">
            <svg
              className="w-6 h-6 fill-current text-[#ff640a] transition-all duration-300 ease-in-out hover:text-[#FF640A]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M18 2c2.21 0 4 1.79 4 4s-1.79 4-4 4c-1.385 0-2.606-.704-3.323-1.773l-5.02 2.151c.22.496.343 1.045.343 1.622 0 .577-.122 1.126-.342 1.622l5.019 2.151C15.394 14.703 16.615 14 18 14c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4c0-.113.005-.225.014-.335L8.35 15.238C7.69 15.718 6.878 16 6 16c-2.21 0-4-1.79-4-4s1.79-4 4-4c.878 0 1.69.283 2.35.762l5.664-2.427C14.004 6.225 14 6.113 14 6c0-2.21 1.79-4 4-4zm0 14c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zM6 10c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm12-6c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z" />
            </svg>
          </div>
        </button>
        {showTooltip && tooltipPos && (
          <TooltipPortal>
            <span
              style={{
                position: 'fixed',
                left: tooltipPos.left,
                top: tooltipPos.top - 50,
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
              {showTooltip ? t('copy') : t('share')}
            </span>
            <span
              style={{
                position: 'fixed',
                left: tooltipPos.left,
                top: tooltipPos.top - 12,
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
      </div>
    </>
  );
};

export default ShareButton;