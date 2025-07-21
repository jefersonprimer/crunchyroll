import { GET_ANIMES } from "@/lib/queries/getAnimes";
import client from "@/lib/apollo-client";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import AlphabeticalClientWrapper from "./components/AlphabeticalClientWrapper";

async function getMessages(currentLocale: string) {
  try {
    const messages = await import(`../../../../locale/${currentLocale}.json`);
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
    title: messages.alphabetical?.title,
    description: messages.alphabetical?.subtitle,
  };
}

export default async function AlphabeticalPage({ params, searchParams }: { params: { locale: string }, searchParams: { lang?: string, letter?: string } }) {
  const { locale } = await params;
  const { lang, letter } = await searchParams;

  const { data } = await client.query({ query: GET_ANIMES });
  const animes = data?.animes || [];

  // Filtro de áudio via query param
  const audioFilter = lang || "subtitled_dubbed";
  let filteredAnimes = animes;
  if (audioFilter !== "subtitled_dubbed") {
    filteredAnimes = animes.filter((anime: any) => {
      if (audioFilter === "dubbed") {
        return anime.audioType === "dubbed" || anime.audioType === "subtitled_dubbed";
      }
      return anime.audioType === audioFilter;
    });
  }

  // Filtro de letra via query param
  const activeLetter = letter || "#";
  let letterFilteredAnimes = filteredAnimes;
  if (activeLetter !== "#") {
    letterFilteredAnimes = filteredAnimes.filter((anime: any) =>
      anime.name[0].toUpperCase() === activeLetter.toUpperCase()
    );
  }

  const messages = await getMessages(locale);

  return (
    <>
      <Header/>
      <AlphabeticalClientWrapper animes={letterFilteredAnimes} messages={messages.alphabetical} audioFilter={audioFilter} activeLetter={activeLetter} />
      <Footer/>
    </>
  );
}