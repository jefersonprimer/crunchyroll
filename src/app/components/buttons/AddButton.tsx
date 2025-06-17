import React from 'react';
import styles from './AddButton.module.css';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <div className={styles.tooltip} onClick={onClick}>
      <span className={styles.tooltipText}>Adicionar à CrunchyLista</span>
      <svg
        className={styles.iconPlus}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-labelledby="add-svg"
        role="img"
      >
        <path d="M13 3v8h8v2h-8v8h-2v-8H3v-2h8V3z" />
      </svg>
    </div>
  );
};

export default AddButton; 

