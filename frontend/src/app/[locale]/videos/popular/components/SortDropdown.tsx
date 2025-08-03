"use client";
import Link from "next/link";
import { useDropdown } from "@/app/[locale]/hooks/useDropdown";
import { useTranslations } from "next-intl";

export default function SortDropdown() {
  const { activeDropdown, toggleDropdown } = useDropdown();
  const t = useTranslations('popular');

  return (
    <div className="relative ml-4">
      <div
        onClick={() => toggleDropdown('filter')}
        className={`p-2.5 flex items-center border-none cursor-pointer uppercase text-[#A0A0A0] hover:text-white ${
          activeDropdown === 'filter' ? 'bg-[#23252B] text-white' : 'bg-transparent'
        } hover:bg-[#23252B]`}
      >
        <svg
          className="w-6 h-6 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-labelledby="sort-svg"
          aria-hidden="true"
          role="img"
          fill="currentColor"
        >
          <title id="sort-svg">{t('filters.sort.label')}</title>
          <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z"></path>
        </svg>
        <span className="cursor-pointer text-sm font-bold">
          {t('mostPopular')}
        </span>
      </div>
      {activeDropdown === 'filter' && (
        <div className="cursor-pointer flex flex-col absolute top-full right-0 bg-[#23252B] py-2.5 z-10 w-[200px]">
          <Link href="/videos/popular" className="px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white">
            {t('filters.sort.options.mostPopular')}
          </Link>
          <Link href="/videos/new" className="px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white">
            {t('filters.sort.options.newest')}
          </Link>
          <Link href="/videos/alphabetical" className="px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white">
            {t('filters.sort.options.alphabetical')}
          </Link>
        </div>
      )}
    </div>
  );
} 