"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { DropdownIcon } from "../icons/HeaderIcons";
import { useDropdown } from "@/app/[locale]/contexts/DropdownContext";
import { useTranslations } from "next-intl";
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
    <li className={styles.navItem}>
      <div
        ref={buttonRef}
        className={`${styles.navLink} ${activeDropdown === "news" ? styles.activeNews : ""}`}
        onClick={handleButtonClick}
      >
        {t('news')}
        <DropdownIcon />
      </div>
      {activeDropdown === "news" && (
        <div className={styles.newsDropdown} ref={dropdownRef}>
          <div>
            <Link href="/news" className={styles.dropdownItem} onClick={() => setActiveDropdown(null)}>
              {t('allNews')}
            </Link>
            <Link href="/news/awards" className={styles.dropdownItem} onClick={() => setActiveDropdown(null)}>
              {t('animeAwards')}
            </Link>
            <Link href="/news/events" className={styles.dropdownItem} onClick={() => setActiveDropdown(null)}>
              {t('experiencesAndEvents')}
            </Link>
          </div>
        </div>
      )}
    </li>
  );
} 

