"use client";

import { useTranslations } from "next-intl";
import { Post } from "../../../[locale]/news/types/posts";
import Link from "next/link";
import Image from "next/image";
import React from "react";

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
  post?: Post;
  hideImage?: boolean;
  loading?: boolean;
  skeletonText?: boolean;
  skeletonImage?: boolean;
}

interface PostCardSkeletonProps {
  skeletonText?: boolean;
  skeletonImage?: boolean;
}

const PostCardSkeleton: React.FC<PostCardSkeletonProps> = ({ skeletonText = true, skeletonImage = true }) => {
  return (
    <div className="w-[264px] h-auto min-h-[256px] p-2 animate-pulse">
      {skeletonImage ? (
        <div className="w-[264px] h-[148px] mb-4 bg-[#141519]" />
      ) : (
        <div className="w-[264px] h-[148px] mb-4 bg-[#23252B] flex items-center justify-center text-[#A0A0A0] text-center"></div>
      )}
      <div className="mt-2">
        {skeletonText ? (
          <>
            <div className="h-5 w-3/4 bg-[#141519] mb-2" />
            <div className="h-3 w-1/2 bg-[#141519] mb-1" />
            <div className="h-3 w-1/3 bg-[#141519]" />
          </>
        ) : (
          <>
            <div className="h-5 w-3/4 bg-[#23252B] mb-2 flex items-center pl-2 text-[#A0A0A0]"></div>
            <div className="h-3 w-1/2 bg-[#23252B] mb-1 flex items-center pl-2 text-[#A0A0A0]"></div>
            <div className="h-3 w-1/3 bg-[#23252B] flex items-center pl-2 text-[#A0A0A0]"></div>
          </>
        )}
      </div>
    </div>
  );
};

const PostCard: React.FC<PostCardProps> = ({ post, hideImage = false, loading = false, skeletonText = true, skeletonImage = true }) => {
  const t = useTranslations("Common");

  if (loading || !post) {
    return <PostCardSkeleton skeletonText={skeletonText} skeletonImage={skeletonImage} />;
  }

  return (
    <div className="w-auto lg:w-[264px] h-auto min-h-[256px] p-2 hover:bg-[#23252B]">
      <Link href={getPostUrl(post)} className="block">
        {!hideImage && (
          <Image
            src={post.cover_image}
            alt={post.title}
            width={264}
            height={148}
            className="mb-4"
          />
        )}
        
        <div>
          <h2 className="text-[16px] font-weight-700 text-[#FFFFFF] font-bold my-2">
            {post.title}
          </h2>
          <small className="text-[#A0A0A0] line-clamp-2 text-[.75rem]">{formatDate(post.created_at)}</small>
          <small className="flex items-center gap-2 text-[.75rem] text-[#A0A0A0]">{t('by')} {post.author.name}</small>
        </div>
      </Link>
    </div>
  );
};

export default PostCard; 

