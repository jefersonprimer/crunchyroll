import styles from './AnonymousUserModal.module.css';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface AnonymousUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnonymousUserModal({ isOpen, onClose }: AnonymousUserModalProps) {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('anonymousUserModal');

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.userMenu}>
          <div className={styles.userMenuScrollable}>
            <div className={styles.userMenuSection}>
              <a 
                href={`/${locale}/register`}
                className={styles.userMenuItem}
                tabIndex={0}
              >
                <div className={styles.itemInfo}>
                  <h5 className={styles.itemTitle}>{t('createAccount.title')}</h5>
                  <div className={styles.itemDescription}>
                    <p>{t('createAccount.description')}</p>
                  </div>
                </div>
              </a>

              <a 
                href={`/${locale}/login`}
                className={styles.userMenuItem}
                tabIndex={0}
              >
                <div className={styles.itemInfo}>
                  <h5 className={styles.itemTitle}>{t('login.title')}</h5>
                  <div className={styles.itemDescription}>
                    <p>{t('login.description')}</p>
                  </div>
                </div>
              </a>

              <a 
                href={`/${locale}/redeem`}
                className={styles.userMenuItem}
                tabIndex={0}
              >
                <div className={styles.itemInfo}>
                  <h5 className={styles.itemTitle}>{t('giftCard.title')}</h5>
                  <div className={styles.itemDescription}>
                    <p>{t('giftCard.description')}</p>
                  </div>
                </div>
              </a>
            </div>

            <div className={styles.userMenuSection}>
              <div className={styles.upsellButton}>
                <a 
                  href="https://www.crunchyroll.com/premium?referrer=newweb_organic_acct_menu&return_url=https%3A%2F%2Fwww.crunchyroll.com%2Fpt-br%2F#plans"
                  className={styles.premiumButton}
                  tabIndex={0}
                >
                  <span className={styles.buttonContent}>
                    <svg className={styles.premiumIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M18.188 17l1.667-5.606-4.26 1.864L12 7.688l-3.596 5.57-4.259-1.864L5.812 17h12.376zm-14.08 1.285L1.614 9.9a1 1 0 0 1 1.36-1.2l4.673 2.045 3.512-5.442a1 1 0 0 1 1.68 0l3.514 5.442 4.674-2.046a1 1 0 0 1 1.36 1.201l-2.494 8.386a1 1 0 0 1-.959.715H5.067a1 1 0 0 1-.959-.715z"></path>
                    </svg>
                    {t('freeTrial')}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

