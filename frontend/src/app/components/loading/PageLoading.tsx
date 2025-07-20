import React from "react";
import HeaderSkeleton from "../layout/HeaderSkeleton";
import Loading from "@/app/[locale]/loading";

const PageLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <HeaderSkeleton />
      <Loading/>
    </div>
  );
};

export default PageLoading; 

