
"use client"

import VideoPlayer from "./VideoPlayer";
import { Episode } from "@/types/episode";

interface EpisodeVideoPlayerProps {
  episode: Episode;
}

const EpisodeVideoPlayer: React.FC<EpisodeVideoPlayerProps> = ({ episode }) => {

  const getPreviewSpriteUrl = () => {
    if (typeof episode.thumbnail === 'string' || !episode.thumbnail) return '';
    return (episode.thumbnail as { previewSpriteUrl?: string }).previewSpriteUrl || '';
  };

  const getMainThumbnailUrl = () => {
    if (typeof episode.thumbnail === 'string' || !episode.thumbnail) return '';
    return (episode.thumbnail as { mainThumbnailUrl?: string }).mainThumbnailUrl || '';
  };

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: episode.videoUrl,
      type: 'video/mp4'
    }],
    poster: episode.image
  };


  const handlePlayerReady = (player: any) => {
    // Você pode acessar o player aqui se precisar
    console.log('Player Video.js pronto para interagir!', player);
  };

  return (
    <div>
      <VideoPlayer
        options={videoJsOptions}
        onReady={handlePlayerReady}
        vttThumbnailsUrl={getPreviewSpriteUrl()}
        mainThumbnailUrl={getMainThumbnailUrl()}
        subtitles={episode.subtitles?.map(sub => ({
          label: sub.language,
          url: sub.subtitleUrl
        }))}
      />
    </div>
  );
};

export default EpisodeVideoPlayer;

