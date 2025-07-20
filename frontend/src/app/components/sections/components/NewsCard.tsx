import Link from "next/link";
import Image from "next/image";
import { Post } from "../../../[locale]/news/types/posts";
import React from "react";
import { useTranslations } from "next-intl";

interface NewsCardProps {
  post?: Post;
  loading?: boolean;
  skeletonText?: boolean;
  skeletonImage?: boolean;
}

const NewsCardSkeleton: React.FC<{ skeletonText?: boolean; skeletonImage?: boolean }> = ({ skeletonText = true, skeletonImage = true }) => {
  return (
    <div className="flex gap-4 p-2 lg:w-[850px] animate-pulse">
      <div>
        {skeletonImage ? (
          <div className="w-[138px] h-[78px] bg-[#141519]" />
        ) : (
          <div className="w-[138px] h-[78px] bg-[#23252B] flex items-center justify-center text-[#A0A0A0] text-center"></div>
        )}
      </div>
      <div className="flex flex-col justify-center w-full">
        {skeletonText ? (
          <>
            <div className="h-5 w-5/6 bg-[#141519] mb-2" />
            <div className="h-3 w-2/3 bg-[#141519] mb-1" />
            <div className="h-3 w-1/2 bg-[#141519]" />
          </>
        ) : (
          <>
            <div className="h-5 w-5/6 bg-[#23252B] mb-2 flex items-center pl-2 text-[#A0A0A0]"></div>
            <div className="h-3 w-2/3 bg-[#23252B] mb-1 flex items-center pl-2 text-[#A0A0A0]"></div>
            <div className="h-3 w-1/2 bg-[#23252B] flex items-center pl-2 text-[#A0A0A0]"></div>
          </>
        )}
      </div>
    </div>
  );
};

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

const NewsCard: React.FC<NewsCardProps> = ({ post, loading = false, skeletonText = true, skeletonImage = true }) => {
  const t = useTranslations('Common');

  if (loading || !post) {
    return <NewsCardSkeleton skeletonText={skeletonText} skeletonImage={skeletonImage} />;
  }

  return (
    <Link href={getPostUrl(post)}>
      <div className="flex gap-4 hover:bg-[#23252B] p-2 transition-colors duration-200 lg:w-[850px]">
        <div className="w-[138px]">
          <Image
            src={post.cover_image}
            alt={post.title}
            width={138}
            height={78}
            className="object-cover"
          />
        </div>
        <div className="w-auto lg:w-[712px] h-[78px]">
          <h3 className="font-weigth-500 text-[1rem] text-[#FFFFFF] transition-colors duration-200 line-clamp-3">
            {post.title}
          </h3>
          <small className="text-[#A0A0A0] line-clamp-2 text-[.75rem]">{formatDate(post.created_at)}</small>
          <small className="flex items-center gap-2 text-[.75rem] text-[#A0A0A0]">{t('by')} {post.author.name}</small>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard; 

