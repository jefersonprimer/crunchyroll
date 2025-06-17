// Define tipos específicos da página de episódio
export interface Episode {
  id: string;
  publicCode: string;
  slug: string;
  animeId: string;
  episodeNumber: number;
  seasonNumber: number;
  season: number;
  seasonId: string;
  title: string;
  synopsis: string;
  duration: number;
  thumbnail: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
  releaseDate: string;
  image: string;
  versions?: {
    id: string;
    languageType: string;
    videoUrl: string;
  }[];
  anime?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface Anime {
  id: string;
  publicCode: string;
  slug: string;
  name: string;
  audioType?: string;
  audioLanguages?: string[];
  subtitles?: string;
  imagePoster?: string;
  imageCardCompact?: string;
  imageBannerDesktop?: string;
  imageBannerMobile?: string;
  imageLogo?: string;
  genres?: {
    id: string;
    name: string;
  }[];
  isPopular: boolean;
  isNewRelease: boolean;
  rating?: string;
  score?: number;
  synopsis?: string;
  contentAdvisory?: string;
  contentSources?: Array<{
    copyright?: string;
  }>;
  totalEpisodes?: number;
  seasons: {
    id: string;
    seasonName: string;
    seasonNumber: number;
    totalEpisodes: number;
  }[];
  episodes: Episode[];
  createdAt: string;
  updatedAt: string;
}

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
