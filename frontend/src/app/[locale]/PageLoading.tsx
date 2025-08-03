import HeaderSkeleton from "../components/layout/HeaderSkeleton";
import Spinner from "./loading";

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderSkeleton/>
      <div className="flex-1 flex items-center justify-center bg-black/50">
        <Spinner />
      </div>
    </div>
  );
};

export default Loading;



