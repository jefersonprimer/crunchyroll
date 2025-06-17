"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "./Header.module.css";
import { UserProfile } from "@/types/header";
import { SearchIcon, WatchlistIcon, UserIcon, PremiumIcon, DropdownIcon } from "../icons/HeaderIcons";
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
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("header");

  const handleSearchClick = () => {
    router.push("/search");
  };

  const handleWatchlistClick = () => {
    router.push("/watchlist");
  };

  return (
    <div className={styles.headerActions}>
      <div className={styles.searchContainer}>
        <div className={styles.searchIcon}>
          <button onClick={handleSearchClick} className={styles.searchButton}>
            <div className={styles.iconBackgroundPopup}>
              <div className={styles.ercHeaderSvgPopup}>
                <PremiumIcon />
                <div className={styles.textContainer}>
                  <span className={styles.freeTrialText}>{t("freeTrial")}</span>
                  <span className={styles.premiumText}>{t("premium")}</span>
                </div>
              </div>
              <PremiumPopup />
            </div>
          </button>
        </div>

        <div className={styles.searchIcon}>
          <button className={styles.searchButton}>
            <Link href={`/${locale}/search`} className={styles.iconBackground}>
              <div className={styles.ercHeaderSvg}>
                <SearchIcon />
              </div>
            </Link>
          </button>
        </div>

        <Link href={`/${locale}/watchlist`}>
          <div className={styles.iconBackground}>
            <div className={styles.ercHeaderSvg} onClick={handleWatchlistClick}>
              <WatchlistIcon />
            </div>
          </div>
        </Link>

        <div className={`${userProfile?.profile_image_url ? styles.iconBackgroundLoggedIn : styles.iconBackground} ${(isAccountModalOpen || isAnonymousModalOpen) ? styles.active : ''}`}>
          <div className={styles.ercHeaderSvg} onClick={onUserClick}>
            {userProfile?.profile_image_url ? (
              <div className={styles.userProfileContainer}>
                <img
                  src={userProfile.profile_image_url}
                  alt="Profile"
                  className={styles.profileImage}
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

