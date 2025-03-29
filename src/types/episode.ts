export interface Episode {
  id: string;
  animeId: string;
  season: number;
  title: string;
  slug: string;
  duration: string;
  synopsis: string;
  image: string;
  videoUrl: string;
  releaseDate: string;
  isLancamento: boolean;
}

export interface EpisodesData {
  Episodes: Episode[];
}
