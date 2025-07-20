import React, { useRef, useState } from 'react';
import TooltipPortal from '../utils/TooltipPortal';

interface LikeButtonProps {
  selected: boolean;
  count: number;
  disabled?: boolean;
  onClick: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ selected, count, disabled, onClick }) => {
  // SVG preenchido (filled)
  const filledThumbsUp = (
    <svg
      className="w-6 h-6 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-t="thumbs-up-filled-svg"
      aria-hidden="true"
      role="img"
    >
      <path d="M19 22H6a1 1 0 0 1-1-1V11a1 1 0 0 1 .314-.728l2.109-1.989C7.795 7.906 8 7.408 8 6.879V1a1 1 0 0 1 1-1h2c2.206 0 4 1.794 4 4v3h4.382c.764 0 1.449.424 1.789 1.106l1.053 2.105a4.02 4.02 0 0 1 0 3.578L21 16.236V20c0 1.103-.897 2-2 2zm-17-.063a1 1 0 0 1-1-1V11a1 1 0 0 1 2 0v9.938a1 1 0 0 1-1 1z"></path>
    </svg>
  );

  // SVG outline
  const outlineThumbsUp = (
    <svg
      className="w-6 h-6 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-t="thumbs-up-svg"
      aria-hidden="true"
      role="img"
    >
      <path d="M7 20h12v-4c0-.155.036-.309.105-.447l1.33-2.658c.28-.561.28-1.229 0-1.79L19.382 9H14a1 1 0 0 1-1-1V4c0-1.103-.897-2-2-2h-1v4.879a3.973 3.973 0 0 1-1.172 2.828l-.021.021L7 11.432V20zm12 2H6a1 1 0 0 1-1-1V11a1 1 0 0 1 .314-.728l2.109-1.989C7.795 7.906 8 7.408 8 6.879V1a1 1 0 0 1 1-1h2c2.206 0 4 1.794 4 4v3h4.382c.764 0 1.449.424 1.789 1.106l1.053 2.105a4.02 4.02 0 0 1 0 3.578L21 16.236V20c0 1.103-.897 2-2 2zm-17-.063a1 1 0 0 1-1-1V11a1 1 0 0 1 2 0v9.938a1 1 0 0 1-1 1z"></path>
    </svg>
  );

  // Classes de cor para o ícone e o count
  // Verde se selecionado, branco no hover, neutro normalmente
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
          className={`group p-1 rounded-full border-none bg-transparent cursor-pointer transition-colors ${selected ? 'bg-green-600/30' : ''} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
          onClick={onClick}
          aria-label="Curtir episódio"
          disabled={disabled}
        >
          <span className="flex justify-center items-center">
            <span className={colorClasses}>
              {selected ? filledThumbsUp : outlineThumbsUp}
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
              Eu curti isso
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

export default LikeButton; 