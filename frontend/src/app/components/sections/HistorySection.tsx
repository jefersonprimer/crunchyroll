import { useHistory } from "@/app/[locale]/contexts/HistoryContext";
import HistoryCarousel from "../carousel/HistoryCarousel";

const HistorySection = () => {
    const { watchedEpisodes } = useHistory(); // Pega o histórico do contexto
  
    if (watchedEpisodes.length === 0) {
      return null; // Não renderiza o HistoryCarousel se não houver episódios no histórico
    }
  
    return <HistoryCarousel />;
  };

