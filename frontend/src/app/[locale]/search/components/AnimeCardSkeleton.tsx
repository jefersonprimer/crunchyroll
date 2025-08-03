import React from 'react';

const AnimeCardSkeleton: React.FC = () => {
  return (
    <div className="cursor-pointer group list-none w-full transition-transform duration-300 ease-in-out relative">
      <div className="no-underline text-inherit block relative">
        <div>
          <div className="relative w-full h-[280px] overflow-hidden">
            {/* Skeleton for image */}
            <div className="w-full h-[70%] bg-[#141519]"></div>
            
            {/* Skeleton for text content */}
            <div className="mt-2.5 py-1 transition-opacity duration-300 ease-in-out relative z-10">
              {/* Skeleton for title */}
              <div className="bg-[#141519] h-6 w-3/4 mb-2"></div>
              {/* Skeleton for audio type */}
              <div className="bg-[#141519] h-4 w-16"></div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default AnimeCardSkeleton; 