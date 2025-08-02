import React from 'react';

export const EpisodeSearchCardSkeleton: React.FC = () => {
  return (
    <div className="block w-full p-4 animate-pulse">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-24 h-16 bg-[#141519]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-1">
            <div className="w-24 h-3 bg-[#141519]" />
          </div>
          <div className="mt-2">
            <div className="w-full h-3 bg-[#141519] mb-1" />
            <div className="w-2/3 h-3 bg-[#141519]" />
          </div>
        </div>
      </div>
    </div>
  );
}; 