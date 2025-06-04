import { useTheme } from '../../context/ThemeContext';
import useFetchPosts from '../../hooks/useFetchPosts';
import Link from 'next/link';

const SearchLatestNews = () => {
  const { isDark } = useTheme();
  const { posts, loading, error } = useFetchPosts();

  if (loading) return <p className={`${isDark ? "text-white" : "text-black"}`}>Carregando...</p>;
  if (error) return <p className={`${isDark ? "text-white" : "text-red-500"}`}>{error}</p>;

  // Get the 5 most recent posts
  const latestPosts = posts.slice(0, 5);

  return (
    <div className={`pl-4 border-l-1 border-[#4A4E58] ${isDark ? "bg-[#000000]" : "bg-white"}`}>
      <div
      className={` border-b-4 ${
        isDark ? "border-[#F47521]" : "border-[#F47521]"
      } flex justify-between items-center`}
      >
        <h1 className={`text-3xl ${isDark ? "text-white" : "text-black"} my-4`}>
          Últimas Notícias
        </h1>
      </div>
      <div className="space-y-4 py-6">
        {latestPosts.map((post) => (
          <Link 
            href={`/news/${post.id}`} 
            key={post.id}
            className={`block hover:opacity-80 transition-opacity pb-4 border-b border-[#4A4E58] last:border-b-0 ${isDark ? "text-white" : "text-black"}`}
          >
            <h3 className="font-medium mb-2">{post.title}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags?.map((tag) => (
                <span key={tag}   className={`${
                  isDark ? "bg-[#2B2D32] text-[#2ABDBB] hover:bg-[#000] hover:border" : "bg-[#F0EDE7] text-[#2ABDBB] hover:bg-[#fff] hover:border"
                }  text-xs font-semibold px-2 py-1 my-1 rounded-[10px]`}
              >{tag}</span>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <p className={`text-base ${isDark ? "text-[#00787E]" : "text-[#00787E]"} mt-2`}>
              {post.author.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link
          href="/news/latest"
          className={`text-[#008382] border ${isDark ? 'border-[#008382]' : 'border-[#008382]'} px-4 py-2 hover:bg-[#008382] hover:text-[#000] inline-block`}
        >
          Todas as Notícias
        </Link>
      </div>
    </div>
  );
};

export default SearchLatestNews; 