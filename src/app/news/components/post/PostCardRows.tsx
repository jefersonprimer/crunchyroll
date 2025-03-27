"use client";

import { useTheme } from "../../context/ThemeContext"; // Importando o hook useTheme
import { Post } from "../../types/posts";
import Link from "next/link";

type PostCardRowsProps = {
  post: Post;
};

// Função para formatar a data no formato "Mar 17, 2025"
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

// Função para formatar a URL do post
const getPostUrl = (post: Post) => {
  const [year, month, day] = post.date.split("-");
  return `/news/${post.category.toLowerCase()}/${year}/${month}/${day}/${post.slug}`;
};

const PostCardRows: React.FC<PostCardRowsProps> = ({ post }) => {
  const { isDark } = useTheme(); // Pegando o estado do tema

  return (
    <div className={`border-b ${isDark ? "border-[#F47521]" : "border-[#29B9B7]"} px-3 py-4`}>
      <Link href={getPostUrl(post)} className="block">
        <div className="flex items-center gap-4">
          {/* Imagem à esquerda */}
          <img
            src="https://www.intoxianime.com/wp-content/uploads/2024/11/81sWQXTqCxL-tile-520x246.jpg"
            alt={post.title}
            className="w-32 h-20 object-cover"
          />

          {/* Conteúdo à direita */}
          <div className="flex-1">
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
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}>
              {formatDate(post.date)}
            </p>
            <h2 className={`text-lg ${isDark ? "text-white" : "text-[#000]"} font-bold mt-1 hover:text-[#00787E] transition-colors`}>
              {post.title}
            </h2>
            <p className={`text-base ${isDark ? "text-[#00787E]" : "text-[#00787E]"} mt-1`}>
              {post.author}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCardRows;
