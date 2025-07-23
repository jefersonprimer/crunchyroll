"use client";

import { useTranslations } from "next-intl";
import NewsMenu from "./NewsMenu";
import { useRef, useEffect } from "react";
import { useDropdown } from "@/app/[locale]/contexts/DropdownContext";
import { DropdownIcon } from "./icons/HeaderIcons";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function NavigationMenu() {
  const { activeDropdown, setActiveDropdown } = useDropdown();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;
  const t = useTranslations('navigation');

  // Função para verificar se um link está ativo
  const isLinkActive = (href: string) => {
    // Para rotas exatas, usar comparação direta
    if (href === pathname) return true;
    
    // Para rotas que podem ter sub-rotas, verificar se o pathname começa com o href
    // mas apenas se não for uma rota exata de outro item
    const exactRoutes = [
      `/${locale}/videos/new`,
      `/${locale}/videos/popular`,
      `/${locale}/simulcasts/seasons/spring-2025`,
      `/${locale}/games`,
      `/${locale}/store`,
      `/${locale}/videos/alphabetical`,
      `/${locale}/simulcastcalendar`,
      `/${locale}/music`
    ];
    
    // Se é uma rota exata, usar comparação direta
    if (exactRoutes.includes(href)) {
      return pathname === href;
    }
    
    // Para gêneros, verificar se o pathname começa com o href
    return pathname.startsWith(href);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActiveDropdown]);

  useEffect(() => {
    if (activeDropdown) {
      document.body.style.overflow = 'hidden';
     
    } else {
      document.body.style.overflow = '';
     
    }
  }, [activeDropdown]);

  const handleButtonClick = () => {
    setActiveDropdown(activeDropdown === "categorias" ? null : "categorias");
  };

  return (
    <div className="flex items-center m-0 p-0 gap-0 h-[60px]">
      <div className="items-center m-0 p-0 gap-0 h-[60px] hidden lg:flex">
        <Link href={`/${locale}/videos/new`} className="relative h-full flex lg:hidden xl:flex justify-center items-center px-[16px] hover:text-[#ffffff] hover:bg-[#141519]">
          <span
            className="font-medium text-[1rem] leading-[1.5rem] text-[#DADADA] no-underline cursor-pointer whitespace-nowrap">
            {t('new')}
          </span>
        </Link>
        <Link href={`/${locale}/videos/popular`} className="relative h-full flex justify-center items-center px-[16px] hover:text-[#ffffff] hover:bg-[#141519] flex">
          <span
            className="font-medium text-[1rem] leading-[1.5rem] text-[#DADADA] no-underline cursor-pointer whitespace-nowrap">
            {t('popular')}
          </span>
        </Link>
        <Link href={`/${locale}/simulcasts/seasons/spring-2025`} className="relative h-full flex lg:hidden xl:flex justify-center items-center px-[16px] hover:text-[#ffffff] hover:bg-[#141519]">
          <span
            className="font-medium text-[1rem] leading-[1.5rem] text-[#DADADA] no-underline cursor-pointer whitespace-nowrap">
            {t('simulcasts')}
          </span>
        </Link>
      </div>

      <div className="items-center m-0 p-0 gap-0 h-[60px] flex">
        <div className="relative h-full flex justify-center items-center hidden lg:flex">
          <div
            ref={buttonRef}
            className={`font-lato relative z-[1001] font-medium  text-[16px] leading-[1.5rem] flex items-center  text-[#DADADA] no-underline cursor-pointer px-[16px] h-full whitespace-nowrap hover:text-[#ffffff] hover:bg-[#141519]
              ${activeDropdown === "categorias" ? "text-white bg-[#141519] [&_.dropdownIcon]:fill-[#f47521]" : ""}`}
            onClick={handleButtonClick}
          >
            {t('categories')}
            <DropdownIcon />
          </div>
          {activeDropdown === "categorias" && (
            <>
              {/* Overlay escurecido atrás do dropdown */}
              <div
                className="fixed inset-0 bg-[#23252B]/60 z-[999]"
                onClick={() => setActiveDropdown(null)}
              />
              <div className="absolute top-full left-0 bg-[#141519] py-[0.8rem] px-0 w-[862px] h-[286px] z-[1000]" ref={dropdownRef}>
                <div className="flex relative gap-0">
                  <div className="w-px py-[6px] px-0 flex-[0.5] border-r border-[#23252B] last:pt-[16px]">
                    <Link href={`/${locale}/videos/alphabetical`} className={`block text-[0.875rem] font-medium leading-[1.125rem] no-underline px-[1rem] py-[.75rem] hover:bg-[#23252b] hover:text-[#f8f8f8] ${isLinkActive(`/${locale}/videos/alphabetical`) ? 'text-[#ff640a]' : 'text-[#F8F8EA]'}`} onClick={() => setActiveDropdown(null)}>{t('exploreAll')}</Link>
                    <Link href={`/${locale}/simulcastcalendar`} className={`block text-[0.875rem] font-medium leading-[1.125rem] no-underline px-[1rem] py-[.75rem] hover:bg-[#23252b] hover:text-[#f8f8f8] ${isLinkActive(`/${locale}/simulcastcalendar`) ? 'text-[#ff640a]' : 'text-[#F8F8EA]'}`} onClick={() => setActiveDropdown(null)}>{t('releaseCalendar')}</Link>
                    <Link href={`/${locale}/music`} className={`block text-[0.875rem] font-medium leading-[1.125rem] no-underline px-[1rem] py-[.75rem] hover:bg-[#23252b] hover:text-[#f8f8f8] ${isLinkActive(`/${locale}/music`) ? 'text-[#ff640a]' : 'text-[#F8F8EA]'}`} onClick={() => setActiveDropdown(null)}>{t('videosAndShows')}</Link>
                  </div>
                  <div className="w-px py-[6px] px-0 flex-[1.4] last:pt-[16px]">
                    <small className="text-[#a0a0a0] text-[.75rem] font-weight-600 leading-[1rem] mb-2 px-[1rem] py-[0.8125rem] uppercase">{t('genres')}</small>
                    <div className="grid grid-cols-3 gap-[2px] mt-[10px]">
                      <Link href={`/${locale}/videos/action`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/action`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('action')}</Link>
                      <Link href={`/${locale}/videos/music`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/music`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('music')}</Link>
                      <Link href={`/${locale}/videos/shounen`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/shounen`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('shounen')}</Link>
                      <Link href={`/${locale}/videos/adventure`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/adventure`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('adventure')}</Link>
                      <Link href={`/${locale}/videos/romance`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/romance`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('romance')}</Link>
                      <Link href={`/${locale}/videos/slice-of-life`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/slice-of-life`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('sliceOfLife')}</Link>
                      <Link href={`/${locale}/videos/comedy`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/comedy`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('comedy')}</Link>
                      <Link href={`/${locale}/videos/sci-fi`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/sci-fi`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('sciFi')}</Link>
                      <Link href={`/${locale}/videos/sports`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/sports`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('sports')}</Link>
                      <Link href={`/${locale}/videos/drama`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/drama`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('drama')}</Link>
                      <Link href={`/${locale}/videos/seinen`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/seinen`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('seinen')}</Link>
                      <Link href={`/${locale}/videos/supernatural`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/supernatural`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('supernatural')}</Link>
                      <Link href={`/${locale}/videos/fantasy`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/fantasy`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('fantasy')}</Link>
                      <Link href={`/${locale}/videos/shoujo`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/shoujo`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('shoujo')}</Link>
                      <Link href={`/${locale}/videos/thriller`} className={`no-underline py-[.75rem] px-[1rem] text-[.875rem] font-medium leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B] ${isLinkActive(`/${locale}/videos/thriller`) ? 'text-[#ff640a]' : 'text-[#dadada]'}`} onClick={() => setActiveDropdown(null)}>{t('thriller')}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        <div className="w-[1px] h-[20px] bg-[#4A4E58] my-0 mx-[4px]" />
        </div>
        <div className="flex items-center m-0 p-0 gap-0 h-[60px] hidden lg:flex">
          <Link href={`/${locale}/games`} className="relative h-full flex justify-center items-center px-[16px] hover:text-[#ffffff] hover:bg-[#141519]">
            <span
              className="font-medium text-[1rem] leading-[1.5rem] text-[#DADADA] no-underline cursor-pointer whitespace-nowrap">
              {t('games')}
            </span>
          </Link>
          {/* <Link href={`/${locale}/store`} className="relative h-full flex justify-center items-center px-[16px]">
            <span
              className="font-medium text-[1rem] leading-[1.5rem] text-[#DADADA] no-underline cursor-pointer whitespace-nowrap hover:text-[#ffffff] hover:bg-[#141519]">
              {t('store')}
            </span>
          </Link> */}
          <NewsMenu />
        </div>
      </div>
    </div>
  );
}