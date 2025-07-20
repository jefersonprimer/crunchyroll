import {
    AiringDay,
    AnimeStatus,
    AudioType,
    SeasonEnum,
    SourceType,
  } from "./enums"
  
  export interface Genre {
    id: string
    name: string
    createdAt: string
    updatedAt: string
  }
  
  export interface ContentSource {
    id: string
    animeId?: string | null
    movieId?: string | null
    sourceType: SourceType
    title?: string | null
    authors?: string | null
    copyright?: string | null
    createdAt: string
    updatedAt: string
  }
  
  export interface AnimeSeason {
    id: string
    animeId: string
    seasonNumber: number
    seasonName?: string | null
    status?: AnimeStatus | null
    totalEpisodes?: number | null
    firstEpisodeDate?: string | null
    lastEpisodeDate?: string | null
    season?: SeasonEnum | null
    createdAt: string
    updatedAt: string
  }
  
  export interface Anime {
    id: string
    publicCode: string
    slug: string
    name: string
    releaseYear?: number | null
    releaseDate?: string | null
    imagePoster?: string | null
    imageBannerDesktop?: string | null
    imageBannerMobile?: string | null
    imageCardCompact?: string | null
    synopsis?: string | null
    rating?: number | null
    score?: number | null
    airingDay?: AiringDay | null
    totalEpisodes?: number | null
    audioType?: AudioType | null
    imageLogo?: string | null
    imageThumbnail?: string | null
    contentAdvisory?: string | null
    createdAt: string
    updatedAt: string
    isReleasing: boolean
    isSeasonPopular: boolean
    isNewRelease: boolean
    isPopular: boolean
    hasNextSeason: boolean
    hasThumbnail: boolean
  
    // Relations
    genres?: Genre[]
    audioLanguages?: string[] // or AudioLanguage[] if you want enum typing
    subtitles?: string[] // or SubtitleLanguage[] if you define that enum
    seasons?: AnimeSeason[]
    contentSources?: ContentSource[]
  }
  