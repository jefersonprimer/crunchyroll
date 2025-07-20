import React, { useRef, useState } from 'react';
import TooltipPortal from '../utils/TooltipPortal';

interface RemoveButtonProps {
  onClick: () => void;
  className?: string;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick, className }) => {
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
        aria-label="Remove from watchlist"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg
          className="w-6 h-6 text-[#A0A0A0] hover:text-[#FFFFFF]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          data-t="trash-svg"
          aria-labelledby="trash-svg"
          aria-hidden="true"
          role="img"
          fill='currentColor'
        >
          <path d="M13 2h-2a1 1 0 0 0-1 1v1H4a1 1 0 0 0 0 2h1v15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6h1a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1m-1 2v2h5v14H7V6h5V4zm-2 5a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1z"></path>
        </svg>
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
            Remover
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

export default RemoveButton; 