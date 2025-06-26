import React from 'react';

const MoreOptionsButton: React.FC = () => {
  return (
    <div className="relative inline-block text-[#ff640a]">
      <button
        tabIndex={0}
        className="bg-none border-none p-2 cursor-pointer flex items-center justify-center"
        data-t="more-btn"
      >
        <div className="relative inline-flex items-center group">
          <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 
                          bg-[#23252B] text-white text-center py-2 px-3 absolute 
                          z-10 bottom-[125%] left-1/2 -translate-x-1/2 
                          whitespace-nowrap text-xs
                          after:content-[''] after:absolute after:top-full after:left-1/2 
                          after:-ml-[5px] after:border-[5px] after:border-solid 
                          after:border-t-[#23252B] after:border-x-transparent after:border-b-transparent">
            Mais opções
          </span>
          <svg
            className="w-6 h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 24"
          >
            <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-2 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm2 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default MoreOptionsButton;