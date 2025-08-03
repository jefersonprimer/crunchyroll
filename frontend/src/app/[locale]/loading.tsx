const Spinner: React.FC = () => {
  return (
    <div className="w-16 h-16 border-[6px] border-[#3b1e0e] border-t-[#ff6600] rounded-full animate-spin" />
  );
};

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-auto h-auto min-h-screen bg-black z-50">
      <Spinner />
    </div>
  );
};

export default Loading;
