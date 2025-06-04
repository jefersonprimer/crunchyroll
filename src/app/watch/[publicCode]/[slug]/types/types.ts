import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";

// Re-exporta os tipos básicos para uso nos componentes
export type { Anime, Episode };

// Define tipos específicos da página de episódio
export interface EpisodePageProps {
  episode: Episode;
  anime: Anime;
  animeEpisodes: Episode[];
  prevEpisode: Episode | null;
  nextEpisode: Episode | null;
}

// Extende os tipos originais se necessário
export interface ExtendedAnime extends Anime {
  // Adicione campos adicionais específicos da página aqui
  customField?: string;
}

export interface ExtendedEpisode extends Episode {
  // Adicione campos adicionais específicos da página aqui
  customEpisodeField?: number;
}
