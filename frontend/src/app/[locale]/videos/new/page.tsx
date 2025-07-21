import { GET_LATEST_RELEASES } from "@/lib/queries/getLatestReleases";
import client from "@/lib/apollo-client";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import AudioDropdown from "./components/AudioDropdown";
import SortDropdown from "./components/SortDropdown";
import AnimeGrid from "../../../components/cards/AnimeGrid";

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
    title: messages.newReleases?.title,
    description: messages.newReleases?.subtitle,
  };
}

export default async function NewReleasesPage({ params, searchParams }: { params: { locale: string }, searchParams: { lang?: string } }) {
  const { data } = await client.query({ query: GET_LATEST_RELEASES });
  const animes = data?.latestReleases || [];

  // Filtro de áudio via query param
  const { lang } = await searchParams;
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

  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <>
      <Header/>
      <div className="w-full py-15 flex flex-col items-center">
        <div className="w-4/5 px-[22px] flex justify-between items-center mb-8 relative">
          <h1 className="text-[1.7rem] font-medium font-lato p-0 m-0">
            {messages.newReleases?.titlePage}
          </h1>
          <div className="flex items-center">
            <SortDropdown />
            <AudioDropdown audioFilter={audioFilter} />
          </div>
        </div>
        <div className="w-4/5 flex justify-center mx-auto flex-col items-center gap-4">
          <h1 className="m-0 p-0 pl-5 text-2xl font-medium font-lato text-left w-full">
            {messages.newReleases?.subtitlePage}
          </h1>
          <div>
            <AnimeGrid animes={filteredAnimes} />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}