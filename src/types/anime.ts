import {
  AiringDay,
  AnimeStatus,
  AudioType,
  SeasonEnum,
  SourceType,
} from "./enums"

// anime.ts
export interface Anime {
  id: string;
  publicCode: string;
  slug: string;
  name: string;
  releaseYear: number;
  releaseDate: string;
  imagePoster: string;
  imageBannerDesktop: string;
  imageBannerMobile: string;
  imageCardCompact: string;
  synopsis: string;
  rating: number;
  score: number;
  airingDay: AiringDay;
  totalEpisodes: number;
  audioType: AudioType;
  imageLogo: string;
  imageThumbnail: string;
  contentAdvisory: string;
  createdAt: string;
  updatedAt: string;
  isReleasing: boolean;
  isSeasonPopular: boolean;
  isNewRelease: boolean;
  isPopular: boolean;
  hasNextSeason: boolean;
  hasThumbnail: boolean;

  // Relations
  genres: Genre[];
  audioLanguages: string[];
  subtitles: string[];
  seasons: AnimeSeason[];
  contentSources: ContentSource[];
}

export interface AnimeSeason {
  id: string;
  animeId: string;
  seasonNumber: number;
  seasonName: string;
  status: AnimeStatus;
  totalEpisodes: number;
  firstEpisodeDate: string;
  lastEpisodeDate: string;
  season: SeasonEnum;
  createdAt: string;
  updatedAt: string;
}

export interface ContentSource {
  id: string;
  animeId: string;
  movieId: string;
  sourceType: SourceType;
  title: string;
  authors: string;
  copyright: string;
  createdAt: string;
  updatedAt: string;
}

export interface Genre {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}