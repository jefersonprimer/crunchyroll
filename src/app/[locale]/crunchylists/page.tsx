'use client';

import React, { useState, useEffect } from 'react';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import { ListsProvider } from '../contexts/ListsContext';
import CrunchyList from './CrunchyList';
import styles from './styles.module.css';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const CrunchyListPage = () => {
  const t = useTranslations('Crunchylist');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case 'fila':
        router.push('/watchlist');
        break;
      case 'historico':
        router.push('/history');
        break;
      default:
        break;
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <FavoritesProvider>
      <ListsProvider>
        <Header/>
        <div className={styles.appLayoutContent}>
          <div className={styles.pageWrapper}>
            <div className={styles.contentWrapper}>
              <div className={styles.myListsHeader}>
                <h1 className={styles.heading}>
                  <svg className={styles.iconBookMark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="watchlist-svg" aria-labelledby="watchlist-svg" aria-hidden="true" role="img">
                    <path d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z"></path>
                  </svg>
                  <span className={styles.title}>{t('title')}</span>
                </h1>
                <div className={styles.tabs}>
                  <div className={styles.tabsContentWrapper}>
                    <div role="tablist" className={styles.tabsScroller}>
                      <a
                        onClick={() => handleTabClick('fila')}
                        className={styles.tabsItem}
                      >
                        <span className={styles.tabsItemText}>{t('queue')}</span>
                      </a>
                      <a
                        className={`${styles.tabsItem} ${styles.active}`}
                      >
                        <span className={styles.tabsItemText}>{t('crunchylists')}</span>
                      </a>
                      <a
                        onClick={() => handleTabClick('historico')}
                        className={styles.tabsItem}
                      >
                        <span className={styles.tabsItemText}>{t('history')}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.watchlistBody}>
                <div className={styles.ercWatchlist}>
                  <CrunchyList />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </ListsProvider>
    </FavoritesProvider>
  );
};

export default CrunchyListPage;


