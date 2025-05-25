import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import styles from './BookmarkButton.module.css';

interface BookmarkButtonProps {
  isFavorited: boolean;
  onToggle: () => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isFavorited, onToggle }) => {
  return (
    <div className={styles.tooltip} onClick={onToggle}>
      <span className={styles.tooltipText}>
        {isFavorited ? "Remover da Fila" : "Adicionar à Fila"}
      </span>
      <FontAwesomeIcon
        icon={isFavorited ? bookmarkSolid : bookmarkOutline}
        style={{ color: "#FF640A", transition: "color 0.3s ease-in-out" }}
        className={`${styles.iconBookmark} ${isFavorited ? "filled" : "outline"}`}
      />
    </div>
  );
};

export default BookmarkButton; 