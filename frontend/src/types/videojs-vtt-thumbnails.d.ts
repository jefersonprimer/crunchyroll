import 'video.js';

declare module 'video.js' {
  interface Player {
    vttThumbnails(options: { src: string }): void;
  }
} 