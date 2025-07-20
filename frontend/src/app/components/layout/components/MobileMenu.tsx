"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { HamburgerIcon } from "./icons/HeaderIcons";

export default function MobileMenu() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    if (isHamburgerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isHamburgerOpen]);

  return (
    <div className="flex items-center lg:hidden">
      <button
        className={`flex items-center justify-center w-[60px] h-[60px] border-none cursor-pointer hover:bg-[#141519] ${
          isHamburgerOpen ? "bg-[#141519]" : "bg-transparent"
        }`}
        onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
      >
        <div className="flex items-center justify-center w-[34px] h-[24px]">
          <HamburgerIcon />
        </div>
      </button>

      <div className="flex items-center w-[60px] h-[60px]">
        <Link href={`/${locale}`} className="flex items-center justify-center w-[60px] h-[60px]">
          <svg
            className="w-[24px] h-[60px] text-[#ff640a] hover:text-[#FFFFFF] transition-[fill] duration-300 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            data-t="crunchyroll-logo-only-svg"
            aria-hidden="true"
            role="img"
            fill="currentColor"
            >
              <path d="M5.818 26.871c.01-11.65 9.466-21.086 21.117-21.073 11.153.01 20.275 8.678 21.022 19.638.028-.467.043-.94.043-1.413C48.014 10.77 37.28.013 24.024 0 10.768-.014.014 10.721 0 23.976-.014 37.23 10.721 47.987 23.976 48c.548 0 1.092-.018 1.63-.054-11.051-.676-19.8-9.856-19.788-21.076Zm32.568.312a8.2 8.2 0 0 1-8.19-8.208 8.204 8.204 0 0 1 5.424-7.71 17.923 17.923 0 0 0-8.375-2.073c-9.95-.01-18.022 8.047-18.032 17.995-.01 9.95 8.047 18.022 17.995 18.033 9.948.01 18.022-8.047 18.032-17.997 0-1.127-.103-2.23-.301-3.301a8.187 8.187 0 0 1-6.554 3.261h.001Z">
              </path>
          </svg>
        </Link>
      </div>

      {isHamburgerOpen && (
        <div className="fixed top-15 left-0 w-full sm:w-[300px] h-screen z-[1100] bg-[#141519] p-4 overflow-y-auto">
          <Link
            href="/novidades"
            className="block text-white no-underline py-3"
          >
            <span>Populares</span>
          </Link>
          <Link
            href="/popular"
            className="block text-white no-underline py-3"
          >
            <span>Populares</span>
          </Link>
          <Link
            href="/popular"
            className="block text-white no-underline py-3"
          >
            <span>Explorar Tudo (A-Z)</span>
          </Link>
          <Link
            href="/popular"
            className="block text-white no-underline py-3"
          >
            <span>Simulcasts da Temporada</span>
          </Link>
          <Link
            href="/popular"
            className="block text-white no-underline py-3"
          >
            <span>Calendário de Lançamentos</span>
          </Link>
          <div className="border-b border-[#333]">
            <div
              className=" text-white no-underline py-3 cursor-pointer select-none flex items-center justify-between"
              onClick={() => setIsCategoriesOpen((prev) => !prev)}
            >
              <span>Categorias</span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 10h10l-5 5z" />
              </svg>
            </div>
            {isCategoriesOpen && (
              <div className="ml-4 mt-2">
                <Link
                  href={`/${locale}/videos/action`}
                  className="block text-white no-underline py-2 px-2 rounded hover:bg-[#333]"
                >
                  Ação
                </Link>
                <Link
                  href={`/${locale}/videos/comedy`}
                  className="block text-white no-underline py-2 px-2 rounded hover:bg-[#333]"
                >
                  Comédia
                </Link>
              </div>
            )}
          </div>
          <div>
            <div
              className=" text-white no-underline py-3 cursor-pointer select-none flex items-center justify-between"
              onClick={() => setIsNewsOpen((prev) => !prev)}
            >
              <span>Noticias</span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-200 ${isNewsOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 10h10l-5 5z" />
              </svg>
            </div>
            {isNewsOpen && (
              <div className="ml-4 mt-2">
                <Link
                  href={`/${locale}/videos/action`}
                  className="block text-white no-underline py-2 px-2 rounded hover:bg-[#333]"
                >
                  Todas as Noticias
                </Link>
                <Link
                  href={`/${locale}/videos/comedy`}
                  className="block text-white no-underline py-2 px-2 rounded hover:bg-[#333]"
                >
                  Anime Awards
                </Link>
                <Link
                  href={`/${locale}/videos/comedy`}
                  className="block text-white no-underline py-2 px-2 rounded hover:bg-[#333]"
                >
                  Eventos & Experiências
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/popular"
            className="block text-white no-underline py-3"
          >
            <span>Jogos</span>
          </Link>
          <Link
            href="/popular"
            className="block text-white no-underline py-3"
          >
            <span>Videos & Shows</span>
          </Link>
        </div>
      )}
    </div>
  );
}
