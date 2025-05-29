import styles from './Episodios.module.css';
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from '../../../lib/queries/getAnimes';
import { Episode } from '../../../types/episode';
import EpisodeCard from './EpisodeCard';

interface EpisodesGrouped {
  hoje: Episode[];
  ontem: Episode[];
  anteontem: Episode[];
  proximos: Episode[];
}

interface EpisodesData {
  animes: {
    episodes: Episode[];
  }[];
}

const EpisodesPage = () => {
  const { data, loading, error } = useQuery<EpisodesData>(GET_ANIMES);

  // Pega todos os episódios de todos os animes
  const allEpisodes = data?.animes?.flatMap(anime => anime.episodes) || [];

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

    allEpisodes.forEach((episode) => {
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

  const episodesGrouped = groupEpisodesByDate();

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  if (error) {
    return <div>Erro ao carregar episódios: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      {/* Header da página de episódios */}
      <header className={styles.header}>
        <div className={styles.seeRealese}>
          <span><svg className={styles.angle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="curated-carousel-svg" aria-labelledby="curated-carousel-svg" aria-hidden="true" role="img"><title id="curated-carousel-svg">Carrossel Curado</title><path d="M22 1.2v17h-5.5L12 22.8l-4.5-4.6H2v-17h20zm-2 1.9H4v13h4.4l3.6 3.8 3.6-3.7H20V3.1zM9.5 5c.3-.1.7-.1 1 .1L16 8.9c.3.1.5.5.5.8 0 .3-.1.6-.4.8l-5.5 3.8c-.2.1-.4.2-.6.2-.2 0-.4 0-.5-.1-.3-.2-.5-.5-.5-.9V5.9c0-.4.2-.7.5-.9zM11 7.8v3.8l2.7-1.9L11 7.8z"></path></svg></span>
          <h2 className={styles.titleRealese}> Novos Lançamentos</h2>
        </div>
        <span>
          <a href="/calendar" className={styles.seeAll}>
            <div className={styles.seeRealese}>
              <h2 className={styles.seeCalendar}>VER CALENDÁRIO DE LANÇAMENTOS</h2>
              <span><svg className={styles.angle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="angle-right-svg" aria-labelledby="angle-svg" aria-hidden="true" role="img"><title id="angle-svg">Próximo</title><path d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z"></path></svg></span>
            </div>
          </a>
        </span>
      </header>

      {/* Seção de Episódios - Hoje */}
      {episodesGrouped.hoje.length > 0 ? (
        <div>
          <h3 className={styles.titleSection}>Hoje</h3>
          <div className={styles.episodesContainer}>
            {episodesGrouped.hoje.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </div>
      ) : (
        <div><h3>Hoje</h3><p>Nenhum episódio disponível.</p></div>
      )}

      {/* Seção de Episódios - Ontem */}
      {episodesGrouped.ontem.length > 0 ? (
        <div>
          <h3 className={styles.titleSection}>Ontem</h3>
          <div className={styles.episodesContainer}>
            {episodesGrouped.ontem.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </div>
      ) : (
        <div><h3>Ontem</h3><p>Nenhum episódio disponível.</p></div>
      )}

      {/* Seção de Episódios - Anteontem */}
      {episodesGrouped.anteontem.length > 0 ? (
        <div>
          <h3 className={styles.titleSection}>Anteontem</h3>
          <div className={styles.episodesContainer}>
            {episodesGrouped.anteontem.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </div>
      ) : (
        <div><h3>Anteontem</h3><p>Nenhum episódio disponível.</p></div>
      )}

      {/* Seção de Episódios - Próximos */}
      {episodesGrouped.proximos.length > 0 ? (
        <div>
          <h3 className={styles.titleSection}>Próximos Lançamentos</h3>
          <div className={styles.episodesContainer}>
            {episodesGrouped.proximos.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </div>
      ) : (
        <div><h3>Próximos Lançamentos</h3><p>Nenhum episódio disponível.</p></div>
      )}

      {/* Botão para carregar mais episódios */}
      <div className={styles.loadMore}>
        <button><span className={styles.titleSeeMore}>VER MAIS</span></button>
      </div>
    </div>
  );
};

export default EpisodesPage;
