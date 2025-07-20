"use client";

import useFetchPosts from "../../[locale]/news/hooks/useFetchPosts";
import PostCard from "./components/PostCard";
import NewsCard from "./components/NewsCard";
import { Post } from "../../[locale]/news/types/posts";
import Link from "next/link";
import Loading from "@/app/[locale]/loading";
import { useOnScreen } from "@/app/[locale]/hooks/useOnScreen";
import React, { useMemo } from "react";
import { useTranslations } from "next-intl";

const PostCardOnScreen = ({ post }: { post: Post }) => {
  const { ref, isIntersecting } = useOnScreen({ threshold: 0.1 });

  return (
    <div ref={ref}>
      <PostCard post={post} loading={!isIntersecting} />
    </div>
  );
};

const NewsCardOnScreen = ({ post }: { post: Post }) => {
  const { ref, isIntersecting } = useOnScreen({ threshold: 0.1 });

  return (
    <div ref={ref}>
      <NewsCard post={post} loading={!isIntersecting} />
    </div>
  );
};

const NewsSection = () => {
  const t = useTranslations('NewsSection');
  const { posts, loading, error } = useFetchPosts();

  // Filter posts by category
  const announcements = useMemo(() =>
    posts
      .filter((post: Post) => post.category.toLowerCase() === 'quizzes')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 2)
  , [posts]);

  const latestPosts = useMemo(() =>
    posts
      .filter((post: Post) => post.category.toLowerCase() === 'quizzes')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 6)
  , [posts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#FAB219]">
      <svg 
        className="absolute inset-0 w-full h-full" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 2714 1028" 
        data-t="news-and-editorial-orange-svg" 
        aria-hidden="true" 
        role="img"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="news-and-editorial-orange-a" x1="88.541244%" x2="44.480997%" y1="44.884972%" y2="53.355131%">
            <stop offset="0" stopColor="#fab818"></stop>
            <stop offset=".313151595" stopColor="#f47521"></stop>
            <stop offset=".38184216" stopColor="#f7981c"></stop>
            <stop offset="1" stopColor="#ef4323"></stop>
          </linearGradient>
          <linearGradient id="news-and-editorial-orange-b" x1="165.938971%" x2="50%" y1="-5.012384%" y2="70.373779%">
            <stop offset="0" stopColor="#fab818" stopOpacity="0"></stop>
            <stop offset="1" stopColor="#f47521"></stop>
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
          <path fill="url(#news-and-editorial-orange-a)" d="m0 756.312326c788.339995 0 1338.16992-310.929357 1688.88392-756.312326h1024.8272c-574.94747 640.943454-1505.63179 1086.14556-2713.71112 756.312326z"></path>
          <path fill="url(#news-and-editorial-orange-a)" d="m0 271.687674c788.339995 0 1338.16992 310.929357 1688.88392 756.312326h1024.8272c-574.94747-640.943454-1505.63179-1086.14556-2713.71112-756.312326z" transform="translate(0, 1028) scale(1, -1)"></path>
          <circle cx="500" cy="1028" fill="url(#news-and-editorial-orange-b)" fillOpacity=".7" r="500" transform="scale(1, -1) translate(0, -1028)"></circle>
          <circle cx="500" cy="0" fill="url(#news-and-editorial-orange-b)" fillOpacity=".7" r="500"></circle>
        </g>
      </svg>
      
      <div className="relative container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto bg-[#000000] bg-opacity-90 p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span>
                  <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="crunchyroll-news-svg"
                  aria-hidden="true"
                  role="img"
                  fill="white"
                  >
                    <path d="M14.223 5.143c2.325 0 3.539 3.32 3.539 6.568 0 3.248-1.215 6.548-3.58 6.516a2.307 2.307 0 01-.745-.132h-.063l-1.35-.48-2.638 2.195-6.281-2.195v-3.157l-.838-.296-.026-.013C2.064 14.055 1 13.42 1 11.73 1 9.886 2.268 9.23 2.268 9.23l.136-.062 10.972-3.902h.104a2.21 2.21 0 01.744-.122h-.001zm-9.025 10.01v1.021l3.717 1.328.859-.684-4.576-1.665zm8.952-7.956c-.388 0-1.434 1.553-1.434 4.514 0 2.961 1.068 4.514 1.435 4.514l.073-.01.042-.005c.426-.102 1.402-1.63 1.402-4.499 0-2.973-1.132-4.515-1.518-4.515v.001zm-2.963 1.051l-7.936 2.788c-.029.04-.15.233-.15.694 0 .514.171.624.171.624l7.915 2.799-.117-.421a11.859 11.859 0 01-.375-3.02 11.831 11.831 0 01.492-3.464zm7.99 9.103l2.825 3.037-1.415 1.517-2.823-3.036 1.412-1.52v.002zM23 10.88v2.147h-3.996V10.88H23zM20.586 2L22 3.519l-2.826 3.037-1.412-1.519L20.586 2z">
                    </path>
                  </svg>
                </span>
                <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
              </div>
              <div className="flex items-center gap-1 text-[#A0A0A0] hover:text-[#FFFFFF]">
                <Link href="/news" className=" font-bold text-sm uppercase">{t('link')}</Link>
                <span>
                <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="angle-right-svg"
                aria-hidden="true"
                role="img"
                fill="currentColor"
                >
                <path d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z"></path></svg>
                </span>
              </div>
            </div>
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[263px_850px]">
            {/* Announcements Column */}
            <div >
              <h4 className="text-[1rem] font-weigth-500 text-[#FFFFFF] px-2">
                Principais
              </h4>
              <div className="flex gap-1 md:grid md:grid-cols-1">
                {announcements.map((post: Post) => (
                  <div className="w-1/2 md:w-full" key={post.id}>
                    <PostCardOnScreen post={post} />
                  </div>
                ))}
              </div>
            </div>

            {/* Latest News Column */}
            <div>
              <h4 className="text-[1rem] font-weigth-500 text-[#FFFFFF] px-2">
                Últimas
              </h4>
              <div className="grid grid-cols-1">
                {latestPosts.map((post: Post) => (
                  <NewsCardOnScreen key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;