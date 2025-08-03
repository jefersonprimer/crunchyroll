import { Metadata } from "next";
import EpisodeClient from "./components/EpisodeClient";
import client from "@/lib/apollo-client";
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import { Anime } from "@/types/anime";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";

interface PageParams {
  params: { publicCode: string; slug: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { publicCode } = await params;
  const { data } = await client.query({ query: GET_ANIMES });
  
  const foundAnime = data.animes.find((anime: Anime) => 
    anime.episodes?.some((ep: any) => ep.publicCode === publicCode)
  );
  
  if (!foundAnime) {
    return {
      title: "Episódio não encontrado",
      description: "Nenhum episódio encontrado para esse código.",
    };
  }

  const currentEpisode = foundAnime.episodes?.find((ep: any) => ep.publicCode === publicCode);
  
  if (!currentEpisode) {
    return {
      title: "Episódio não encontrado",
      description: "Nenhum episódio encontrado para esse código.",
    };
  }

  return {
    title: `Assistir ${foundAnime.name} - ${currentEpisode.title}`,
    description: `Assistir ${foundAnime.name}: ${foundAnime.synopsis?.substring(0, 160) || ""}...`,
  };
}

export default async function Page(props: any) {
  // Aguardar searchParams se necessário
  const searchParams = await props.searchParams;
  
  return (
    <>
      <Header />
      <EpisodeClient />
      <Footer />
    </>
  );
}
