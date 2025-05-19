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
  seasonName: string;
  totalEpisodes: number;
}

export interface Anime {
  id: string;
  slug: string;
  name: string;
  audioType?: string;
  imageBannerMobile?: string;
  imageBannerDesktop?: string;
  imagePoster?: string;
  imageLogo?: string;
  synopsis?: string;
  rating?: string;
  score?: number;
  genres?: {
    id: string;
    name: string;
  }[];
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