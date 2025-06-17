"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { HamburgerIcon } from "../icons/HeaderIcons";

export default function MobileMenu() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <div className={styles.mobileMenu}>
      <button
        className={styles.hamburgerButton}
        onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
      >
        <HamburgerIcon />
      </button>

      <Link href="/" className={styles.mobileLogo}>
        <img
          src="/Crunchyroll-Logo.png"
          alt="Crunchyroll"
          className={styles.logoImage}
        />
      </Link>

      {isHamburgerOpen && (
        <div className={styles.mobileDropdown}>
          <Link href="/popular" className={styles.mobileMenuItem}>
            Populares
          </Link>
        </div>
      )}
    </div>
  );
} 

