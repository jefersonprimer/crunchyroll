import React from "react";
import Link from "next/link";
import Image from "next/image";

interface OutdoorProps {
  imageUrl: string;
  title: string;
  audiotype: string;
  description: string;
  buttonLink?: string;
  addToQueueText?: string;
  addToQueueLink?: string;
}

const Outdoor: React.FC<OutdoorProps> = ({
  imageUrl,
  title,
  audiotype,
  description,
  buttonLink = "#",
  addToQueueText = "#",
  addToQueueLink = "#",
}) => {
  return (
    <div
      className="flex flex-row items-center gap-4 p-6 shadow-md bg-black w-[1350px] h-[371px] my-[100px] mx-auto
      max-[1536px]:w-[1200px] max-[1536px]:h-[350px]
      max-[1280px]:w-[1000px] max-[1280px]:h-[320px]
      max-[1024px]:w-[800px] max-[1024px]:h-[300px]
      max-[768px]:flex-col max-[768px]:w-[410px] max-[768px]:h-[450px] max-[768px]:my-0"
    >
      <div className="flex-1 overflow-hidden max-[768px]:flex-1">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-[350px] object-cover"
          width={500}
          height={350}
        />
      </div>

      <div className="flex-1 max-[768px]:w-full max-[768px]:h-[350px]">
        <h2 className="text-2xl mb-4 text-white">{title}</h2>
        <h2 className="text-base mb-4 text-gray-400">{audiotype}</h2>
        <p
          className="text-base mb-4 leading-relaxed text-white 
          max-[768px]:overflow-hidden max-[768px]:text-ellipsis max-[768px]:line-clamp-3 max-[768px]:w-[350px]"
        >
          {description}
        </p>

        <div className="flex gap-2">
          {buttonLink && (
            <Link
              href={buttonLink}
              className="inline-block px-5 py-2.5 bg-[#FF640A] text-black font-bold no-underline text-sm
                max-[768px]:text-white max-[768px]:rounded"
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-labelledby="play-svg"
                  aria-hidden="false"
                  role="img"
                >
                  <title id="play-svg">Play</title>
                  <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
                </svg>
                <span>COMEÇAR A ASSISTIR E1</span>
              </span>
            </Link>
          )}

          {addToQueueText && addToQueueLink && (
            <Link
              href={addToQueueLink}
              className="inline-block px-5 py-2.5 bg-transparent text-white no-underline text-sm border-2 border-[#FF640A]
                max-[768px]:bg-[#555] max-[768px]:border-none max-[768px]:rounded"
            >
              <div className="border border-[#FF640A] max-[768px]:border-none">
                <div className="relative group">
                  <span className="hidden group-hover:block absolute bg-black/80 text-white px-2.5 py-1.5 rounded text-xs whitespace-nowrap -top-7 left-1/2 -translate-x-1/2">
                    Add to Watchlist
                  </span>
                  <div className="flex items-center gap-2 text-[#FF640A] max-[768px]:text-white">
                    <svg
                      className="w-5 h-5 fill-[#FF640A] max-[768px]:fill-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-labelledby="watchlist-svg"
                      role="img"
                    >
                      <title id="watchlist-svg">Watchlist</title>
                      <path d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z" />
                    </svg>
                    <span>ADICIONAR À LISTA</span>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Outdoor;
