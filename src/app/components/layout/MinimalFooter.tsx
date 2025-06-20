import React from 'react';
import { useTranslations } from 'next-intl';

const MinimalFooter: React.FC = () => {
  const t = useTranslations('MinimalFooter');

  return (
    <div className="w-full bg-[#000000] text-white py-8">
      <div className="max-w-[1050px] mx-auto px-4">
        {/* Links row - centered */}
        <div className="flex justify-center mb-8 border-b-1 pb-6 border-[#4A4E58]">
          <ul className="flex space-x-4">
            <li>
              <a
                aria-label={`${t('termsOfUse')} - open in a new tab`}
                tabIndex={0}
                href="https://www.crunchyroll.com/pt-br/tos"
                target="_blank"
                data-t="terms-link"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <span>{t('termsOfUse')}</span>
              </a>
            </li>
            <li>
              <a
                aria-label={`${t('privacyPolicy')} - open in a new tab`}
                tabIndex={0}
                href="https://www.crunchyroll.com/privacy/index.html"
                target="_blank"
                data-t="privacy-link"
                className="text-gray-300 hover:text-white transition-colors px-4 border-x-1 border-[#4A4E58]"
              >
                <span>{t('privacyPolicy')}</span>
              </a>
            </li>
            <li>
              <button
                data-t="cookie-consent-tool"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label={`${t('cookieConsentTool')} - open in modal popup`}
              >
                <span>{t('cookieConsentTool')}</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Bottom section - logo left, content right */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              className="w-[158px] h-[12px]"
              src="https://www.crunchyroll.com/build/assets/img/footer/sony_pictures_logo.png"
              alt="Sony Pictures"
            />
            <p className="text-gray-400 text-sm pl-2 border-l-1 border-[#4A4E58]">{t('copyright')}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div
                role="button"
                aria-label="App Language"
                tabIndex={0}
                className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors"
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-controls="fa177e39-897a-44a4-92e6-080ef17f072d"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="dropdown-svg"
                  aria-labelledby="dropdown-svg"
                  aria-hidden="true"
                  role="img"
                >
                   <path d="M7 10h10l-5 5z" fill="#A0A0A0" />
                </svg>
                <span className="text-sm font-medium text-[#A0A0A0]">{t('language')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalFooter;