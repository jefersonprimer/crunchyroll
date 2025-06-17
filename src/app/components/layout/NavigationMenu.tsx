"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { DropdownIcon } from "../icons/HeaderIcons";
import NewsMenu from "./NewsMenu";
import { useDropdown } from "@/app/[locale]/contexts/DropdownContext";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function NavigationMenu() {
  const { activeDropdown, setActiveDropdown } = useDropdown();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const locale = pathname.startsWith("/pt-br") ? "pt-br" : "en";
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
    <ul className={styles.navList}>
      <li className={styles.navItem}>
        <Link href={`/${locale}/videos/new`} className={styles.navLink}>{t('new')}</Link>
      </li>
      <li className={styles.navItem}>
        <Link href={`/${locale}/videos/popular`} className={styles.navLink}>{t('popular')}</Link>
      </li>
      <li className={styles.navItem}>
        <Link href={`/${locale}/simulcasts/seasons/spring-2025`} className={styles.navLink}>{t('simulcasts')}</Link>
      </li>
      <li className={styles.navItem}>
        <div
          ref={buttonRef}
          className={`${styles.navLink} ${activeDropdown === "categorias" ? styles.activeNews : ""}`}
          onClick={handleButtonClick}
        >
          {t('categories')}
          <DropdownIcon />
        </div>
        {activeDropdown === "categorias" && (
          <div className={styles.dropdownMenu} ref={dropdownRef}>
            <div className={styles.navDropdown}>   
              <div className={styles.dropdownColumn}>
                <Link href={`/${locale}/videos/alphabetical`} className={styles.dropdownItem} onClick={() => setActiveDropdown(null)}>{t('exploreAll')}</Link>
                <Link href={`/${locale}/simulcastcalendar`} className={styles.dropdownItem} onClick={() => setActiveDropdown(null)}>{t('releaseCalendar')}</Link>
                <Link href={`/${locale}/series`} className={styles.dropdownItem} onClick={() => setActiveDropdown(null)}>{t('videosAndShows')}</Link>
              </div>
              <div className={styles.dropdownColumn}>
                <small className={styles.dropdownTitle}>{t('genres')}</small>
                <div className={styles.genreGrid}>
                  <Link href={`/${locale}/videos/action`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('action')}</Link>
                  <Link href={`/${locale}/videos/adventure`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('adventure')}</Link>
                  <Link href={`/${locale}/videos/comedy`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('comedy')}</Link>
                  <Link href={`/${locale}/videos/drama`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('drama')}</Link>
                  <Link href={`/${locale}/videos/fantasy`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('fantasy')}</Link>
                  <Link href={`/${locale}/videos/music`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('music')}</Link>
                  <Link href={`/${locale}/videos/romance`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('romance')}</Link>
                  <Link href={`/${locale}/videos/sci-fi`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('sciFi')}</Link>
                  <Link href={`/${locale}/videos/seinen`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('seinen')}</Link>
                  <Link href={`/${locale}/videos/shoujo`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('shoujo')}</Link>
                  <Link href={`/${locale}/videos/shounen`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('shounen')}</Link>
                  <Link href={`/${locale}/videos/slice-of-life`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('sliceOfLife')}</Link>
                  <Link href={`/${locale}/videos/sports`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('sports')}</Link>
                  <Link href={`/${locale}/videos/supernatural`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('supernatural')}</Link>
                  <Link href={`/${locale}/videos/thriller`} className={styles.genreItem} onClick={() => setActiveDropdown(null)}>{t('thriller')}</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </li>
      <div className={styles.navSeparator} />
      <li className={styles.navItem}>
        <Link href={`/${locale}/games`} className={styles.navLink}>{t('games')}</Link>
      </li>
      <li className={styles.navItem}>
        <Link href={`/${locale}/store`} className={styles.navLink}>{t('store')}</Link>
      </li>
      <NewsMenu />
    </ul>
  );
} 

