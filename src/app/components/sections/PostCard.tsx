"use client";

import { Post } from "../../news/types/posts";
import Link from "next/link";

// Função para formatar a data no formato "Mar 17, 2025"
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Sao_Paulo'
  };
  
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate.replace(', 2025,', ', 2025') + ' GMT-3';
};

// Função para formatar a URL do post
const getPostUrl = (post: Post) => {
  if (!post.created_at) {
    console.warn('Post date is undefined:', post);
    return `/news/${post.category.toLowerCase()}/${post.slug}`;
  }

  try {
    // Formato da data: "YYYY-MM-DD"
    const date = new Date(post.created_at);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `/news/${post.category.toLowerCase()}/${year}/${month}/${day}/${post.slug}`;
  } catch (error) {
    console.error('Error parsing post date:', error);
    return `/news/${post.category.toLowerCase()}/${post.slug}`;
  }
};

interface PostCardProps {
  post: Post;
  hideImage?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, hideImage = false }) => {
  return (
    <div className="w-[264px] h-auto min-h-[256px] p-2 hover:bg-[#23252B]">
      <Link href={getPostUrl(post)} className="block">
        {!hideImage && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-[264px] h-[148px] mb-4"
          />
        )}
        
        <div>
          <h2 className="text-[16px] font-weight-700 text-[#FFFFFF] font-bold my-2">
            {post.title}
          </h2>
          <small className="text-[#A0A0A0] line-clamp-2 text-[.75rem]">{formatDate(post.created_at)}</small>
          <small className="flex items-center gap-2 text-[.75rem] text-[#A0A0A0]">por {post.author.name}</small>
        </div>
      </Link>
    </div>
  );
};

export default PostCard; 