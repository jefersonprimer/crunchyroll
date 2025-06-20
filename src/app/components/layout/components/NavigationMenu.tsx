"use client";

import { useTranslations } from "next-intl";
import NewsMenu from "./NewsMenu";
import { useRef, useEffect } from "react";
import { useDropdown } from "@/app/[locale]/contexts/DropdownContext";
import { DropdownIcon } from "./icons/HeaderIcons";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NavigationMenu() {
  const { activeDropdown, setActiveDropdown } = useDropdown();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('navigation');

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
      document.body.style.paddingRight = '17px'; // Compensate for scrollbar width
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [activeDropdown]);

  const handleButtonClick = () => {
    setActiveDropdown(activeDropdown === "categorias" ? null : "categorias");
  };

  return (
    <ul className="flex items-center list-none m-0 p-0 gap-0 h-[60px]">
      <li className="relative h-full">
        <Link href={`/${locale}/videos/new`} 
          className="font-weight-500 text-[1rem] leading-[1.5rem] flex items-center gap-0.5 text-[#DADADA] no-underline cursor-pointer px-4 h-full whitespace-nowrap hover:text-[#ffffff] hover:bg-[#141519]"
        >
          {t('new')}
        </Link>
      </li>
      <li className="relative h-full">
        <Link href={`/${locale}/videos/popular`}
          className="font-weight-500 text-[1rem] leading-[1.5rem] flex items-center gap-0.5 text-[#DADADA] no-underline cursor-pointer px-4 h-full whitespace-nowrap hover:text-[#ffffff] hover:bg-[#141519]"
        >
          {t('popular')}
        </Link>
      </li>
      <li className="relative h-full">
        <Link href={`/${locale}/simulcasts/seasons/spring-2025`} 
          className="font-weight-500 text-[1rem] leading-[1.5rem] flex items-center gap-0.5 text-[#DADADA] no-underline cursor-pointer px-4 h-full whitespace-nowrap hover:text-[#ffffff] hover:bg-[#141519]"
        >
          {t('simulcasts')}
        </Link>
      </li>
      <li className="relative h-full">
        <div
          ref={buttonRef}
          className={`font-weight-500 text-[1rem] leading-[1.5rem] flex items-center gap-0.5 text-[#DADADA] no-underline cursor-pointer px-4 h-full whitespace-nowrap hover:text-[#ffffff] hover:bg-[#141519] 
            ${activeDropdown === "categorias" ? "text-white bg-[#141519] [&_.dropdownIcon]:fill-[#f47521]" : ""}`}
          onClick={handleButtonClick}
        >
          {t('categories')}
          <DropdownIcon />
        </div>
        {activeDropdown === "categorias" && (
          <div className="absolute top-full left-0 bg-[#141519] py-[0.8rem] px-0 w-[862px] h-[286px] z-[1000]" ref={dropdownRef}>
            <div className="flex relative gap-0">   
              <div className="w-px py-[6px] px-0 flex-[0.5] border-r border-[#23252B] last:pt-[16px]">
                <Link href={`/${locale}/videos/alphabetical`} className="block text-[#F8F8EA] text-[0.875rem] font-weight-500 leading-[1.125rem] no-underline px-[1rem] py-[.75rem] hover:bg-[#23252b] hover:text-[#f8f8f8]" onClick={() => setActiveDropdown(null)}>{t('exploreAll')}</Link>
                <Link href={`/${locale}/simulcastcalendar`} className="block text-[#F8F8EA] text-[0.875rem] font-weight-500 leading-[1.125rem] no-underline px-[1rem] py-[.75rem] hover:bg-[#23252b] hover:text-[#f8f8f8]" onClick={() => setActiveDropdown(null)}>{t('releaseCalendar')}</Link>
                <Link href={`/${locale}/series`} className="block text-[#F8F8EA] text-[0.875rem] font-weight-500 leading-[1.125rem] no-underline px-[1rem] py-[.75rem] hover:bg-[#23252b] hover:text-[#f8f8f8]" onClick={() => setActiveDropdown(null)}>{t('videosAndShows')}</Link>
              </div>
              <div className="w-px py-[6px] px-0 flex-[1.4] last:pt-[16px]">
                <small className="text-[#a0a0a0] text-[.75rem] font-weight-600 leading-[1rem] mb-2 px-[1rem] py-[0.8125rem] uppercase">{t('genres')}</small>
                <div className="grid grid-cols-3 gap-[2px] mt-[10px]">
                  <Link href={`/${locale}/videos/action`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('action')}</Link>
                  <Link href={`/${locale}/videos/music`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('music')}</Link>
                  <Link href={`/${locale}/videos/shounen`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('shounen')}</Link>
                  <Link href={`/${locale}/videos/adventure`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('adventure')}</Link>
                  <Link href={`/${locale}/videos/romance`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('romance')}</Link>
                  <Link href={`/${locale}/videos/slice-of-life`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('sliceOfLife')}</Link>
                  <Link href={`/${locale}/videos/comedy`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('comedy')}</Link>
                  <Link href={`/${locale}/videos/sci-fi`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('sciFi')}</Link>
                  <Link href={`/${locale}/videos/sports`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('sports')}</Link>
                  <Link href={`/${locale}/videos/slice-of-life`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('drama')}</Link>
                  <Link href={`/${locale}/videos/seinen`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('seinen')}</Link>
                  <Link href={`/${locale}/videos/supernatural`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('supernatural')}</Link>
                  <Link href={`/${locale}/videos/fantasy`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('fantasy')}</Link>
                  <Link href={`/${locale}/videos/shoujo`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('shoujo')}</Link>
                  <Link href={`/${locale}/videos/thriller`} className="text-[#dadada] no-underline py-[.75rem] px-[1rem] text-[.875rem] font-weight-500 leading-[1.125rem] hover:text-[#DADADA] hover:bg-[#23252B]" onClick={() => setActiveDropdown(null)}>{t('thriller')}</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </li>
      <div className="w-[1px] h-[20px] bg-[#4A4E58] my-0 mx-[4px]" />
      <li className="relative h-full">
        <Link href={`/${locale}/games`} 
          className="font-weight-500 text-[1rem] leading-[1.5rem] flex items-center gap-0.5 text-[#DADADA] no-underline cursor-pointer px-4 h-full whitespace-nowrap hover:text-[#ffffff] hover:bg-[#141519]"
        >
        {t('games')}
        </Link>
      </li>
      <li className="relative h-full">
        <Link href={`/${locale}/store`} 
          className="font-weight-500 text-[1rem] leading-[1.5rem] flex items-center gap-0.5 text-[#DADADA] no-underline cursor-pointer px-4 h-full whitespace-nowrap hover:text-[#ffffff] hover:bg-[#141519]"
        >
          {t('store')}
        </Link>
      </li>
      <NewsMenu />
    </ul>
  );
} 

