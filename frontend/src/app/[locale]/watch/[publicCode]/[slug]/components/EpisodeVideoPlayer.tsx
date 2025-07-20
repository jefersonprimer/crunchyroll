import { Episode } from "@/types/episode";
import VideoPlayer from "@/app/[locale]/watch/[publicCode]/[slug]/components/VideoPlayer";

interface EpisodeVideoPlayerProps {
  episode: Episode;
}

const EpisodeVideoPlayer: React.FC<EpisodeVideoPlayerProps> = ({ episode }) => {
  return (
    <div className="w-full mb-8">
      <div className="w-full h-[450px] relative">
        <VideoPlayer videoUrl={episode.videoUrl} posterImage={episode.image} />
      </div>
    </div>
  );
};

export default EpisodeVideoPlayer;