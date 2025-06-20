"use client";

import React, { useState, useEffect } from "react";
import { useFavorites } from "../../[locale]/contexts/FavoritesContext";
import Link from "next/link";
import FavoritesCard from "../cards/FavoritesCard";
import { useParams } from "next/navigation";


const FavoritesCarousel = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [isClient, setIsClient] = useState(false);
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="items-center justify-center w-[1351px] h-[325.33px] bg-[#000000]">
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

      {favorites.length === 0 ? (
        <div className="align-middle p-[40px]">
          <img
            src="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-watchlist.png"
            alt="Empty Watchlist"
            className="w-[200px] mb-[15px]"
          />
          <h4 className="text-[1rem] text-[#FFFFFF] mb-[10px]">
            Sua Fila merece mais amor. <br /> Vamos enchê-la com animes incríveis.
          </h4>
          <a href="/" className="bg-[#ffcc00] py-[10px] px-[15px] no-underline text-[#000000] font-bold inline-block">VOLTAR PARA A TELA INICIAL</a>
        </div>
      ) : (
        <div className="w-[1233px] h-auto min-h-[273.33px] flex gap-[.75rem] pb-[10px] my-0 mx-auto">
          {favorites.slice(-4).map((anime) => (
            <FavoritesCard
              key={anime.id}
              anime={anime}
              onRemove={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesCarousel;