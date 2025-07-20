import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import TooltipPortal from '../utils/TooltipPortal';

interface PlayButtonProps {
  firstEpisode?: {
    id: string;
    publicCode: string;
    slug: string;
  } | null;
}

const PlayButton: React.FC<PlayButtonProps> = ({ firstEpisode }) => {
  const t = useTranslations('Play');
  const params = useParams();
  const locale = params.locale as string;
  const btnRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // Calcula a posição do tooltip
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number } | null>(null);

  const handleMouseEnter = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setTooltipPos({
        left: rect.left + rect.width / 2,
        top: rect.top - 8, // 8px acima do botão, ajuste se necessário
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {firstEpisode ? (
          <Link href={`/${locale}/watch/${firstEpisode.publicCode}/${firstEpisode.slug}`}>
            <svg 
              className="w-6 h-6 fill-[#FF640A] transition-colors duration-300 ease-in-out group-hover:fill-[#FF8533]" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
            >
              <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
            </svg>
          </Link>
        ) : (
          <span>
            <svg 
              className="w-6 h-6 fill-[#FF640A] opacity-50 cursor-not-allowed" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
            >
              <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
            </svg>
          </span>
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
            {t('play')}
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

export default PlayButton;