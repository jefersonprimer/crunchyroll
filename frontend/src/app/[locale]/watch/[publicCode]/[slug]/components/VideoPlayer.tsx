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
      className="relative w-full h-[450px] bg-black"
      ref={containerRef}
    >
      {showPreview && posterImage && (
        <>
          <img 
            src={posterImage} 
            alt="Video preview" 
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-full flex items-center justify-center z-10 cursor-pointer"
            onClick={handlePlayClick}
          >
            <svg
              className="w-20 h-20 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-t="play-filled-svg"
              aria-labelledby="play-filled-svg"
              aria-hidden="true"
              role="img"
            >
              <path d="m4 2 16 10L4 22z" />
            </svg>
          </div>
        </>
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