import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import styles from "../HeroSection.module.css";

interface BookmarkButtonProps {
  isFavorited: boolean;
  onFavoriteClick: () => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  isFavorited,
  onFavoriteClick,
}) => {
  return (
    <div className={styles.tooltipContainer}>
      <button
        className={styles.buttonBookmark}
        onClick={onFavoriteClick}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        <div className={styles.tooltip}>
          <span className={styles.tooltipText}>
            {isFavorited ? "Remover da Fila" : "Adicionar à Fila"}
          </span>
          <FontAwesomeIcon
            icon={isFavorited ? bookmarkSolid : bookmarkOutline}
            className={`${styles.iconBookmark} ${isFavorited ? "filled" : "outline"}`}
            style={{ color: "#FF640A" }}
          />
        </div>
      </button>
    </div>
  );
};

export default BookmarkButton; 