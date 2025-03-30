"use client";

import { FC, useState } from "react";
import { useParams } from "next/navigation";
import useFetchAnimes from "../../../hooks/useFetchAnimes";
import useFetchEpisodes from "../../../hooks/useFetchEpisodes";
import { extractEpisodeNumber, safeJoin } from "./utils/utils";
import { Anime, Episode, EpisodePageProps } from "./types/types";
import EpisodeHeader from "./components/EpisodeHeader";
import EpisodeVideoPlayer from "./components/EpisodeVideoPlayer";
import EpisodeSynopsis from "./components/EpisodeSynopsis";
import EpisodeNavigation from "./components/EpisodeNavigation";
import EpisodesModal from "./components/EpisodesModal";
import styles from "./styles.module.css";

const EpisodePage: FC = () => {
  const { id, slug } = useParams();
  const [expandedSynopsis, setExpandedSynopsis] = useState(false);
  const [showEpisodesModal, setShowEpisodesModal] = useState(false);

  const { animes, loading: animesLoading } = useFetchAnimes();
  const { episodes, loading: episodesLoading } = useFetchEpisodes();

  if (!id || !slug || animesLoading || episodesLoading) {
    return <div className={styles.loadingContainer}>Carregando...</div>;
  }

  const episode = episodes.find((ep: Episode) => ep.id === id);
  if (!episode) {
    return (
      <div className={styles.errorContainer}>Episódio não encontrado.</div>
    );
  }

  const anime = animes.find((anime: Anime) => anime.id === episode.animeId);
  if (!anime) {
    return <div className={styles.errorContainer}>Anime não encontrado.</div>;
  }

  const animeEpisodes = episodes
    .filter((ep: Episode) => ep.animeId === anime.id)
    .sort((a: Episode, b: Episode) => {
      const aNum = extractEpisodeNumber(a.title);
      const bNum = extractEpisodeNumber(b.title);
      return aNum - bNum;
    });

  const episodeIndex = animeEpisodes.findIndex(
    (ep: Episode) => ep.id === episode.id
  );

  const prevEpisode = episodeIndex > 0 ? animeEpisodes[episodeIndex - 1] : null;
  const nextEpisode =
    episodeIndex < animeEpisodes.length - 1
      ? animeEpisodes[episodeIndex + 1]
      : null;

  const toggleSynopsis = () => setExpandedSynopsis(!expandedSynopsis);
  const toggleEpisodesModal = () => setShowEpisodesModal(!showEpisodesModal);

  return (
    <div className={styles.episodePage}>
      <EpisodeVideoPlayer episode={episode} />

      <div className={styles.contentColumns}>
        <div className={styles.leftColumn}>
          <EpisodeHeader anime={anime} episode={episode} />

          <EpisodeSynopsis
            episode={episode}
            anime={anime}
            expanded={expandedSynopsis}
            onToggle={toggleSynopsis}
          />
        </div>

        <div className={styles.rightColumn}>
          <EpisodeNavigation
            prevEpisode={prevEpisode}
            nextEpisode={nextEpisode}
            onShowAllEpisodes={toggleEpisodesModal}
          />
        </div>
      </div>

      {showEpisodesModal && (
        <EpisodesModal
          episodes={animeEpisodes}
          currentEpisodeId={episode.id}
          onClose={toggleEpisodesModal}
        />
      )}
    </div>
  );
};

export default EpisodePage;
