"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect } from "react";
import { DropdownIcon } from "./icons/HeaderIcons";
import { useDropdown } from "@/app/[locale]/contexts/DropdownContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NewsMenu() {
  const { activeDropdown, setActiveDropdown } = useDropdown();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
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

  const handleButtonClick = () => {
    setActiveDropdown(activeDropdown === "news" ? null : "news");
  };

  return (
    <li className="relative h-full">
      <div
        ref={buttonRef}
        className={`font-weight-500 text-[1rem] leading-[1.5rem] flex items-center gap-0.5 text-[#DADADA] no-underline cursor-pointer px-4 h-full whitespace-nowrap hover:text-[#ffffff] hover:bg-[#141519] 
          ${activeDropdown === "news" ? "text-white bg-[#141519] [&_.dropdownIcon]:fill-[#f47521]" : ""}`}
        onClick={handleButtonClick}
      >
        {t('news')}
        <DropdownIcon />
      </div>
      {activeDropdown === "news" && (
        <div className="absolute top-full left-0 bg-[#141519] py-[0.8rem] px-0 w-[300px] z-[1000]" ref={dropdownRef}>
          <div>
            <Link 
              href="/news" 
              className="block text-[#F8F8EA] text-[0.875rem] font-weight-500 leading-[1.125rem] no-underline px-[1rem] py-[.75rem] hover:bg-[#23252b] hover:text-[#f8f8f8]"
              onClick={() => setActiveDropdown(null)}
            >
              {t('allNews')}
            </Link>
            <Link 
              href="/news/awards" 
              className="block text-[#F8F8EA] text-[0.875rem] font-weight-500 leading-[1.125rem] no-underline px-[1rem] py-[.75rem] hover:bg-[#23252b] hover:text-[#f8f8f8]" 
              onClick={() => setActiveDropdown(null)}
            >
              {t('animeAwards')}
            </Link>
            <Link 
              href="/news/events" 
              className="block text-[#F8F8EA] text-[0.875rem] font-weight-500 leading-[1.125rem] no-underline px-[1rem] py-[.75rem] hover:bg-[#23252b] hover:text-[#f8f8f8]" 
              onClick={() => setActiveDropdown(null)}
            >
              {t('experiencesAndEvents')}
            </Link>
          </div>
        </div>
      )}
    </li>
  );
} 

