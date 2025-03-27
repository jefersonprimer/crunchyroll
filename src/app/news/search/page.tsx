'use client';

import { useState } from 'react';
import useFetchPosts from '../hooks/useFetchPosts';
import PostCardRows from '../components/post/PostCardRows';
import { useTheme } from "@/app/context/ThemeContext"; // Importando o hook useTheme

const SearchPage = () => {
  const { posts, loading, error } = useFetchPosts();
  const [searchQuery, setSearchQuery] = useState('');
  const { isDark } = useTheme(); // Pegando o estado do tema

  const filteredPosts = searchQuery
    ? posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (loading) return <p className={`${isDark ? "text-white" : "text-black"}`}>Carregando...</p>;
  if (error) return <p className={`${isDark ? "text-white" : "text-red-500"}`}>{error}</p>;

  return (
    <div className={`p-4 w-[1200px] mx-auto ${isDark ? "bg-[#000000] text-white" : "bg-white text-black"}`}>
      <h1 className="text-2xl mb-4">Mostrando resultados para:</h1>
      <input
        type="text"
        placeholder="Buscar"
        className={`w-[400px] text-3xl p-2 border-b ${isDark ? "border-white" : "border-[#000000]"} mb-4 focus:outline-none focus:ring-0 ${isDark ? "bg-[#000000] text-white" : "bg-white text-black"}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCardRows key={post.id} post={post} />)
        ) : (
          searchQuery && <p>Nenhum post encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;