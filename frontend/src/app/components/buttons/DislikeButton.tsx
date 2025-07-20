import React, { useRef, useState } from 'react';
import TooltipPortal from '../utils/TooltipPortal';

interface DislikeButtonProps {
  selected: boolean;
  count: number;
  disabled?: boolean;
  onClick: () => void;
}

const DislikeButton: React.FC<DislikeButtonProps> = ({ selected, count, disabled, onClick }) => {
  // SVG preenchido (filled)
  const filledThumbsDown = (
    <svg
      className="w-6 h-6 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-t="thumbs-down-filled-svg"
      aria-hidden="true"
      role="img"
    >
      <path d="M5 2h13a1 1 0 0 1 1 1v10a1 1 0 0 1-.314.728l-2.109 1.989A1.987 1.987 0 0 0 16 17.121V23a1 1 0 0 1-1 1h-2c-2.206 0-4-1.794-4-4v-3H4.618a1.987 1.987 0 0 1-1.789-1.106l-1.053-2.105a4.02 4.02 0 0 1 0-3.578L3 7.764V4c0-1.103.897-2 2-2zm17 .063a1 1 0 0 1 1 1V13a1 1 0 1 1-2 0V3.063a1 1 0 0 1 1-1z"></path>
    </svg>
  );

  // SVG outline
  const outlineThumbsDown = (
    <svg
      className="w-6 h-6 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-t="thumbs-down-svg"
      aria-hidden="true"
      role="img"
    >
      <path d="M17 4H5v4c0 .155-.036.309-.105.447l-1.33 2.658a2.012 2.012 0 0 0 0 1.79L4.618 15H10a1 1 0 0 1 1 1v4c0 1.103.897 2 2 2h1v-4.879c0-1.068.416-2.072 1.172-2.828l.021-.021L17 12.568V4zM5 2h13a1 1 0 0 1 1 1v10a1 1 0 0 1-.314.728l-2.109 1.989A1.987 1.987 0 0 0 16 17.121V23a1 1 0 0 1-1 1h-2c-2.206 0-4-1.794-4-4v-3H4.618a1.987 1.987 0 0 1-1.789-1.106l-1.053-2.105a4.02 4.02 0 0 1 0-3.578L3 7.764V4c0-1.103.897-2 2-2zm17 .063a1 1 0 0 1 1 1V13a1 1 0 1 1-2 0V3.063a1 1 0 0 1 1-1z"></path>
    </svg>
  );

  // Classes de cor para o ícone e o count
  // Vermelho se selecionado, branco no hover, neutro normalmente
  const colorClasses = selected
    ? 'text-[#2ABDBB] group-hover:text-white'
    : 'text-neutral-400 group-hover:text-white';

  // Tooltip
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
        className="inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          className={`group p-1 rounded-full border-none bg-transparent cursor-pointer transition-colors ${selected ? 'bg-red-600/30' : ''} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
          onClick={onClick}
          aria-label="Não curtir episódio"
          disabled={disabled}
        >
          <span className="flex justify-center items-center">
            <span className={colorClasses}>
              {selected ? filledThumbsDown : outlineThumbsDown}
            </span>
            <span 
              className={`ml-1 font-medium transition-colors ${colorClasses}`}
            >{count}</span>
          </span>
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
              Eu não curti isso
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

export default DislikeButton; 