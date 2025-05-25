'use client';

import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import styles from './styles.module.css';
import AnimeCard from './components/AnimeCard';
import { Anime } from '../../types/anime';

const Fila = () => {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemoveFavorite = (id: string) => {
    removeFavorite(id);
  };

  return (
    <div className={styles.emptyListBox}>
      {favorites.length === 0 ? (
        <div className={styles.wrapper}>
          <img
            src="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-watchlist.png"
            alt="Empty Watchlist"
            className={styles.image}
          />
          <h4 className={styles.description}>
            Sua Fila merece mais amor. <br /> Vamos enchê-la com animes incríveis.
          </h4>
          <div className={styles.button}>
            <a href="/" className={styles.returnButton}>
              VOLTAR PARA A TELA INICIAL
            </a>
          </div>
        </div>
      ) : (
        <ul className={styles.animeList}>
          {favorites.map((anime: Anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              onRemove={handleRemoveFavorite}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Fila;
