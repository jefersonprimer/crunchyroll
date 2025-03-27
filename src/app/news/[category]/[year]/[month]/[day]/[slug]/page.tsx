'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Post } from '../../../../../types/posts';
import Link from 'next/link';
import PostCardRows from '../../../../../components/post/PostCardRows'; // Importando o componente de card
import { useTheme } from "../../../../../context/ThemeContext"; // Importando o hook useTheme

export default function PostDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [recommendedPosts, setRecommendedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isDark } = useTheme(); // Pegando o estado do tema

  // Captura os parâmetros da URL
  const { category, year, month, day, slug } = params;

  useEffect(() => {
    async function fetchPostAndRecommendations() {
      try {
        setLoading(true);
        console.log("Fetching with params:", { category, year, month, day, slug });

        // Busca todos os posts
        const response = await axios.get('https://blog-backend-ten-plum.vercel.app/api/posts');
        const allPosts = response.data;
        
        // Busca primária: tenta encontrar por combinação exata dos parâmetros
        let foundPost = allPosts.find((p: Post) => {
          // Converte a string de data em componentes
          const dateStr = p.date; // Formato "YYYY-MM-DD"
          const [postYear, postMonth, postDay] = dateStr.split('-');
          
          // Comparação com todos os parâmetros
          const categoryMatch = p.category.toLowerCase() === category?.toLowerCase();
          const yearMatch = postYear === year;
          const monthMatch = postMonth === month;
          const dayMatch = postDay === day;
          const slugMatch = p.slug === slug;
          
          return categoryMatch && yearMatch && monthMatch && dayMatch && slugMatch;
        });

        // Se não encontrou, tenta uma busca apenas pelo slug
        if (!foundPost) {
          console.log("First search failed, trying by slug only");
          foundPost = allPosts.find((p: Post) => p.slug === slug);
        }

        // Se ainda não encontrou, tenta pelo ID em slugs que têm o formato "ID-resto-do-slug"
        if (!foundPost && slug && slug.includes('-')) {
          console.log("Second search failed, trying by ID in slug");
          const potentialId = slug.split('-')[0];
          if (!isNaN(Number(potentialId))) {
            foundPost = allPosts.find((p: Post) => p.id === Number(potentialId));
          }
        }

        if (foundPost) {
          console.log("Found post:", foundPost);
          setPost(foundPost);
          
          // Encontrar posts recomendados baseados na categoria
          const recommendations = allPosts
            .filter((p: Post) => 
              p.category.toLowerCase() === foundPost.category.toLowerCase() && 
              p.id !== foundPost.id
            )
            .slice(0, 3); // Limitar a 3 recomendações
            
          setRecommendedPosts(recommendations);
        } else {
          setError('Post não encontrado com os parâmetros fornecidos.');
        }
      } catch (err) {
        console.error("Erro ao buscar o post:", err);
        setError(`Erro ao carregar o post: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPostAndRecommendations();
    } else {
      setError('Slug não fornecido na URL.');
      setLoading(false);
    }
  }, [category, year, month, day, slug]);

  if (loading) {
    return <div className={`container mx-auto p-4 ${isDark ? "bg-[#333333] text-white" : "bg-white text-black"}`}>Carregando...</div>;
  }

  if (error) {
    return <div className={`container mx-auto p-4 text-red-500 ${isDark ? "bg-[#333333]" : "bg-white"}`}>{error}</div>;
  }

  if (!post) {
    return <div className={`container mx-auto p-4 ${isDark ? "bg-[#333333] text-white" : "bg-white text-black"}`}>Post não encontrado.</div>;
  }

  return (
    <div className={`container mx-auto p-4 max-w-[1200px] ${isDark ? "bg-[#000000] text-white" : "bg-white text-black"}`}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Coluna Principal com o Conteúdo do Post */}
        <div className="w-full lg:w-3/4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-8">
          {/* Tags - sempre flex wrap */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className={`${
                  isDark ? "bg-[#2B2D32] text-[#2ABDBB] hover:bg-[#000] hover:border" : "bg-[#F0EDE7] text-[#2ABDBB] hover:bg-[#fff] hover:border"
                }  text-xs font-semibold px-2 py-1 my-1 rounded-[10px]`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Date - abaixo em mobile, ao lado em md+ */}
          <p className={`text-sm ${isDark ? "text-[#A4A5A7]" : "text-[#4A4E58]"}`}>
            {new Date(post.date).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>

          {/* Título e Summary */}
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-[#000000]"}`}>{post.title}</h1>
          <h3 className={`text-xl mb-2 ${isDark ? "text-white" : "text-[#000000]"}`}>{post.summary}</h3>

          {/* Author and Image */}
          <div className={`border-b ${isDark ? "border-[#4A4E58]" : "border-[#00787E]"} mt-6 pb-4 flex items-center gap-4`}>
            <img className='w-[50px] h-[50px] rounded-[50%]' src="https://a.storyblok.com/f/178900/871x707/14240ab4f1/jose-sassi-avatar.jpg/m/filters:quality(95)format(webp)" alt="" />
            <p className="text-sm">
              <span className={`font-medium ${isDark ? "text-[#A4A5A7]" : "text-[#00787E]"}`}>{post.author}</span>
            </p>
          </div>

          {/* Conteúdo */}
          <div className={`prose max-w-none mb-8 ${isDark ? "text-white" : "text-[#000000]"} border-b ${isDark ? "border-[#4A4E58]" : "border-[#00787E]"}`}>
            <p>{post.content}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4 mt-[60px]">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`border ${isDark ? "border-[#4A4E58] text-[#A4A5A7]" : "border-[#F0EDE7] text-[#298382]"} text-xs font-semibold px-2 py-1 rounded-[10px]`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>      
          
          {/* Imagens */}
          {post.images && post.images.length > 0 && (
            <div className="space-y-4 mb-8">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${post.title} - Imagem ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow"
                />
              ))}
            </div>
          )}
          
          {/* Vídeos */}
          {post.videos && post.videos.length > 0 && (
            <div className="space-y-6 mb-8">
              {post.videos.map((video, index) => (
                <div key={index} className="aspect-video">
                  <iframe
                    src={video}
                    title={`${post.title} - Vídeo ${index + 1}`}
                    className="w-full h-full rounded-lg shadow"
                    allowFullScreen
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Coluna de Recomendações */}
        <div className="w-full lg:w-2/5">
          <div className={`lg:sticky lg:top-4 ${isDark ? "bg-[#000000] border-[#4A4E58]" : "bg-white border-[#000]"} lg:border-l p-2`}>
            <h3 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-[#298382]"} border-b-2 pb-2 border-[#F47521]`}>
              Leia também
            </h3>
            
            {recommendedPosts.length > 0 ? (
              <div>
                {recommendedPosts.map((recPost) => (
                  <PostCardRows key={recPost.id} post={recPost} />
                ))}
              </div>
            ) : (
              <p className={`${isDark ? "text-[#A4A5A7]" : "text-gray-600"}`}>Nenhuma recomendação disponível.</p>
            )}
            
            {/* Ver mais link */}
            <div className="mt-4 text-center">
              <Link 
                href={`/news/${post.category.toLowerCase()}`}
                className={`inline-block px-4 py-2 ${isDark ? "bg-[#4A4E58] text-[#A4A5A7]" : "bg-[#F0EDE7] text-[#298382]"} font-medium rounded-lg hover:bg-[#29B9B7] hover:text-white transition-colors`}
              >
                Ver mais {post.category}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}