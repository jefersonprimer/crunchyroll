'use client';

import useFetchPosts from './hooks/useFetchPosts';
import Banner from './components/Banner';
import NewsGrid from './components/post/NewsGrid';
import ArticlesGrid from './components/post/ArticlesGrid';
import Destaques from './components/post/Destaques';
import AdBanner from './components/post/AdBanner';
import AnimeSeriesCard from './components/AnimeSeriesCard';
import QuizzesAndTests from './components/post/QuizzesAndTests';
import Guides from './components/post/Guides';
import { useTheme } from './context/ThemeContext';
import CustomTagPanel from './components/CustomTagPanel';

const HomePage = () => {
  const { isDark } = useTheme(); 

  const { posts, loading, error } = useFetchPosts();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <p className="text-center text-lg">Carregando posts...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    <div className="relative">
      
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Banner
          src="https://a.storyblok.com/f/178900/2304x154/02c4ee539d/pt_sololevelings2_cr_desktop_2304x154.png/m/filters:quality(95)format(webp)"
          alt="Solo Leveling"
          width={2304}
          height={154}
        />
        
        <div className="grid grid-cols-1 md:col-span-1 lg:grid-cols-12 gap-4 mb-8">
          <div className="sm:col-span-1 md:col-span-1 lg:col-span-3">
            <NewsGrid posts={posts} />
          </div>
          <div className="sm:col-span-1 md:col-span-1 lg:col-span-6">
            <Destaques posts={posts} />
          </div>
          <div className="sm:col-span-1 md:col-span-1 lg:col-span-3">
            <ArticlesGrid posts={posts} />
          </div>
        </div>

        <Banner
          src="https://a.storyblok.com/f/178900/2304x154/27d59539f6/q12025_crnews_bannerplacements-pt-br-cr_desktop_2304x154.png/m/filters:quality(95)format(webp)"
          alt="Temporada de janeiro de 2025"
          width={2304}
          height={154}
        />
        <AdBanner />
      </div>
      <AnimeSeriesCard />
      <QuizzesAndTests />
      <CustomTagPanel />
      <Guides />
      
      {/* Botão Voltar ao Topo (no final da página, centralizado) */}
      <div className="flex justify-center my-8">
        <button
          onClick={scrollToTop}
          className={`px-8 text-[#008382] border ${isDark ? 'border-[#008382]' : 'border-[#008382] hover:text-[#FFFFFF]'}  px-4 py-2 hover:bg-[#008382] hover:text-[#000]`}
        >
          <span>Voltar para o topo</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;