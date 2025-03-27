"use client";

import React from "react";
import Link from "next/link";
import styles from "./EpisodesSection.module.css";

interface Episode {
  id: string;
  title: string;
  image: string;
  slug: string;
  releaseDate: string;
}

interface EpisodesSectionProps {
  episodes: Episode[];
}

export const EpisodesSection = ({ episodes }: EpisodesSectionProps) => {
  return (
    <div className={styles.episodesContainer}>
      <div className={styles.episodesSection}>
     
        <h2>Episódios</h2>

        <div className={styles.episodesGrid}>
          {episodes.length > 0 ? (
            episodes.map((episode) => (
              <div key={episode.id} className={styles.episodeCard}>
                <img
                  src={episode.image}
                  alt={`Episódio ${episode.id}`}
                  className={styles.episodeImage}
                />
                <div className={styles.episodeInfo}>
                  <Link href={`/watch/${episode.id}/${episode.slug}`}>
                    {episode.title}
                  </Link>
                  <span>{episode.releaseDate}</span>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum episódio encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};
