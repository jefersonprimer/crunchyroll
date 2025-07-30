import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { getTranslations } from 'next-intl/server';
import ListDetailClient from './components/ListDetailClient';

export async function generateMetadata(props: { params: { locale: string } }) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale });
  return {
    title: "Gerencie sua Crunchylista | Crunchyroll",
    description: "Gerencie sua Crunchylista | Crunchyroll"
  };
}

export default function ListDetail() {
  
  return (
    <>
      <Header />
        <ListDetailClient/>
      <Footer />
    </>
  );
}
