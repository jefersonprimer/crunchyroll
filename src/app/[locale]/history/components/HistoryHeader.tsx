import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface HistoryHeaderProps {
  onClear?: () => void;
  title?: string;
}

const HistoryHeader: React.FC<HistoryHeaderProps> = ({ onClear, title }) => {
  const t = useTranslations('History');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Se estiver carregando, renderiza skeleton
  if (loading) {
    return (
      <div className="flex w-[1050px] justify-between items-center mb-[10px] py-0 px-[5px]">
        <div className="h-8 w-64 bg-[#141519] animate-pulse" />
        <div className="h-8 w-32 bg-[#141519] animate-pulse" />
      </div>
    );
  }

  // Se não houver title ou onClear, não renderiza nada
  if (!title || !onClear) {
    return null;
  }
  return (
    <div className="flex w-[1050px] justify-between items-center mb-[10px] py-0 px-[5px]">
      <h2 className="text-[20px] font-semibold text-white">{title}</h2>
      <button onClick={onClear} className="py-[8px] px-[16px] cursor-pointer">
        <span className="text-[#A0A0A0] hover:text-white font-bold">{t('clearHistory')}</span>
      </button>
    </div>
  );
};

export default HistoryHeader; 