"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { DropdownIcon } from "../icons/HeaderIcons";
import NewsMenu from "./NewsMenu";
import { useDropdown } from "@/app/context/DropdownContext";

export default function NavigationMenu() {
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
    setActiveDropdown(activeDropdown === "navegar" ? null : "navegar");
  };

  return (
    <ul className={styles.navList}>
      <li className={styles.navItem}>
        <div
          ref={buttonRef}
          className={`${styles.navLink} ${activeDropdown === "navegar" ? styles.activeNews : ""}`}
          onClick={handleButtonClick}
        >
          Navegar
          <DropdownIcon />
        </div>
        {activeDropdown === "navegar" && (
          <div className={styles.dropdownMenu} ref={dropdownRef}>
            <div className={styles.navDropdown}>   
              <div className={styles.dropdownColumn}>
                <Link href="/videos/popular" className={styles.dropdownItem}>Populares</Link>
                <Link href="/videos/new" className={styles.dropdownItem}>Novidades</Link>
                <Link href="/videos/alphabetical" className={styles.dropdownItem}>A-Z</Link>
                <Link href="/calendar" className={styles.dropdownItem}>Simulcasts da Temporada</Link>
                <Link href="/calendar" className={styles.dropdownItem}>Calendário de Lançamentos</Link>
                <Link href="/series" className={styles.dropdownItem}>Videoclips & Shows</Link>
              </div>
              <div className={styles.dropdownColumn}>
                <h3 className={styles.dropdownTitle}>GÊNEROS</h3>
                <div className={styles.genreGrid}>
                  <Link href="/videos/action" className={styles.genreItem}>Ação</Link>
                  <Link href="/videos/adventure" className={styles.genreItem}>Aventura</Link>
                  <Link href="/videos/comedy" className={styles.genreItem}>Comédia</Link>
                  <Link href="/videos/drama" className={styles.genreItem}>Drama</Link>
                  <Link href="/videos/fantasy" className={styles.genreItem}>Fantasia</Link>
                  <Link href="/videos/music" className={styles.genreItem}>Música</Link>
                  <Link href="/videos/romance" className={styles.genreItem}>Romance</Link>
                  <Link href="/videos/sci-fi" className={styles.genreItem}>Ficção Científica</Link>
                  <Link href="/videos/seinen" className={styles.genreItem}>Seinen</Link>
                  <Link href="/videos/shoujo" className={styles.genreItem}>Shoujo</Link>
                  <Link href="/videos/shounen" className={styles.genreItem}>Shounen</Link>
                  <Link href="/videos/slice-of-life" className={styles.genreItem}>Slice-of-Life</Link>
                  <Link href="/videos/sports" className={styles.genreItem}>Esportes</Link>
                  <Link href="/videos/supernatural" className={styles.genreItem}>Sobrenatural</Link>
                  <Link href="/videos/thriller" className={styles.genreItem}>Suspense</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </li>
      <li className={styles.navItem}>
        <Link href="/games" className={styles.navLink}>
          Jogos
        </Link>
      </li>
      <NewsMenu />
    </ul>
  );
} 