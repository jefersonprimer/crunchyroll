"use client";

import useFetchPosts from "../../hooks/useFetchPosts";
import { useTheme } from "../../context/ThemeContext"; 
import Destaques from "./Destaques";
import FilteredPostGrid from "../cards/FilteredPostGrid";
import ArticlesGrid from "./ArticlesGrid";
import Link from "next/link";
import FilteredPostGridRow from "../cards/FilteredPostGrid";

const AdBanner = () => {
  const { posts, loading, error } = useFetchPosts();
  const { isDark } = useTheme(); // Pegando o estado do tema

  if (loading) {
    return <p className="text-center text-lg">Carregando posts...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  // Filtra apenas posts da categoria "anuncio"
  const anuncios = posts.filter((post) => post.category === "anuncios");

  return (
    <div className={`relative w-full max-w-[1200px] mx-auto mt-[30px]  ${isDark ? 'bg-[#000000]' : 'bg-[#FFFCF6]'}`}>
      <div className={`w-full border-b-4 ${isDark ? 'border-[#F47521]' : 'border-[#F47521]'} flex justify-between items-center`}>
        <h1 className={`text-3xl ${isDark ? 'text-white' : 'text-black'} my-4`}>Anúncios</h1>
        <div className={`text-[#008382] border ${isDark ? 'border-[#008382]' : 'border-[#008382]'}  px-4 py-2 hover:bg-[#008382] hover:text-[#000]`}>
          <Link href="/news/announcements">Todos os anúncios</Link>
        </div>
      </div>

      {/* Grid responsiva */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 mb-8">
        {/* Destaques (Primeiros 2 anúncios) */}
        <div className="sm:col-span-1 lg:col-span-5">
          <FilteredPostGridRow posts={anuncios} category="anuncios" limit={1} />
        </div>

        {/* Grid de anúncios (Próximos 2 anúncios) */}
        <div className="sm:col-span-1 lg:col-span-3 lg:border-x-2 border-[#A0A0A0]"> 
          <FilteredPostGrid posts={anuncios} category="anuncios" limit={1} />
        </div>

        {/* Segundo Grid de anúncios (Últimos 2 anúncios) */}
        <div className="sm:col-span-2 lg:col-span-4">
          <FilteredPostGrid posts={anuncios} category="anuncios" limit={2} />
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
