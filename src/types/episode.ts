// enums.ts (exemplo de enum baseado no seu Go)
export enum EpisodeLanguageType {
  DUB = 'DUB',
  SUB = 'SUB',
  // Adicione outros tipos conforme definidos em enums.EpisodeLanguageType
}

// Função auxiliar para validação do tipo de linguagem (equivalente ao IsValid())
export function isValidEpisodeLanguageType(type: string): type is EpisodeLanguageType {
  return Object.values(EpisodeLanguageType).includes(type as EpisodeLanguageType);
}

// models.ts
export interface EpisodeVersion {
  id: string;
  episodeId: string;
  languageType: EpisodeLanguageType;
  videoUrl: string;
  createdAt: string; // ISO string
  updatedAt: string;
}

export interface Episode {
  id: string;
  publicCode: string;
  animeId: string;
  seasonId: string;
  title: string;
  slug: string;
  episodeNumber: number;
  duration?: string;
  synopsis?: string;
  image?: string;
  releaseDate?: string; // ISO string
  isPremiere: boolean;
  createdAt: string;
  updatedAt: string;
  versions?: EpisodeVersion[];
}

// Validações opcionais
export function validateEpisode(e: Episode): string | null {
  if (!e.publicCode || !e.animeId || !e.seasonId || !e.title || !e.slug) {
    return 'public_code, anime_id, season_id, title e slug são obrigatórios';
  }
  return null;
}

export function validateEpisodeVersion(ev: EpisodeVersion): string | null {
  if (!ev.episodeId || !ev.videoUrl || !isValidEpisodeLanguageType(ev.languageType)) {
    return 'episode_id, video_url e language_type válido são obrigatórios';
  }
  return null;
}
