"use client";

import { useTranslations } from "next-intl";
import { FC, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import { extractEpisodeNumber } from "../utils/utils";
import { Anime, Episode } from "../types/types";
import EpisodeHeader from "./EpisodeHeader";
import EpisodeVideoPlayer from "./EpisodeVideoPlayer";
import EpisodeSynopsis from "./EpisodeSynopsis";
import EpisodeNavigation from "./EpisodeNavigation";
import EpisodesModal from "./EpisodesModal";
import { useHistory } from "@/app/[locale]/contexts/HistoryContext";
import Loading from "@/app/[locale]/loading";

const EpisodeClient: FC = () => {
  const t = useTranslations('Watch');
  const params = useParams();
  const { publicCode, slug } = params;
  const { data, loading, error, refetch } = useQuery(GET_ANIMES);
  const [expandedSynopsis, setExpandedSynopsis] = useState(false);
  const [showEpisodesModal, setShowEpisodesModal] = useState(false);
  const { addToHistory } = useHistory();

  const anime = data?.animes?.find((anime: Anime) => 
    anime.episodes?.some((ep: Episode) => ep.publicCode === publicCode)
  );
  const currentEpisode = anime?.episodes?.find((ep: Episode) => ep.publicCode === publicCode);
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

  if (!anime) {
    return <Loading/>;
  }

  if (!currentEpisode) {
    return <div>Episódio não encontrado.</div>;
  }

  const toggleSynopsis = () => setExpandedSynopsis(!expandedSynopsis);
  const toggleEpisodesModal = () => setShowEpisodesModal(!showEpisodesModal);

  return (
    <div className="flex flex-col items-center w-[1351px] mx-auto">
      <div className="w-[1351px] h-[500px] pb-10">
        <EpisodeVideoPlayer episode={currentEpisode} />
      </div>
      <div className="w-[1050px] mb-[60px] box-border">
        <div className="flex w-full gap-8">
          <div className="flex-[2] min-w-0"> 
            <EpisodeHeader anime={anime} episode={currentEpisode} refetchEpisode={refetch} />
            <EpisodeSynopsis
              episode={currentEpisode}
              anime={anime}
              expanded={expandedSynopsis}
              onToggle={toggleSynopsis}
            />
          </div>
          <div className="flex-[1] min-w-0 md:w-full"> 
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
          currentEpisodePublicCode={currentEpisode.publicCode}
          anime={anime}
          onClose={toggleEpisodesModal}
        />
      )}
    </div>
  );
};

export default EpisodeClient; 