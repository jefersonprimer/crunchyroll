"use client";

import { FC, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import { extractEpisodeNumber } from "./utils/utils";
import { Anime, Episode } from "./types/types";
import EpisodeHeader from "./components/EpisodeHeader";
import EpisodeVideoPlayer from "./components/EpisodeVideoPlayer";
import EpisodeSynopsis from "./components/EpisodeSynopsis";
import EpisodeNavigation from "./components/EpisodeNavigation";
import EpisodesModal from "./components/EpisodesModal";
import styles from "./styles.module.css";
import { ClientMetadata } from "@/app/series/[id]/[slug]/components/ClientMetadata";
import { FavoritesProvider } from "@/app/contexts/FavoritesContext";
import { useHistory } from "@/app/contexts/HistoryContext";

const EpisodePage: FC = () => {
  const params = useParams();
  const { id, slug } = params;
  const { data, loading, error } = useQuery(GET_ANIMES);
  const [expandedSynopsis, setExpandedSynopsis] = useState(false);
  const [showEpisodesModal, setShowEpisodesModal] = useState(false);
  const { addToHistory } = useHistory();

  const anime = data?.animes?.find((anime: Anime) => 
    anime.episodes?.some((ep: Episode) => ep.id === id)
  );
  const currentEpisode = anime?.episodes?.find((ep: Episode) => ep.id === id);
  const allEpisodes = anime?.episodes ? [...anime.episodes].sort((a: Episode, b: Episode) => {
    const aNum = extractEpisodeNumber(a.title);
    const bNum = extractEpisodeNumber(b.title);
    return aNum - bNum;
  }) : [];

  useEffect(() => {
    if (currentEpisode && anime) {
      addToHistory(currentEpisode, anime);
    }
  }, [currentEpisode, anime, addToHistory]);

  if (!id || !slug || loading) {
    return <div className={styles.loadingContainer}>Carregando...</div>;
  }

  if (!anime) {
    return <div className={styles.errorContainer}>Anime não encontrado.</div>;
  }

  if (!currentEpisode) {
    return <div className={styles.errorContainer}>Episódio não encontrado.</div>;
  }

  const toggleSynopsis = () => setExpandedSynopsis(!expandedSynopsis);
  const toggleEpisodesModal = () => setShowEpisodesModal(!showEpisodesModal);

  return (
    <div className={styles.episodePage}>
      <ClientMetadata
        title={`Assistir ${anime.name} - ${currentEpisode.title}`}
        description={`Assista ${anime.name}: ${anime.synopsis?.substring(0, 160) || ''}...`}
      />

      <div className={styles.videoPlayerContainer}>
        <EpisodeVideoPlayer episode={currentEpisode} />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.contentColumns}>
          <div className={styles.leftColumn}>
            <FavoritesProvider>
              <EpisodeHeader anime={anime} episode={currentEpisode} />
            </FavoritesProvider>

            <EpisodeSynopsis
              episode={currentEpisode}
              anime={anime}
              expanded={expandedSynopsis}
              onToggle={toggleSynopsis}
            />
          </div>

          <div className={styles.rightColumn}>
            <EpisodeNavigation
              currentEpisode={currentEpisode}
              allEpisodes={allEpisodes}
              anime={anime}
              onShowAllEpisodes={toggleEpisodesModal}
            />
          </div>
        </div>
      </div>

      {showEpisodesModal && (
        <EpisodesModal
          episodes={allEpisodes}
          currentEpisodeId={currentEpisode.id}
          anime={anime}
          onClose={toggleEpisodesModal}
        />
      )}
    </div>
  );
};

export default EpisodePage;
