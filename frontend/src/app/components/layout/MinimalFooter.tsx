import React from 'react';
import { useTranslations } from 'next-intl';
import LanguageDropdown from './LanguageDropdown';

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
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-controls="fa177e39-897a-44a4-92e6-080ef17f072d"
              >
                <span className="text-sm font-medium text-[#A0A0A0]"><LanguageDropdown /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalFooter;