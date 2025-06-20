import React, { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import TooltipPortal from '../TooltipPortal';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  const t = useTranslations('AddButton');
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
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg
          className="w-6 h-6 fill-[#FF640A] transition-all duration-300 ease-in-out group-hover:fill-[#FF8533]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-labelledby="add-svg"
          role="img"
        >
          <path d="M13 3v8h8v2h-8v8h-2v-8H3v-2h8V3z" />
        </svg>
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
            {t('tooltiptext')}
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

export default AddButton;