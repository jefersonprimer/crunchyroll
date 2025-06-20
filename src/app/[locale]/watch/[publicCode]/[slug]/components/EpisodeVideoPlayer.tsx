import { Episode } from "@/types/episode";
import styles from "./EpisodeVideoPlayer.module.css";
import VideoPlayer from "@/app/[locale]/watch/[publicCode]/[slug]/components/VideoPlayer";

interface EpisodeVideoPlayerProps {
  episode: Episode;
}

const EpisodeVideoPlayer: React.FC<EpisodeVideoPlayerProps> = ({ episode }) => {
  return (
    <div className={styles.videoPlayerContainer}>
      <div className={styles.videoWrapper}>
        <VideoPlayer videoUrl={episode.videoUrl} posterImage={episode.image} />
      </div>
    </div>
  );
};

export default EpisodeVideoPlayer;
