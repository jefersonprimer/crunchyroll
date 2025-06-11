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
  languageType: string;
  videoUrl: string;
}

export interface AnimeInfo {
  id: string;
  name: string;
  slug: string;
}

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
  versions?: EpisodeVersion[];
  anime?: AnimeInfo;
}
