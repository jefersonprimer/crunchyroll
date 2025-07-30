import { Metadata } from "next";
import SeriesClient from "./components/SeriesClient";
import client from "@/lib/apollo-client";
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import { Anime } from "@/types/anime";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";

interface PageParams {
  params: { slug: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await client.query({ query: GET_ANIMES });
  const foundAnime = await data.animes.find((anime: Anime) => anime.slug === slug);
  if (!foundAnime) {
    return {
      title: "Anime não encontrado",
      description: "Nenhum anime encontrado para esse slug.",
    };
  }
  return {
    title: `Assistir ${foundAnime.name}`,
    description: `Assistir ${foundAnime.synopsis?.substring(0, 160) || ""}...`,
  };
}

export default async function Page(props: any) {
  // Aguardar searchParams se necessário
  const searchParams = await props.searchParams;
  
  return (
    <>
      <Header />
      <SeriesClient />
      <Footer />
    </>
  );
}
