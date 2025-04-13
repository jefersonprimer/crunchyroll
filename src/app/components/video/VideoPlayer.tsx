import React, { useState, useRef } from "react";

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
    if (iframeRef.current) {
      iframeRef.current.src = videoUrl;
    }
  };

  return (
    <div
      className="relative w-full h-0 pb-[56.25%] bg-black"
      ref={containerRef}
    >
      {showPreview && posterImage && (
        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer"
          onClick={handlePlayClick}
        >
          <img
            src={posterImage}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            className="absolute w-20 h-20 flex items-center justify-center bg-black bg-opacity-70 text-white text-3xl rounded-full transition-transform duration-200 hover:scale-110 hover:bg-white hover:bg-opacity-20"
            aria-label="Play video"
          >
            ▶
          </button>
        </div>
      )}
      {!showPreview && (
        <iframe
          ref={iframeRef}
          className="absolute top-0 left-0 w-full h-full border-none"
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
