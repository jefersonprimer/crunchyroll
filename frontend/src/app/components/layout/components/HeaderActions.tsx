"use client";

import { useTranslations } from "next-intl";
import { UserProfile } from "@/types/header";
import { SearchIcon, WatchlistIcon, UserIcon, PremiumIcon, DropdownIcon } from "./icons/HeaderIcons";
import Link from "next/link";
import { useParams } from "next/navigation";
import PremiumPopup from "./PremiumPopup";

interface HeaderActionsProps {
  userProfile: UserProfile | null;
  onUserClick: () => void;
  isAccountModalOpen: boolean;
  isAnonymousModalOpen: boolean;
}

export default function HeaderActions({
  userProfile,
  onUserClick,
  isAccountModalOpen,
  isAnonymousModalOpen,
}: HeaderActionsProps) {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("header");

  return (
    <div className="flex-none">
      <div className="flex items-center gap-0">
        <div className="relative">
          <button className="bg-none border-none p-0 cursor-pointer">
            <div className="flex items-center justify-center w-[60px] sm:w-[120px] md:w-[60px] xl:w-[120px] h-[60px] transition-colors duration-200 relative hover:bg-[#141519] group">
              <div className="flex items-center justify-center   w-[60px] sm:w-[120px] md:w-[60px] xl:w-[120px] h-[60px] gap-[8px]">
                <PremiumIcon />
                <div className="hidden sm:flex md:hidden xl:flex flex-col items-start justify-center text-left">
                  <span className="text-[10px] text-[#ffb300] uppercase">{t("freeTrial")}</span>
                  <span className="text-[10px] text-[#DADADA] uppercase">{t("premium")}</span>
                </div>
              </div>
              <div className="hidden sm:flex opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <PremiumPopup />
              </div>
            </div>
          </button>
        </div>

        <div className="relative">
          <button className="bg-none border-none p-0 cursor-pointer text-[#dadada] hover:text-[#FFFFFF]">
            <Link href={`/${locale}/search`} className="flex items-center justify-center w-[60px] h-[60px] transition-colors duration-200 hover:bg-[#141519] active:bg-[#141519]">
              <div className="flex items-center justify-center w-[36px] h-[36px] cursor-pointer">
                <SearchIcon />
              </div>
            </Link>
          </button>
        </div>
        <div className="hidden sm:block relative">
          <button className="bg-none border-none p-0 cursor-pointer text-[#dadada] hover:text-[#FFFFFF]">
            <Link href={`/${locale}/watchlist`} className="flex items-center justify-center w-[60px] h-[60px] transition-colors duration-200 hover:bg-[#141519] active:bg-[#141519]">
              <div className="flex items-center justify-center w-[36px] h-[36px] cursor-pointer">
                <WatchlistIcon />
              </div>
            </Link>
          </button>
        </div>
        <div className={`flex items-center justify-center transition-colors duration-200
            ${userProfile?.profile_image_url ? 'w-[80px] h-[60px]' : 'w-[60px] h-[60px]'}
            ${(isAccountModalOpen || isAnonymousModalOpen) ? 'bg-[#141519]' : 'hover:bg-[#141519]'}
          `}>
          <div className="flex items-center justify-center w-[36px] h-[36px] cursor-pointer text-[#dadada] hover:text-[#FFFFFF]" onClick={onUserClick}>
            {userProfile?.profile_image_url ? (
              <div className="w-[120px] flex items-center justify-center gap-[4px]">
                <img
                  src={userProfile.profile_image_url}
                  alt="Profile"
                  className="w-[36px] h-[36px] rounded-full object-cover aspect-square block"
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <DropdownIcon />
                </div>
              </div>
            ) : (
              <UserIcon />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 

