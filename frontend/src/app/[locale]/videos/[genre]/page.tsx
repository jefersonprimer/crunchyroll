import Header from "@/app/components/layout/Header";
import GenrePageClient from "./components/GenrePageClient";
import Footer from "@/app/components/layout/Footer";

async function getMessages(currentLocale: string) {
  try {
    const messages = await import(`../../../../locale/${currentLocale}.json`);
    return messages.default || messages;
  } catch (error) {
    console.error(`Erro ao carregar mensagens para o locale ${currentLocale}:`, error);
    return {};
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string, genre: string }> }) {
  const { locale, genre } = await params;
  const messages = await getMessages(locale);

  // Busca a tradução do gênero, se não existir usa o próprio nome do gênero
  const genreTranslation = messages.genres?.[genre] || genre;

  // Função para deixar a primeira letra maiúscula
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return {
    title: `${capitalize(genreTranslation)} - Animes, Séries e Filmes - Crunchyroll`,
    description: messages.genre?.subtitle || "Calendário de Transmissão Simultânea",
  };
}

export default async function GenrePage({ params }: { params: Promise<{ locale: string, genre: string }> }) {
  const { locale, genre } = await params;
  const messages = await getMessages(locale);
  return(
    <>
      <Header/>
        <GenrePageClient genre={genre} messages={messages} />
      <Footer/>
    </>
  );
}