"use client";

import React, { useState, useEffect } from "react";
import { useFavorites } from "../../contexts/FavoritesContext";
import styles from "./FavoritesCarousel.module.css";
import Link from "next/link";
import FavoritesCard from "./FavoritesCard";

const FavoritesCarousel = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sua Lista</h2>
        <div className={styles.filaLink}>
          <Link href="/watchlist" className={styles.filaButton}>
            <span>VER FILA</span>
            <svg
              className={styles.angle}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-labelledby="angle-svg"
              aria-hidden="true"
              role="img"
            >
              <title id="angle-svg">Próximo</title>
              <path d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z"></path>
            </svg>
          </Link>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <img
            src="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-watchlist.png"
            alt="Empty Watchlist"
            className={styles.image}
          />
          <h4 className={styles.description}>
            Sua Fila merece mais amor. <br /> Vamos enchê-la com animes incríveis.
          </h4>
          <a href="/" className={styles.returnButton}>VOLTAR PARA A TELA INICIAL</a>
        </div>
      ) : (
        <div className={styles.carousel}>
          {favorites.map((anime) => (
            <FavoritesCard
              key={anime.id}
              anime={anime}
              onRemove={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesCarousel;
