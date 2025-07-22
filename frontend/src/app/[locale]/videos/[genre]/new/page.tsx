import { getTranslations } from 'next-intl/server';
import { GET_ANIMES } from '@/lib/queries/getAnimes';
import client from '@/lib/apollo-client';
import GenreNewClient from './GenreNewClient';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

const genreMapping: Record<string, { en: string; pt: string }> = {
  action: { en: "Action", pt: "Ação" },
  adventure: { en: "Adventure", pt: "Aventura" },
  comedy: { en: "Comedy", pt: "Comédia" },
  drama: { en: "Drama", pt: "Drama" },
  fantasy: { en: "Fantasy", pt: "Fantasia" },
  historical: { en: "Historical", pt: "Histórico" },
  "post-apocalyptic": { en: "Post-Apocalyptic", pt: "Pós-Apocalíptico" },
  "sci-fi": { en: "Sci-Fi", pt: "Ficção Científica" },
  supernatural: { en: "Supernatural", pt: "Sobrenatural" },
  thriller: { en: "Thriller", pt: "Suspense" },
  romance: { en: "Romance", pt: "Romance" },
  shonen: { en: "Shonen", pt: "Shonen" },
  shojo: { en: "Shojo", pt: "Shojo" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; genre: string }> }) {
  const { locale, genre } = await params;
  const t = await getTranslations({ locale, namespace: 'genre' });
  const genreInfo = genreMapping[genre];
  if (!genreInfo) {
    return {
      title: t('genreNotFound', { genre }),
      description: t('genreNotFound', { genre }),
    };
  }
  return {
    title: t('genreNewPage.title', { genre: genreInfo.pt }),
    description: t('genreNewPage.title', { genre: genreInfo.pt }),
  };
}

export default async function GenreNewPage(props: { params: { locale: string; genre: string }, searchParams: { lang?: string } }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { genre } = params;
  const { lang } = searchParams;
  const genreInfo = genreMapping[genre];
  let animes = [];
  let error = null;
  try {
    const { data } = await client.query({ query: GET_ANIMES });
    animes = data?.animes || [];
  } catch (e: any) {
    error = e;
  }
  const audioFilter = (lang || 'subtitled_dubbed') as 'subtitled_dubbed' | 'subtitled' | 'dubbed';
  return (
    <>
      <Header/>
        <GenreNewClient animes={animes} genre={genre} genreInfo={genreInfo} error={error} audioFilter={audioFilter} />
      <Footer/>
    </>
  );
}
