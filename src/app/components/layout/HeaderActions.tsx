"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
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
                  <span className={styles.freeTrialText}>TESTE GRÁTIS</span>
                  <span className={styles.premiumText}>PREMIUM</span>
                </div>
              </div>
              <PremiumPopup />
            </div>
          </button>
        </div>

        <div className={styles.searchIcon}>
          <button onClick={handleSearchClick} className={styles.searchButton}>
            <div className={styles.iconBackground}>
              <div className={styles.ercHeaderSvg}>
                <SearchIcon />
              </div>
            </div>
          </button>
        </div>

        <Link href="/watchlist">
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