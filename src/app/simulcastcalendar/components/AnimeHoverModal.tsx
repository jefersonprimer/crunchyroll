import { Anime } from '@/types/anime';
import { useEffect, useRef, useState } from 'react';

interface AnimeHoverModalProps {
  anime: Anime;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const AnimeHoverModal = ({ anime, triggerRef }: AnimeHoverModalProps) => {
  const [position, setPosition] = useState<'left' | 'right'>('right');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (triggerRef.current && modalRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const spaceOnRight = windowWidth - triggerRect.right;
        const modalWidth = 300; // Approximate modal width

        setPosition(spaceOnRight >= modalWidth ? 'right' : 'left');
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [triggerRef]);

  return (
    <div
      ref={modalRef}
      className={`absolute z-50 bg-white shadow-lg rounded-lg p-4 w-[300px] ${
        position === 'right' ? 'left-full ml-2' : 'right-full mr-2'
      }`}
    >
      <div className="flex flex-col gap-3">
        <img
          src={anime.imagePoster}
          alt={anime.name}
          className="w-full aspect-[2/3] object-cover rounded-lg"
        />
        <h3 className="text-lg font-bold text-[#363231]">{anime.name}</h3>
        {anime.synopsis && (
          <p className="text-sm text-gray-600 line-clamp-3">{anime.synopsis}</p>
        )}
        {anime.rating && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Rating:</span>
            <span className="text-sm">{anime.rating}</span>
          </div>
        )}
        {anime.episodes && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Episódios:</span>
            <span className="text-sm">{anime.episodes.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeHoverModal; 