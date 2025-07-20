import React from 'react';
import { useTranslations } from 'next-intl';

const SimulcastCalendarHeader = () => {
  const t = useTranslations('simulcastcalendarheader');

  return (
    <header className="w-full bg-[#F2F2F2]">
      <div className="flex flex-col items-center p-4">
        <div className="flex space-x-0.5 mb-6">
          <a 
            className="flex items-center space-x-2 px-4 py-2 bg-[#F78C25] text-white transition-colors rounded-tl-sm rounded-bl-sm"
            href="/simulcastcalendar"
          >
            <div className="flex items-center space-x-2">
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <span className="font-weight-400 text-[0.6875rem]">{t('releaseCalendars')}</span>
            </div>
          </a>

          <a 
            className="flex items-center space-x-2 px-4 py-2 text-[#F78C25] hover:text-[#FFF] bg-[#FFFFFF] hover:bg-[#F78C25] transition-colors rounded-tr-sm rounded-br-sm"
            href="/pt-br/lineup"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 10h16M4 14h16M4 18h16" 
              />
            </svg>
            <div className="font-weight-400 text-[0.6875rem]">
              {t('spring2025Lineup')}
            </div>
          </a>
        </div>

        <form id="filter_toggle_form" className="flex justify-center space-x-8" action="" method="get">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              className="w-4 h-4 text-orange-500"
              name="filter" 
              type="radio" 
              value="premium"
            />
            <span className="font-weight-400 text-[#000] text-[0.6875rem]">
              {t('filters.premiumEpisodes')}
            </span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              className="w-4 h-4 text-orange-500"
              name="filter" 
              type="radio" 
              value="free" 
              defaultChecked
            />
            <span className="font-weight-400 text-[#000] text-[0.6875rem]">
              {t('filters.freeEpisodes')}
            </span>
          </label>
        </form>
      </div>

      <p className="px-4 py-3 bg-[#CECACA] text-sm text-[#FFFFFF] flex items-center justify-center rounded">
        {t('premiumBanner.access')}{' '}
        <strong className="inline-flex items-center space-x-1 text-[#FFFFFF] px-1">
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" 
            />
          </svg>
          <a 
            href="/pt-br/premium?return_url=https://www.crunchyroll.com/simulcastcalendar#plans"
            className="hover:underline"
          >
            {t('premiumBanner.premium')}
          </a>
        </strong>{' '}
        {t('premiumBanner.trial')}
      </p>
    </header>
  );
};

export default SimulcastCalendarHeader;

