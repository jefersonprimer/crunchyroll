import React from 'react';
import styles from "../HeroSection.module.css";

const MoreOptionsButton: React.FC = () => {
  return (
    <div className={styles.tooltipContainer}>
      <button
        tabIndex={0}
        className={styles.actionTooltip}
        data-t="more-btn"
      >
        <div className={styles.tooltip}>
          <span className={styles.tooltipText}>Mais opções</span>
          <svg
            className={styles.moreIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 24"
          >
            <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-2 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm2 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default MoreOptionsButton; 