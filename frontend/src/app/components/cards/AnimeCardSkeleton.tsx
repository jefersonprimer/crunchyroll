// components/skeletons.tsx

export const ImageSkeleton: React.FC = () => (
  <div className="w-[220.59px] h-[330.89px] object-cover mb-3 bg-[#141519] bg-[length:200%_100%] animate-[loading_1.5s_infinite]" />
);

export const NameSkeleton: React.FC = () => (
  <div
    className="mt-2 mb-2 pt-[10px] w-[70%] h-[20px] text-[14px] font-bold truncate overflow-hidden text-ellipsis bg-[#141519] bg-[length:200%_100%] animate-[loading_1.5s_infinite]"
  />
);

export const AudioTypeSkeleton: React.FC = () => (
  <div
    className="pt-[10px] w-[40%] h-[16px] text-[12px] m-0 bg-[#141519] bg-[length:200%_100%] animate-[loading_1.5s_infinite]"
  />
);

export const AnimeCardSkeleton: React.FC = () => (
  <div className="w-[250.59px] h-[436.89px] flex justify-center items-center mx-auto hover:w-[236.59px] hover:h-[422.89px]">
    <div>
      <ImageSkeleton />
      <NameSkeleton />
      <AudioTypeSkeleton />
    </div>
  </div>
);
