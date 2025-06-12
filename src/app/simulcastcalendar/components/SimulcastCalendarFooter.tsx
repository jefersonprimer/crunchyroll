import React from 'react';

interface SimulcastCalendarFooterProps {
  premiumLink?: string;
}

export const SimulcastCalendarFooter: React.FC<SimulcastCalendarFooterProps> = ({
  premiumLink = "/pt-br/premium?return_url=https://www.crunchyroll.com/simulcastcalendar?date%3D2025-06-02%26filter%3Dpremium#plans"
}) => {
  return (
    <footer className="w-full text-white py-6 mt-[180px]">
      <div className="container mx-auto px-4 flex items-center justify-center bg-[#F78C25] relative h-20 rounded">
        <p className="flex items-center gap-2 text-sm mt-4">
         
          <svg 
            className="w-6 h-6" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            data-t="premium-filled-svg" 
            aria-hidden="true" 
            role="img"
            fill='currentColor'
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M2 8L8 9L12 3L16 9L22 8L18 19H6L2 8Z">
              </path>
          </svg>
          Vá em <a href={premiumLink} className="text-white underline">Premium</a> para assistir aos mais novos simulcasts.
        </p>

        <img 
          className="w-[150px] h-[183px] absolute -top-[120px] right-80"
          src="https://www.crunchyroll.com/i/simulcastcalendar/chibi_happy_140px@1x.png"
          srcSet="/i/simulcastcalendar/chibi_happy_140px@2x.png 2x"
          alt="Happy Hime character"
        />
      </div>
    </footer>
  );
};

export default SimulcastCalendarFooter;