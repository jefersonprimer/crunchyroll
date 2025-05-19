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

export interface Episode {
  id: string;
  title: string;
  slug: string;
  duration?: string;
  synopsis?: string;
  image?: string;
  videoUrl?: string;
  versions?: EpisodeVersion[];
  releaseDate?: string;
  createdAt: string;
  updatedAt: string;
  season?: number;
  animeId?: string;
}
