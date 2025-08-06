const Spinner: React.FC<{ size?: number; border?: number }> = ({ size = 20, border = 2 }) => {
    return (
      <div
        style={{ width: size, height: size, borderWidth: border }}
        className="border-[#3b1e0e] border-t-[#ff6600] rounded-full animate-spin border-solid"
      />
    );
  };
  
  export default Spinner;
  