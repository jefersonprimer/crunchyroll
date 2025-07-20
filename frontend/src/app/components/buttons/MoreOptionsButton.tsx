import React, { useRef, useState } from 'react';
import TooltipPortal from '../utils/TooltipPortal';

const MoreOptionsButton: React.FC = () => {
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
        className="relative inline-block text-[#ff640a]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          tabIndex={0}
          className="bg-none border-none p-2 cursor-pointer flex items-center justify-center"
          data-t="more-btn"
        >
          <div className="relative inline-flex items-center group">
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 24"
            >
              <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-2 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm2 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
        </button>
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
              Mais opções
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
      </div>
    </>
  );
};

export default MoreOptionsButton;