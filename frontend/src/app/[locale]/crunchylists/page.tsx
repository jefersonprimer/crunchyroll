
import { Metadata } from 'next';
import CrunchyListPageClient from './CrunchyListPageClient';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Crie e Gerencie Crunchylistas | Crunchyroll',
  description: 'Crie e Gerencie Crunchylistas | Crunchyroll',
};

const CrunchyListsPage = () => {
  return (
    <div>
      <Header/>
        <CrunchyListPageClient />
      <Footer/>
    </div>
  );
}

export default CrunchyListsPage;