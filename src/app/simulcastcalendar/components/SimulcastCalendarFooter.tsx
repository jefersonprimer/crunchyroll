import React from 'react';

interface SimulcastCalendarFooterProps {
  premiumLink?: string;
}

export const SimulcastCalendarFooter: React.FC<SimulcastCalendarFooterProps> = ({
  premiumLink = "/pt-br/premium?return_url=https://www.crunchyroll.com/simulcastcalendar?date%3D2025-06-02%26filter%3Dpremium#plans"
}) => {
  return (
    <footer className="w-full text-white py-6 ">
      <div className="container mx-auto px-4 flex items-center justify-center bg-[#F78C25]">
        <p className="flex items-center  gap-2 text-sm">
          <svg viewBox="0 0 48 48" className="w-6 h-6">
            <use xlinkHref="/i/svg/simulcastcalendar/calendar_icons.svg#cr_crown" />
          </svg>
          Vá em <a href={premiumLink} className="text-blue-400 hover:text-blue-300 underline">Premium</a> para assistir aos mais novos simulcasts.
        </p>

        <img 
          className="w-[140px] h-auto"
          src="https://www.crunchyroll.com/i/simulcastcalendar/chibi_happy_140px@1x.png"
          srcSet="/i/simulcastcalendar/chibi_happy_140px@2x.png 2x"
          alt="Happy Hime character"
        />
      </div>
    </footer>
  );
};

export default SimulcastCalendarFooter;