import {
  AiringDay,
  AnimeStatus,
  AudioType,
  SeasonEnum,
  SourceType,
  Genre,
} from "./enums"
import { Episode } from "./episode";

// anime.ts
export interface Season {
  id: string;
  seasonName: string;
  seasonNumber: number;
  totalEpisodes: number;
}

export interface Anime {
  id: string;
  publicCode: string;
  slug: string;
  name: string;
  audioType?: string;
  audioLanguages?: string[] | string;
  subtitles?: string;
  imagePoster?: string;
  imageCardCompact?: string;
  imageBannerDesktop?: string;
  imageBannerMobile?: string;
  imageLogo?: string;
  genres?: Genre[];
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
  seasons: Season[];
  episodes: Episode[];
  createdAt: string;
  updatedAt: string;
}

export interface AnimeSeason {
  id: string;
  seasonNumber: number;
  seasonName?: string;
  totalEpisodes?: number;
}

export interface ContentSource {
  id: string;
  authors?: string;
  title?: string;
  sourceType: string;
  copyright?: string;
}

export interface Genre {
  id: string;
  name: string;
}