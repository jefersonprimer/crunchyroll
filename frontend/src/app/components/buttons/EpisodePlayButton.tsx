import React from 'react';
import Link from 'next/link';
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from 'next-intl';

interface EpisodePlayButtonProps {
  episode?: {
    publicCode: string;
    slug: string;
  } | null;
  className?: string;
}

const EpisodePlayButton: React.FC<EpisodePlayButtonProps> = ({ episode, className = '' }) => {
  const t = useTranslations('EpisodePlayButton');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  return episode ? (
    <Link 
      href={`/${locale}/watch/${episode.publicCode}/${episode.slug}`}
      className="flex items-center gap-1 py-2 px-4 h-full bg-[#ff640a] text-black text-sm font-bold uppercase transition-colors duration-300 ease-in-out hover:bg-[#e65c09] w-[395px] max-w-full sm:w-auto justify-center text-center"
    >
      <div className="relative inline-block cursor-pointer group">
        <svg
          className="w-6 h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-labelledby="play-svg"
          aria-hidden="false"
          role="img"
        >
          <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
        </svg>
      </div>
      <span className="text-sm font-bold uppercase">
        {t("watch_episode")}
      </span>
    </Link>
  ) : (
    <div className="flex items-center h-full bg-[#ff640a] text-black text-sm font-bold uppercase cursor-not-allowed opacity-50">
      <div className="relative inline-block px-4 py-2">
        <span className="
          absolute bottom-full left-1/2 -translate-x-1/2
          px-3 py-2 bg-[#23252B] text-white text-xs
          whitespace-nowrap mb-2 pointer-events-none
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          after:content-[''] after:absolute after:top-full after:left-1/2
          after:-ml-1 after:border-4 after:border-t-[#23252B]
          after:border-transparent after:border-x-transparent
        ">
          Play
        </span>
        <svg
          className="w-6 h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-labelledby="play-svg"
          aria-hidden="false"
          role="img"
        >
          <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
        </svg>
      </div>
      <span className="text-sm font-bold uppercase">
        EPISÓDIO INDISPONÍVEL
      </span>
    </div>
  );
};

export default EpisodePlayButton;