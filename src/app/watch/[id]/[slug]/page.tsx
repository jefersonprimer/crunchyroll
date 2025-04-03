"use client";

import { FC, useState } from "react";
import { useParams } from "next/navigation";
import useFetchAnimes from "../../../hooks/useFetchAnimes";
import useFetchEpisodes from "../../../hooks/useFetchEpisodes";
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

const EpisodePage: FC = () => {
  const { id, slug } = useParams();
  const [expandedSynopsis, setExpandedSynopsis] = useState(false);
  const [showEpisodesModal, setShowEpisodesModal] = useState(false);

  const { animes, loading: animesLoading } = useFetchAnimes();
  const { episodes, loading: episodesLoading } = useFetchEpisodes();

  if (!id || !slug || animesLoading || episodesLoading) {
    return <div className={styles.loadingContainer}>Carregando...</div>;
  }

  const currentEpisode = episodes.find((ep: Episode) => ep.id === id);
  if (!currentEpisode) {
    return (
      <div className={styles.errorContainer}>Episódio não encontrado.</div>
    );
  }

  const anime = animes.find(
    (anime: Anime) => anime.id === currentEpisode.animeId
  );
  if (!anime) {
    return <div className={styles.errorContainer}>Anime não encontrado.</div>;
  }

  const allEpisodes = episodes
    .filter((ep: Episode) => ep.animeId === anime.id)
    .sort((a: Episode, b: Episode) => {
      const aNum = extractEpisodeNumber(a.title);
      const bNum = extractEpisodeNumber(b.title);
      return aNum - bNum;
    });

  const toggleSynopsis = () => setExpandedSynopsis(!expandedSynopsis);
  const toggleEpisodesModal = () => setShowEpisodesModal(!showEpisodesModal);

  return (
    <div className={styles.episodePage}>
      <ClientMetadata
        title={`Assistir ${anime.name} - ${currentEpisode.title}`}
        description={`Assista ${anime.name}: ${anime.synopsis.substring(
          0,
          160
        )}...`}
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
          anime={anime} // Adicionando o prop anime aqui
          onClose={toggleEpisodesModal}
        />
      )}
    </div>
  );
};

export default EpisodePage;
