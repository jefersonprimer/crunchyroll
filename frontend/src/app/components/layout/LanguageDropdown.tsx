'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = params.locale as string;
  const t = useTranslations('footer');

  const languages: LanguageOption[] = [
    {
      code: 'pt-br',
      name: 'Português (Brasil)',
      flag: '🇧🇷'
    },
    {
      code: 'en',
      name: 'English (US)',
      flag: '🇺🇸'
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false);
    
    // Remove o locale atual do pathname
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    
    // Constrói a nova URL com o novo locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    // Navega para a nova URL
    router.push(newPath);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-sm cursor-pointer p-2 flex items-center justify-center text-[#A0A0A0] hover:text-white border-none hover:bg-[#23252B] hover:opacity-80 transition-opacity ${isOpen ? 'bg-[#23252B] text-white' : ''}`}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="flex items-center justify-center gap-2">
          {/* <span className="text-lg">{currentLanguage.flag}</span> */}
          <svg 
            className="w-6 h-6 transition-transform"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
            fill='currentColor'
            >
            <path d="M7 10h10l-5 5z"></path>
          </svg>
          <span className='text-sm font-bold uppercase'>{currentLanguage.name}</span>
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 bg-[#23252B] shadow-lg z-50 min-w-[200px]">
          <ul className="py-2" role="listbox">
            {languages.map((language) => (
              <li key={language.code} role="option">
                <button
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-[#141519] transition-colors cursor-pointer ${
                    language.code === currentLocale 
                      ? 'text-white' 
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  {/* <span className="text-lg">{language.flag}</span> */}
                  <span>{language.name}</span>
                  {/* {language.code === currentLocale && (
                    <svg className="w-4 h-4 ml-auto fill-[#FAB818]" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )} */}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown; 