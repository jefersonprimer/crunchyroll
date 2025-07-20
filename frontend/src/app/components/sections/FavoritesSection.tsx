// Coloque a importação logo no topo do arquivo
'use client';

import { useFavorites } from "../../[locale]/contexts/FavoritesContext";  // Importando o hook
import { useState, useEffect } from "react";
import FavoritesCarousel from "../carousel/FavoritesCarousel";

const FavoritesSection = () => {
  const { favorites } = useFavorites(); // Usando o hook aqui
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Só exibe o componente se houver pelo menos 1 item na lista */}
      {favorites.length > 0 && <FavoritesCarousel />}
    </>
  );
};

export default FavoritesSection;


