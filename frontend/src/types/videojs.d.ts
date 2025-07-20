// src/types/videojs.d.ts ou types/videojs.d.ts
import videojs from 'video.js';

// Declara que queremos estender o módulo 'video.js'
declare module 'video.js' {
  // Estende a interface 'Player' para incluir o método 'vttThumbnails'
  interface Player {
    vttThumbnails(options: { src: string }): void;
  }
}