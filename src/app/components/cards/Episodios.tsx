import { useQuery } from '@apollo/client';
import { GET_ANIMES } from '../../../lib/queries/getAnimes';
import { Episode } from '../../../types/episode';
import { Anime } from '../../../types/anime';
import { EpisodeCard } from '../../[locale]/history/components/EpisodeCard';

interface EpisodesGrouped {
  hoje: Episode[];
  ontem: Episode[];
  anteontem: Episode[];
  proximos: Episode[];
}

interface EpisodesData {
  animes: Anime[];
}

const EpisodesPage = () => {
  const { data, loading, error } = useQuery<EpisodesData>(GET_ANIMES);

  // Pega todos os episódios de todos os animes
  const allEpisodes = data?.animes?.flatMap(anime => 
    anime.episodes.map(episode => ({ episode, anime }))
  ) || [];

  // Função para agrupar os episódios
  const groupEpisodesByDate = (): EpisodesGrouped => {
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);

    const episodesGrouped: EpisodesGrouped = {
      hoje: [],
      ontem: [],
      anteontem: [],
      proximos: [],
    };

    allEpisodes.forEach(({ episode }) => {
      // Parse the release date
      const releaseDate = new Date(episode.releaseDate);
      releaseDate.setHours(0, 0, 0, 0);

      console.log('Comparing dates:', {
        episodeTitle: episode.title,
        releaseDate: releaseDate.toISOString(),
        today: today.toISOString(),
        isToday: releaseDate.getTime() === today.getTime(),
        isFuture: releaseDate > today
      });

      if (releaseDate.getTime() === today.getTime()) {
        episodesGrouped.hoje.push(episode);
      } else if (releaseDate.getTime() === yesterday.getTime()) {
        episodesGrouped.ontem.push(episode);
      } else if (releaseDate.getTime() === twoDaysAgo.getTime()) {
        episodesGrouped.anteontem.push(episode);
      } else if (releaseDate > today) {
        episodesGrouped.proximos.push(episode);
      }
    });

    // Sort upcoming episodes by release date
    episodesGrouped.proximos.sort((a, b) => {
      const dateA = new Date(a.releaseDate);
      const dateB = new Date(b.releaseDate);
      return dateA.getTime() - dateB.getTime();
    });

    return episodesGrouped;
  };

  // Helper to find anime for an episode
  const findAnimeForEpisode = (episode: Episode): Anime => {
    const found = allEpisodes.find(ea => ea.episode.id === episode.id);
    if (!found) throw new Error('Anime not found for episode: ' + episode.id);
    return found.anime;
  };

  const episodesGrouped = groupEpisodesByDate();

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  if (error) {
    return <div>Erro ao carregar episódios: {error.message}</div>;
  }

  return (
    <div className="w-[92%] mx-auto">
    {/* Header da página de episódios */}
    <header className="flex items-center justify-between">
      <div className="flex justify-center items-center">
        <span>
          <svg 
            className="fill-white w-6 h-6" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            data-t="curated-carousel-svg" 
            aria-labelledby="curated-carousel-svg" 
            aria-hidden="true" 
            role="img"
          >
            <title id="curated-carousel-svg">Carrossel Curado</title>
            <path d="M22 1.2v17h-5.5L12 22.8l-4.5-4.6H2v-17h20zm-2 1.9H4v13h4.4l3.6 3.8 3.6-3.7H20V3.1zM9.5 5c.3-.1.7-.1 1 .1L16 8.9c.3.1.5.5.5.8 0 .3-.1.6-.4.8l-5.5 3.8c-.2.1-.4.2-.6.2-.2 0-.4 0-.5-.1-.3-.2-.5-.5-.5-.9V5.9c0-.4.2-.7.5-.9zM11 7.8v3.8l2.7-1.9L11 7.8z"></path>
          </svg>
        </span>
        <h2 className="text-white text-[26px] ml-2">Novos Lançamentos</h2>
      </div>
      <span>
        <a href="/simulcastcalendar" className="no-underline">
          <div className="flex justify-center items-center">
            <h2 className="text-[#A0A0A0] text-sm hover:text-white">VER CALENDÁRIO DE LANÇAMENTOS</h2>
            <span>
              <svg 
                className="fill-white w-6 h-6" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                data-t="angle-right-svg" 
                aria-labelledby="angle-svg" 
                aria-hidden="true" 
                role="img"
              >
                <title id="angle-svg">Próximo</title>
                <path d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z"></path>
              </svg>
            </span>
          </div>
        </a>
      </span>
    </header>
  
    {/* Seção de Episódios - Hoje */}
    {episodesGrouped.hoje.length > 0 ? (
      <div>
        <h3 className="text-red-500">Hoje</h3>
        <div className="grid grid-cols-3 gap-5 p-5">
          {episodesGrouped.hoje.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} anime={findAnimeForEpisode(episode)} />
          ))}
        </div>
      </div>
    ) : (
      <div>
        <h3>Hoje</h3>
        <p>Nenhum episódio disponível.</p>
      </div>
    )}
  
    {/* Seção de Episódios - Ontem */}
    {episodesGrouped.ontem.length > 0 ? (
      <div>
        <h3 className="text-red-500">Ontem</h3>
        <div className="grid grid-cols-3 gap-5 p-5">
          {episodesGrouped.ontem.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} anime={findAnimeForEpisode(episode)} />
          ))}
        </div>
      </div>
    ) : (
      <div>
        <h3>Ontem</h3>
        <p>Nenhum episódio disponível.</p>
      </div>
    )}
  
    {/* Seção de Episódios - Anteontem */}
    {episodesGrouped.anteontem.length > 0 ? (
      <div>
        <h3 className="text-red-500">Anteontem</h3>
        <div className="grid grid-cols-3 gap-5 p-5">
          {episodesGrouped.anteontem.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} anime={findAnimeForEpisode(episode)} />
          ))}
        </div>
      </div>
    ) : (
      <div>
        <h3>Anteontem</h3>
        <p>Nenhum episódio disponível.</p>
      </div>
    )}
  
    {/* Seção de Episódios - Próximos */}
    {episodesGrouped.proximos.length > 0 ? (
      <div>
        <h3 className="text-red-500">Próximos Lançamentos</h3>
        <div className="grid grid-cols-3 gap-5 p-5">
          {episodesGrouped.proximos.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} anime={findAnimeForEpisode(episode)} />
          ))}
        </div>
      </div>
    ) : (
      <div>
        <h3>Próximos Lançamentos</h3>
        <p>Nenhum episódio disponível.</p>
      </div>
    )}
  
    {/* Botão para carregar mais episódios */}
    <div className="text-center mt-5">
      <button className="w-full bg-[#213944] text-white border-none py-2.5 px-5 text-base cursor-pointer hover:bg-[#005bb5]">
        <span className="text-white">VER MAIS</span>
      </button>
    </div>
  </div>
  );
};

export default EpisodesPage;


