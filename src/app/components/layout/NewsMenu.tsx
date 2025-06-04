"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { DropdownIcon } from "../icons/HeaderIcons";
import { useDropdown } from "@/app/context/DropdownContext";

export default function NewsMenu() {
  const { activeDropdown, setActiveDropdown } = useDropdown();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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
        Notícias
        <DropdownIcon />
      </div>
      {activeDropdown === "news" && (
        <div className={styles.newsDropdown} ref={dropdownRef}>
          <div>
            <Link href="/news" className={styles.dropdownItem}>
              Todas as Notícias
            </Link>
            <Link href="/news/awards" className={styles.dropdownItem}>
              Anime Awards
            </Link>
            <Link href="/news/events" className={styles.dropdownItem}>
              Evento & Experiências
            </Link>
          </div>
        </div>
      )}
    </li>
  );
} 