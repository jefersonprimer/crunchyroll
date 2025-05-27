import styles from './AnonymousUserModal.module.css';

interface AnonymousUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnonymousUserModal({ isOpen, onClose }: AnonymousUserModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.userMenu}>
          <div className={styles.userMenuScrollable}>
            <div className={styles.userMenuSection}>
              <a 
                href="/register" 
                className={styles.userMenuItem}
                tabIndex={0}
              >
                <div className={styles.itemInfo}>
                  <h5 className={styles.itemTitle}>Criar Conta</h5>
                  <div className={styles.itemDescription}>
                    <p>Cadastre-se de graça ou torne-se Premium.</p>
                  </div>
                </div>
              </a>

              <a 
                href="/login" 
                className={styles.userMenuItem}
                tabIndex={0}
              >
                <div className={styles.itemInfo}>
                  <h5 className={styles.itemTitle}>Login</h5>
                  <div className={styles.itemDescription}>
                    <p>Já é membro da Crunchyroll? Seja bem-vindo.</p>
                  </div>
                </div>
              </a>

              <a 
                href="/pt-br/redeem" 
                className={styles.userMenuItem}
                tabIndex={0}
              >
                <div className={styles.itemInfo}>
                  <h5 className={styles.itemTitle}>Cartão de Presente</h5>
                  <div className={styles.itemDescription}>
                    <p>Você tem um cartão de presente? Resgate aqui.</p>
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
                    TESTE GRATUITO DE 7 DIAS
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