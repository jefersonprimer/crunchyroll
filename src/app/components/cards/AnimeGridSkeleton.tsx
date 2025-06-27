import React from "react";

const AnimeGridSkeleton: React.FC = () => (
  <div
    className="w-[166px] h-[300px] p-2 flex flex-col justify-between relative overflow-hidden transition-all duration-200 ease-in-out text-left pointer-events-none"
  >
    <div className="w-full h-[250px] bg-[#141519] animate-pulse" />

    <div className="relative flex flex-col justify-start w-[150px] h-[58px] z-[1]">
      <div className="w-[70%] h-[18px] bg-[#141519] my-2 animate-pulse" />
      <div className="w-[40%] h-[14px] bg-[#141519] animate-pulse" />
    </div>
  </div>
);

export default AnimeGridSkeleton;
