import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import PreferencesPageClient from "./PreferencesPageClient";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: { params: { locale: string } }) {
  const params = await props.params;
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: 'Preferences - Account Settings - Crunchyroll',
    description: 'Preferences - Account Settings - Crunchyroll'
  };
}

export default function PreferencesPage() {

  return (
    <>
        <Header/>
            <PreferencesPageClient/>
        <Footer/>
    </>
  );
}