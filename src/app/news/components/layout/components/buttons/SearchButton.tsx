"use client";

import React from 'react';
import Link from 'next/link';

interface SearchButtonProps {
  isDark: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({ isDark }) => {
  return (
    <Link
      href="/search"
      className={`cursor-pointer ${isDark ? "text-white hover:bg-[#4A4E58]" : "text-[#4A4E62] hover:bg-[#E6E5E3]"} hover:text-[#008382] transition-colors px-3 py-[21px] group-hover:text-[#008382] group mr-4 sm:mx-0`}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`group-hover:stroke-[#2ABDBB] ${isDark ? "stroke-white" : ""}`}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.20078 0.799988C13.84 0.799988 17.6008 4.5608 17.6008 9.19999C17.6008 11.1954 16.905 13.0283 15.7429 14.4693L21.2372 19.9636L19.9644 21.2364L14.4701 15.7421C13.0291 16.9042 11.1962 17.6 9.20078 17.6C4.56159 17.6 0.800781 13.8392 0.800781 9.19999C0.800781 4.5608 4.56159 0.799988 9.20078 0.799988ZM9.20078 2.59999C5.5557 2.59999 2.60078 5.55491 2.60078 9.19999C2.60078 12.8451 5.5557 15.8 9.20078 15.8C12.8459 15.8 15.8008 12.8451 15.8008 9.19999C15.8008 5.55491 12.8459 2.59999 9.20078 2.59999Z"
          fill={isDark ? "#FFFFFF" : "#4A4E58"}
        />
      </svg>
    </Link>
  );
};

export default SearchButton;