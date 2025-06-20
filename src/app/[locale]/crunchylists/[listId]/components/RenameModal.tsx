import React from 'react';
import ReactDOM from 'react-dom';
import { useTranslations } from 'next-intl';
import styles from '../ListDetails.module.css';

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRename: () => void;
  newListName: string;
  onNameChange: (name: string) => void;
}

const RenameModal: React.FC<RenameModalProps> = ({
  isOpen,
  onClose,
  onRename,
  newListName,
  onNameChange
}) => {
    const t = useTranslations('ListDetails');

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.tilte}>{t('renameTitle')}</h2>
        <div className={styles.inputSrcDiv}>
          <label className={styles.label}>{t('listName')}</label>
          <input
            type="text"
            value={newListName}
            onChange={(e) => onNameChange(e.target.value)}
            className={styles.inputSrc}
          />
        </div>
        <div className={styles.modalActions}>
          <button onClick={onRename} className={styles.saveButton}>{t('renameButton')}</button>
          <button onClick={onClose} className={styles.cancelButton}>{t('cancelButton')}</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RenameModal; 