// Definição do tipo para áudio
export type AudioType = "Dublado" | "Legendado" | "Dub | Leg";

// Definição do tipo para gênero
export type Genre =
  | "Ação"
  | "Fantasia"
  | "Aventura"
  | "Comédia"
  | "Drama"
  | "Shoujo"
  | "Mistério"
  | "Mecha"
  | "Sobrenatural";

// Definição do tipo para o dia da semana em que o anime é transmitido
export type AiringDay =
  | "Segunda-feira"
  | "Terça-feira"
  | "Quarta-feira"
  | "Quinta-feira"
  | "Sexta-feira"
  | "Sábado"
  | "Domingo";

// Interface para informações de origem/base
export interface BasedOn {
  source: "manga" | "light novel" | "original" | "web novel" | "visual novel";
  title?: string;
  authors?: string[];
  copyright: string;
}

// Interface para o objeto Anime
export interface Anime {
  // Status e flags
  isRelease: boolean;
  isPopularSeason: boolean;
  newReleases: boolean;
  isPopular: boolean;
  isNextSeason: boolean;
  isThumbnail: boolean;
  isMovie: boolean;

  // Identificação
  id: string;
  slug: string;
  name: string;
  releaseYear: string;

  // Imagens
  image: string; // Imagem para mobile
  imageDesktop: string; // Imagem para desktop
  logoAnime: string; // Logo oficial
  thumbnailImage: string; // Thumbnail para cards

  // Descrição
  synopsis: string;
  rating: number; // Classificação etária
  score: number; // Nota média (0-5)
  genres: Genre[];
  contentAdvisory?: string[]; // Avisos de conteúdo

  // Transmissão
  airingDay: AiringDay;
  episodes: number;
  season: number;

  // Áudio e legendas
  audioType: AudioType;
  audio: string; // Idioma original
  subtitles: string[]; // Idiomas disponíveis

  // Informações sobre a origem
  based: BasedOn;
}

// Interface para o conjunto de animes
export interface AnimeData {
  animes: Anime[];
}
