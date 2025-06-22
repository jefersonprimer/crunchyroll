import styles from "./AnimeGrid.module.css";
import React from "react";

const AnimeGridSkeleton: React.FC = () => (
  <div className={styles.animeCard} style={{ pointerEvents: 'none' }}>
    <div style={{ width: "100%", height: "250px", background: "#141519"}} />
    <div className={styles.nomeDataContainer}>
      <div style={{ width: "70%", height: "18px", background: "#141519", margin: "8px 0" }} />
      <div style={{ width: "40%", height: "14px", background: "#141519"}} />
    </div>
  </div>
);

export default AnimeGridSkeleton; 