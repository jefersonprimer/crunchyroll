"use client";

import React, { useState, useEffect } from "react";
import { useFavorites } from "../../[locale]/contexts/FavoritesContext";
import Link from "next/link";
import FavoritesCard from "../cards/FavoritesCard";
import { useParams } from "next/navigation";
import { useOnScreen } from "@/app/[locale]/hooks/useOnScreen";

interface FavoritesCarouselProps {
  useOnScreen?: boolean;
}

const FavoritesCarousel: React.FC<FavoritesCarouselProps> = ({ useOnScreen: useOnScreenProp = true }) => {
  const { favorites, removeFavorite } = useFavorites();
  const [isClient, setIsClient] = useState(false);
  const params = useParams();
  const locale = params.locale as string;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { ref, isIntersecting } = useOnScreenProp
    ? useOnScreen({ threshold: 0.1 })
    : { ref: undefined, isIntersecting: true };

  const [canLoad, setCanLoad] = useState(!useOnScreenProp);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (useOnScreenProp && isIntersecting) {
      console.log('[FavoritesCarousel] Entrou na tela, liberando canLoad');
      setCanLoad(true);
    }
    if (!useOnScreenProp) {
      setCanLoad(true);
    }
  }, [isIntersecting, useOnScreenProp]);

  if (!isClient) {
    return null;
  }

  if (!canLoad) {
    console.log('[FavoritesCarousel] Renderizando skeleton');
    return (
      <div ref={useOnScreenProp ? ref : undefined} className="items-center justify-center w-[1351px] h-auto min-h-[325.33px] bg-[#000000]">
        <div className="w-[1223px] h-[52px] my-0 mx-auto flex justify-between items-center bg-[#000000]">
          <h2 className="text-[1.5rem] text-[#FFFFFF] mb-[8px]">Sua Lista</h2>
        </div>
        <div className="w-[1233px] h-auto min-h-[273.33px] flex gap-[.75rem] pb-[10px] my-0 mx-auto">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="card relative flex-none w-[300.25px] h-[273.33px] overflow-visible cursor-pointer text-left opacity-70 animate-pulse"
              style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}
            >
              <div style={{ width: '100%', height: '160px', position: 'relative', marginBottom: 8 }}>
                <div style={{ width: '100%', height: '100%', background: '#141519'}} />
              </div>
              <div style={{ paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ width: '80%', height: 20, background: '#141519', marginBottom: 8 }} />
                <div style={{ width: '50%', height: 16, background: '#141519'}} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  console.log('[FavoritesCarousel] Renderizando favoritos', favorites);

  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <div ref={useOnScreenProp ? ref : undefined} className="items-center justify-center w-[1351px] h-auto min-h-[325.33px] bg-[#000000]">
      <div className="w-[1223px] h-[52px] my-0 mx-auto flex justify-between items-center bg-[#000000]">
        <h2 className="text-[1.5rem] text-[#FFFFFF] mb-[8px]">Sua Lista</h2>
        <div className="flex items-center">
          <Link href={`/${locale}/watchlist`} className="flex items-center no-underline text-[#A0A0A0] font-bold hover:text-[#FFFFFF]">
            <span>VER FILA</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-labelledby="angle-svg"
              aria-hidden="true"
              role="img"
              fill="currentColor"
            >
              <title id="angle-svg">Próximo</title>
              <path d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z"></path>
            </svg>
          </Link>
        </div>
      </div>

      <div className="w-[1233px] h-auto min-h-[273.33px] flex gap-[.75rem] pb-[10px] my-0 mx-auto">
        {favorites.slice(-4).map((anime) => (
          <FavoritesCard
            key={anime.id}
            anime={anime}
            onRemove={removeFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesCarousel;