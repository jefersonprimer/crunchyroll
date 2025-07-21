"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const messages = {
  alphabetical: "Ordem Alfabética",
  mostPopular: "Mais Populares",
  mostRecent: "Mais Recentes",
  sort: "Ordenar",
};

const SortDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleSort = (route: string) => {
    setOpen(false);
    router.push(route);
  };

  return (
    <div className="relative ml-4">
      <div
        onClick={() => setOpen((v) => !v)}
        className={`p-2.5 flex items-center border-none cursor-pointer transition-colors bg-transparent text-[#A0A0A0] hover:bg-[#23252B] hover:text-white`}
      >
        <svg
          className="w-4 h-4 mr-2 fill-[#A0A0A0] hover:fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-labelledby="sort-svg"
          aria-hidden="true"
          role="img"
        >
          <title id="sort-svg">{messages.sort}</title>
          <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z"></path>
        </svg>
        <span className="cursor-pointer text-sm font-bold text-[#A0A0A0] hover:text-white uppercase">
          {messages.alphabetical}
        </span>
      </div>
      {open && (
        <div className="cursor-pointer flex flex-col absolute top-full right-0 bg-[#23252B] py-2.5 z-10 w-[200px]">
          <div onClick={() => handleSort("/videos/popular")} className="px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white">
            {messages.mostPopular}
          </div>
          <div onClick={() => handleSort("/videos/new")} className="px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white">
            {messages.mostRecent}
          </div>
          <div onClick={() => handleSort("/videos/alphabetical")} className="px-2.5 py-2 text-[#A0A0A0] flex items-center gap-2 hover:bg-[#1D1E22] hover:text-white">
            {messages.alphabetical}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown; 