""

import React, { useState, useRef } from "react";
import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  videoUrl: string;
  posterImage?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, posterImage }) => {
  const [showPreview, setShowPreview] = useState(!!posterImage);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlayClick = () => {
    setShowPreview(false);
    // Forçar recarregamento do iframe
    if (iframeRef.current) {
      iframeRef.current.src = videoUrl;
    }
  };

  return (
    <div className={styles.videoContainer} ref={containerRef}>
      {showPreview && posterImage && (
        <div className={styles.previewContainer} onClick={handlePlayClick}>
          <img
            src={posterImage}
            alt="Preview"
            className={styles.previewImage}
          />
          <button className={styles.playButton} aria-label="Play video">
            ▶
          </button>
        </div>
      )}
      {/* O erro está aqui - não devemos usar string vazia "" como src */}
      {!showPreview && (
        <iframe
          ref={iframeRef}
          className={styles.videoIframe}
          src={videoUrl}
          frameBorder="0"
          scrolling="no"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video Player"
        />
      )}
    </div>
  );
};

export default VideoPlayer;
