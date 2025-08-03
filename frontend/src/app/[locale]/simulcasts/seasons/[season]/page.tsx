import Header from "@/app/components/layout/Header";
import SeasonClient from "./SeasonClient";
import Footer from "@/app/components/layout/Footer";

async function getMessages(currentLocale: string) {
  try {
    const messages = await import(`@/locale/${currentLocale}.json`);
    return messages.default || messages;
  } catch (error) {
    console.error(`Erro ao carregar mensagens para o locale ${currentLocale}:`, error);
    return {};
  }
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  return {
    title: messages.simulcasts?.season?.title,
    description: messages.simulcasts?.season?.subtitle,
  };
}

export default async function SeasonPage({ params }: { params: { locale: string; season: string } }) {
  const { locale, season } = await params;
  const messages = await getMessages(locale);
  return (
    <>
      <Header/>
        <SeasonClient params={{ season }} messages={messages} />
      <Footer/>
    </>
  );
} 