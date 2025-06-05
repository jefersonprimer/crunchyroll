import Image from "next/image";
const logo = "/Crunchyroll-Logo.png";

export default function HeaderSkeleton() {
  return (
    <header className="fixed top-0 left-0 w-[calc(100%-15px)] h-[60px] bg-[#23252B] shadow-md flex items-center justify-between px-[max(5%,40px)] z-[999]">
      <div className="flex justify-between w-full items-center bg-[#23252B]">
        {/* Logo Skeleton */}
        <div className="flex items-center pr-[30px]">
          <div className="w-[136px] h-[60px] overflow-hidden flex items-center justify-center">
            <Image
              className="w-[120px] h-[60px] brightness-0"
              src={logo}
              alt="Logo da Crunchyroll"
              width={120}
              height={60}
              priority
            />
          </div>
        </div>

        <div className="flex items-center ml-0 text-white">
          {/* Navigation Links Skeleton */}
          <ul className="flex list-none p-0 m-0">
            <li className="relative">
              <div className="w-[80px] h-[24px] bg-[#1a1a1a] animate-pulse mx-4" />
            </li>
            <li className="relative">
              <div className="w-[80px] h-[24px] bg-[#1a1a1a] animate-pulse mx-4" />
            </li>
            <li className="relative">
              <div className="w-[80px] h-[24px] bg-[#1a1a1a] animate-pulse mx-4" />
            </li>
          </ul>
        </div>

        {/* Icons Skeleton */}
        <div className="flex items-center ml-auto text-white">
          <div className="flex items-center">
            <div className="p-[18px]">
              <div className="w-[24px] h-[24px] bg-[#1a1a1a] rounded-full animate-pulse" />
            </div>
            <div className="p-[18px]">
              <div className="w-[24px] h-[24px] bg-[#1a1a1a] rounded-full animate-pulse mx-3" />
            </div>
            <div className="flex">
              <div className="w-[34px] h-[34px] bg-[#1a1a1a] rounded-full animate-pulse " />
              <svg className="w-[24px] h-[24px]  rounded-full animate-pulse mt-1 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="dropdown-svg" aria-labelledby="dropdown-svg" aria-hidden="true" role="img"><path d="M7 10h10l-5 5z"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 