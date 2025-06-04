"use client";

import useFetchPosts from "../../hooks/useFetchPosts";
import { useTheme } from "../../context/ThemeContext";
import Link from "next/link";
import FilteredPostGrid from "../cards/FilteredPostGrid";

const SpecialArticles = () => {
  const { posts, loading, error } = useFetchPosts();
  const { isDark } = useTheme();

  if (loading) {
    return <p className="text-center text-lg">Carregando posts...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  // Get latest post from each category
  const categories = ["announcements", "latest", "guides", "quizzes", "seasonal-lineup"];
  const latestPosts = categories.map(category => {
    const categoryPosts = posts.filter(post => post.category === category);
    return categoryPosts.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];
  }).filter(Boolean);

  return (
    <div className={`relative w-full ${isDark ? "bg-[#000000]" : "bg-[#FFFCF6]"}`}>
      <div
        className={`w-full border-b-4 mb-1 ${
          isDark ? "border-[#F47521]" : "border-[#F47521]"
        } flex justify-between items-center`}
      >
        <h1 className={`text-3xl font-weight-700 ${isDark ? "text-[#FFFFFF]" : "text-[#000000]"} mb-2`}>
          Artigos Especiais
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        {/* Primeiros 3 posts com imagem */}
        {latestPosts.slice(0, 3).map((post, index) => (
          <div key={post.id}>
            <FilteredPostGrid posts={[post]} category={post.category} limit={1} />
          </div>
        ))}

        {/* Últimos 2 posts sem imagem */}
        {latestPosts.slice(3, 5).map((post, index) => (
          <div key={post.id}>
            <FilteredPostGrid posts={[post]} category={post.category} limit={1} hideImage={true} />
          </div>
        ))}

        {/* Botão "Todos os artigos especiais" */}
        <div className="text-center mt-4">
          <Link
            href="/news/special"
            className={`text-[#008382] border ${isDark ? 'border-[#008382]' : 'border-[#008382]'} px-4 py-2 hover:bg-[#008382] hover:text-[#000] inline-block`}
          >
            Todos os artigos especiais
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialArticles; 