import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';

import WatchlistPageClient from "./WatchlistPageClient";
import { useTranslations } from "next-intl";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale });
  return {
    title: t('WatchlistPage.title'),
    description: t('WatchlistPage.description'),
  };
}

const WatchlistPage = () => {
  const t = useTranslations();

  return (
    <div>
      <Header/>
        <WatchlistPageClient/>
      <Footer/>
    </div>
  );
};

export default WatchlistPage;