import React, { useRef, useState } from 'react';
import TooltipPortal from '../utils/TooltipPortal';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onClick, className }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
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
      <button
        ref={btnRef}
        onClick={onClick}
        className={`bg-none border-none cursor-pointer flex items-center justify-center ${className || ''}`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isFavorite ? (
          <svg
            className="w-6 h-6 text-[#A0A0A0] hover:text-[#FFFFFF]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-t="favorite-filled-svg"
            aria-labelledby="favorite-filled-svg"
            aria-hidden="true"
            role="img"
            fill='currentColor'
          >
            <path d="M12.078 5.446C10.801 3.816 9.156 3 7.144 3 3.818 3 1.426 6.285 2.26 9.924c.785 3.422 4.058 7.114 9.818 11.076 5.608-3.613 8.845-7.305 9.711-11.076C22.706 5.935 20.244 3 16.965 3c-1.927 0-3.556.815-4.887 2.446z"></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-[#A0A0A0] hover:text-[#FFFFFF]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-t="favorite-svg"
            aria-labelledby="favorite-svg"
            aria-hidden="true"
            role="img"
            fill='currentColor'
          >
            <path d="M19.84 9.476C20.442 6.858 19.07 5 16.965 5c-1.31 0-2.377.534-3.337 1.71L12.046 8.65l-1.542-1.97C9.602 5.53 8.536 5 7.144 5 5.132 5 3.658 7.07 4.21 9.477c.601 2.623 3.21 5.702 7.901 9.099 4.512-3.103 7.054-6.163 7.73-9.1zM16.965 3c3.279 0 5.741 2.935 4.824 6.924-.866 3.77-4.103 7.463-9.71 11.076-5.761-3.962-9.034-7.654-9.819-11.076C1.426 6.285 3.818 3 7.144 3c1.322 0 2.485.352 3.49 1.055l-.105.127.282.002c.456.346.879.766 1.267 1.262a7.499 7.499 0 0 1 1.264-1.236l.31.003a9.964 9.964 0 0 0-.115-.146C14.549 3.356 15.692 3 16.965 3z"></path>
          </svg>
        )}
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
            {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
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
    </>
  );
};

export default FavoriteButton; 