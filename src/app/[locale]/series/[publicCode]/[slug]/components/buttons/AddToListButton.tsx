import React from 'react';
import styles from "../HeroSection.module.css";

interface AddToListButtonProps {
  onClick: () => void;
}

const AddToListButton: React.FC<AddToListButtonProps> = ({ onClick }) => {
  return (
    <div className={styles.tooltipContainer}>
      <button
        tabIndex={0}
        className={styles.actionTooltip}
        data-t="custom-list-btn"
        onClick={onClick}
      >
        <div className={styles.tooltip}>
          <span className={styles.tooltipText}>
            Minha Lista
          </span>
          <svg
            className={styles.actionIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M13 3v8h8v2h-8v8h-2v-8H3v-2h8V3z" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default AddToListButton; 