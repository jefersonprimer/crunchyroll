export interface Genre {
  id: string;
  name: string;
}

export enum AiringDay {
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
  SUNDAY = "sunday",
}

export enum AnimeStatus {
  FINISHED = "finished",
  RELEASING = "releasing",
  NOT_YET_RELEASED = "not_yet_released",
}

export enum AudioLanguage {
  Portuguese = "portuguese",
  Japanese = "japanese",
  Chinese = "chinese",
  Korean = "korean",
}

export enum AudioType {
  SUBTITLED = "subtitled",
  DUBBED = "dubbed",
  SUBTITLED_DUBBED = "subtitled_dubbed",
}

export enum EpisodeLanguageType {
  Subtitled = "SUBTITLED",
  Dubbed = "DUBBED",
  Raw = "RAW",
}

export enum SeasonEnum {
  WINTER = "winter",
  SPRING = "spring",
  SUMMER = "summer",
  FALL = "fall",
}

export enum SourceType {
  MANGA = "manga",
  LIGHT_NOVEL = "light_novel",
  VISUAL_NOVEL = "visual_novel",
  VIDEO_GAME = "video_game",
  ORIGINAL = "original",
  OTHER = "other",
}
  