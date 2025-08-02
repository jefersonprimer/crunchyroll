export default function RelatedAnimeCardSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 animate-pulse">
      <div className="flex-shrink-0">
        <div className="w-16 h-24 bg-[#141519]"></div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="h-4 bg-[#141519]  mb-2 w-3/4"></div>
        <div className="h-3 bg-[#141519]  mb-1 w-full"></div>
        <div className="h-3 bg-[#141519]  w-2/3"></div>
        <div className="h-3 bg-[#141519]  mt-2 w-1/4"></div>
      </div>
    </div>
  );
} 