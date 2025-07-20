import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { FaCog, FaPlay, FaPause, FaStepForward, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from 'react-icons/fa';

// Nova interface para legendas
interface SubtitleOption {
  label: string;
  url: string;
}

// Interface para as props do componente
interface VideoPlayerProps {
  options: {
    autoplay?: boolean;
    controls?: boolean;
    responsive?: boolean;
    fluid?: boolean;
    sources: Array<{
      src: string;
      type: string;
    }>;
    poster?: string;
  };
  onReady?: (player: ReturnType<typeof videojs>) => void;
  vttThumbnailsUrl: string;
  subtitles?: SubtitleOption[]; // array de legendas dinâmicas
  mainThumbnailUrl?: string; // url base da imagem de spritesheet
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return '00:00';
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  options,
  onReady,
  vttThumbnailsUrl,
  subtitles = [],
  mainThumbnailUrl = '',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [autoplay, setAutoplay] = useState(options.autoplay ?? false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedSubtitle, setSelectedSubtitle] = useState(subtitles[0]?.url || '');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1); // Novo estado para volume
  const [isVolumeHovered, setIsVolumeHovered] = useState(false); // Estado para hover do volume
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // Estado para hover preview
  const [thumbnailCues, setThumbnailCues] = useState<{
    start: number;
    end: number;
    image: string;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
  }[]>([]);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const [hoverThumbnail, setHoverThumbnail] = useState<string | null>(null);
  const [hoverSprite, setHoverSprite] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);
  const [isTimelineHovered, setIsTimelineHovered] = useState(false);
  // Novo estado para hover do player
  const [isHovered, setIsHovered] = useState(false);
  const [showSubtitlesModal, setShowSubtitlesModal] = useState(false);
  const [showPlaybackModal, setShowPlaybackModal] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showPoster, setShowPoster] = useState(true);

  // Controles só aparecem se mouse está dentro OU algum modal está aberto
  const showAllControls = isHovered || showSettings || showSubtitlesModal || showPlaybackModal;

  // Parseia o VTT de thumbnails ao montar
  useEffect(() => {
    async function fetchVtt() {
      try {
        const res = await fetch(vttThumbnailsUrl);
        const text = await res.text();
        // Regex para cues
        const cueRegex = /(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\s+(.+)/g;
        const cues: any[] = [];
        let match;
        while ((match = cueRegex.exec(text)) !== null) {
          const [_, start, end, rest] = match;
          // Exemplo de rest: thumbnails.jpg#xywh=0,0,160,90
          let image = rest.trim();
          let x, y, w, h;
          const xywhMatch = image.match(/#xywh=(\d+),(\d+),(\d+),(\d+)/);
          let imageBase = image;
          if (xywhMatch) {
            [x, y, w, h] = xywhMatch.slice(1).map(Number);
            imageBase = image.split('#')[0];
          }
          cues.push({
            start: toSeconds(start),
            end: toSeconds(end),
            image: imageBase, // só o base
            x,
            y,
            w,
            h,
          });
        }
        setThumbnailCues(cues);
      } catch (e) {
        setThumbnailCues([]);
      }
    }
    fetchVtt();
  }, [vttThumbnailsUrl]);

  // Função auxiliar para converter tempo VTT para segundos
  function toSeconds(time: string) {
    const [h, m, s] = time.split(':');
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
  }

  // Evento de hover na timeline
  const handleTimelineMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!timelineRef.current || !duration) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    const time = percent * duration;
    setHoverTime(time);
    setHoverPosition(x);
    // Busca a cue correspondente
    const cue = thumbnailCues.find(c => time >= c.start && time <= c.end);
    if (cue) {
      setHoverThumbnail(mainThumbnailUrl);
      if (
        typeof cue.x === 'number' &&
        typeof cue.y === 'number' &&
        typeof cue.w === 'number' &&
        typeof cue.h === 'number'
      ) {
        setHoverSprite({ x: cue.x, y: cue.y, w: cue.w, h: cue.h });
      } else {
        setHoverSprite(null);
      }
    } else {
      setHoverThumbnail(null);
      setHoverSprite(null);
    }
  };
  const handleTimelineMouseLeave = () => {
    setHoverTime(null);
    setHoverPosition(null);
    setHoverThumbnail(null);
    setHoverSprite(null);
  };

  // Garante que os controles estejam desativados inicialmente
  const videoJsOptions = {
    ...options,
    controls: false, // Desativa todos os controles nativos do Video.js
    controlBar: {
      playToggle: false,
      volumePanel: false,
      currentTimeDisplay: false,
      timeDivider: false,
      durationDisplay: false,
      remainingTimeDisplay: false,
      progressControl: false,
      fullscreenToggle: false,
    },
  };

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (videoElement) {
        const player = videojs(videoElement, videoJsOptions, () => {
          playerRef.current = player;
          if (onReady) {
            onReady(player);
          }
        });
        player.ready(() => {});
        player.on('play', () => {
          setHasStarted(true);
          setShowPoster(false);
          setIsPlaying(true);
        });
        player.on('pause', () => setIsPlaying(false));
        player.on('fullscreenchange', () => setIsFullscreen(player.isFullscreen()));
        player.on('timeupdate', () => setCurrentTime(player.currentTime()));
        player.on('loadedmetadata', () => {
          setDuration(player.duration());
          setCurrentTime(player.currentTime());
          setHasStarted(false);
          setShowPoster(true);
        });
        player.on('durationchange', () => setDuration(player.duration()));
      }
    }
  }, [options, onReady, vttThumbnailsUrl]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  // Play/Pause
  const handlePlayPause = () => {
    const player = playerRef.current;
    if (player) {
      if (player.paused()) {
        player.play();
      } else {
        player.pause();
      }
    }
  };

  // Próximo episódio (placeholder)
  const handleNext = () => {
    // Aqui você pode chamar uma função de navegação para o próximo episódio
    alert('Próximo episódio!');
  };

  // Mute/Unmute
  const handleMute = () => {
    const player = playerRef.current;
    if (player) {
      player.muted(!player.muted());
    }
  };

  // Fullscreen
  const handleFullscreen = () => {
    const player = playerRef.current;
    if (player) {
      if (player.isFullscreen()) {
        player.exitFullscreen();
      } else {
        player.requestFullscreen();
      }
    }
  };

  // Timeline seek
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const player = playerRef.current;
    if (player && timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = Math.max(0, Math.min(1, x / rect.width));
      const seekTime = percent * duration;
      player.currentTime(seekTime);
      setCurrentTime(seekTime);
    }
  };

  // Timeline drag (opcional, mas melhora UX)
  const handleTimelineMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setSeeking(true);
    handleTimelineClick(e);
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (timelineRef.current && seeking) {
        const rect = timelineRef.current.getBoundingClientRect();
        const x = moveEvent.clientX - rect.left;
        const percent = Math.max(0, Math.min(1, x / rect.width));
        const seekTime = percent * duration;
        const player = playerRef.current;
        if (player) {
          player.currentTime(seekTime);
        }
        setCurrentTime(seekTime);
      }
    };
    const handleMouseUp = () => {
      setSeeking(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Atualiza mute e volume ao montar
  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      setIsMuted(player.muted());
      setIsFullscreen(player.isFullscreen());
      setIsPlaying(!player.paused());
      setDuration(player.duration());
      setCurrentTime(player.currentTime());
      setVolume(player.volume()); // Inicializa o volume
    }
  }, []);

  // Sincroniza volume do player com o estado volume
  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      player.volume(volume);
      if (volume === 0) {
        player.muted(true);
      } else {
        player.muted(false);
      }
    }
  }, [volume]);

  // Sincroniza mute do player com o estado isMuted
  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      player.muted(isMuted);
      if (!isMuted && player.volume() === 0) {
        player.volume(0.5); // Se desmutar e volume for 0, define para 0.5
        setVolume(0.5);
      }
    }
  }, [isMuted]);

  // Atualiza legendas
  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      const tracks = player.textTracks();
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        if (!selectedSubtitle) {
          track.mode = 'disabled';
        } else if ((track as any).src === selectedSubtitle) {
          track.mode = 'showing';
        } else {
          track.mode = 'disabled';
        }
      }
    }
  }, [selectedSubtitle]);

  // Layout modo teatro
  return (
    <div
      className="relative w-full max-h-[460px] flex flex-col bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster overlay absoluto cobrindo todo o player */}
      {showPoster && options.poster && (
        <div className="absolute inset-0 w-full flex items-center justify-center z-50 ">
          <img
            src={options.poster}
            alt="Poster"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />
          <button
            className="relative z-10 cursor-pointer flex items-center justify-center transition-colors w-34 h-34"
            onClick={() => {
              setShowPoster(false);
              setHasStarted(true);
              const player = playerRef.current;
              if (player) {
                const playPromise = player.play();
                if (playPromise !== undefined) {
                  playPromise.catch((error) => {
                    // Pode logar ou tratar o erro, se necessário
                    console.warn('Play() falhou:', error);
                  });
                }
              }
            }}
            aria-label="Play"
            style={{ outline: 'none' }}
          >
            {/* SVG Play estilizado com Tailwind */}
            <span className="flex items-center justify-center w-[120px] h-[120px] hover:bg-black/60">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#E7E7E6]"
              >
                <path
                  className="white"
                  d="M4.3,2.563C4.3.351,5.842-.536,7.744.584l46.528,27.39c1.9,1.119,1.9,2.934,0,4.054L7.744,59.417c-1.9,1.119-3.443.229-3.443-1.979Z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      )}
      {/* Frame do vídeo centralizado, responsivo proporção 2.2:1, 75% da largura da tela */}
      <div className="flex justify-center">
        <div
          className="relative w-[74.5%] max-w-[1080px] aspect-[2.2/1] flex items-center justify-center bg-black overflow-hidden shadow-lg"
          onClick={e => {
            // Evita pausar/despausar se clicar em um botão ou input dentro do player
            if (
              e.target instanceof HTMLElement &&
              (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.closest('button') || e.target.closest('input'))
            ) {
              return;
            }
            handlePlayPause();
          }}
          style={{ cursor: 'pointer' }}
        >
          {/* overflow-hidden já está presente para garantir que legendas não vazem */}
          <video
            ref={videoRef}
            className="video-js w-full h-full object-contain"
            preload="auto"
          >
            {subtitles.map((sub, idx) => (
              <track
                key={sub.url}
                kind="subtitles"
                src={sub.url}
                srcLang={sub.label}
                label={sub.label}
                default={selectedSubtitle === sub.url}
              />
            ))}
          </video>
        </div>
      </div>
      {/* Controles e legendas só aparecem se não estiver mostrando o poster */}
      {!showPoster && showAllControls && (
        <>
          <div className="w-full flex justify-between items-center px-4 -mt-22 relative z-10">
            <div className="flex items-center gap-3">
              <button className="p-2 cursor-pointer" onClick={handlePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
              </button>
              <button className="p-2 cursor-pointer" onClick={handleNext} aria-label="Próximo episódio">
                <FaStepForward size={20} />
              </button>
              {/* Bloco de volume com ícone e slider */}
              <div
                className="flex items-center gap-2 z-60 relative"
                onMouseEnter={() => setIsVolumeHovered(true)}
                onMouseLeave={() => setIsVolumeHovered(false)}
              >
                <button
                  className="p-2 cursor-pointer"
                  onClick={handleMute}
                  aria-label={isMuted ? 'Desmutar' : 'Mutar'}
                >
                  {isMuted || volume === 0 ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                </button>
                {isVolumeHovered && (
                  <div className="absolute cursor-pointer left-8 top-1/2 -translate-y-1/2 w-24 h-10 flex items-center opacity-90 bg-[#141519] z-[100] px-4">
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={isMuted ? 0 : volume}
                      onChange={e => setVolume(Number(e.target.value))}
                      className="w-full accent-orange-500 bg-transparent"
                      aria-label="Volume"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative"> {/* Novo wrapper para o botão de config e modal */}
                <button className="p-2 cursor-pointer" onClick={() => setShowSettings((prev) => !prev)} aria-label="Configurações">
                  <FaCog size={20} />
                </button>
                {/* Modal de configurações - só aparece se showSettings estiver ativo e não estiver mostrando legendas */}
                {showSettings && !showSubtitlesModal && !showPlaybackModal && showAllControls && (
                  <div
                    className="absolute right-0 bottom-10 z-10 bg-[#141519] text-white py-4 min-w-80 shadow" // z-10 para modal de config
                    onClick={e => e.stopPropagation()}
                    style={{ minWidth: 320 }}
                  >
                    {/* Autoplay */}
                    <div className="px-4 py-2 flex items-center justify-between hover:bg-[#23252B] cursor-pointer">
                      <span className="text-sm">Autoplay</span>
                      <button
                        onClick={() => setAutoplay((prev) => !prev)}
                        className={`relative flex cursor-pointer border-2 h-5 w-10 items-center rounded-full p-1 transition-colors duration-300 group ${
                          autoplay ? 'bg-[#192E38] border-[#28BDBB]' : 'bg-[#4A4E58] border-[#A0A0A0] hover:border-white'
                        }`}
                        aria-label="Toggle autoplay"
                        type="button"
                      >
                        <div
                          className={`absolute h-2 w-2 rounded-full transition-all duration-300 ${
                            autoplay ? 'bg-[#28BDBB]' : 'bg-[#A0A0A0] group-hover:bg-white'
                          } ${autoplay ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                    {/* Áudio */}
                    <div className="px-4 py-2 flex items-center justify-between hover:bg-[#23252B] cursor-pointer"
                      onClick={() => { setShowSubtitlesModal(true); setShowSettings(false); }}
                    >
                      <span className="flex items-center gap-2">Áudio</span>
                      <div className="text-[#DADADA] flex items-center justify-center">
                        <span>{subtitles.find(sub => sub.url === selectedSubtitle)?.label || 'Nenhum'}</span>
                          <span>
                            <svg
                              className="w-6 h-6"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z" fill="#FFF" fillRule="evenodd" />
                            </svg>
                          </span>
                      </div>
                    </div>
                    {/* Legendas */}
                    <div className="px-4 py-2 flex items-center justify-between hover:bg-[#23252B] cursor-pointer"
                      onClick={() => { setShowSubtitlesModal(true); setShowSettings(false); }}
                    >
                      <span>Legendas/CC</span>
                      <div className="text-[#DADADA] flex items-center justify-center">
                        <span>{subtitles.find(sub => sub.url === selectedSubtitle)?.label || 'Nenhum'}</span>
                          <span>
                            <svg
                              className="w-6 h-6"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z" fill="#FFF" fillRule="evenodd" />
                            </svg>
                          </span>
                      </div>
                    </div>
                    {/* Qualidade */}
                    <div className="px-4 py-2 flex items-center justify-between hover:bg-[#23252B] cursor-pointer">
                      <label htmlFor="quality-select">Qualidade:</label>
                      <select id="quality-select" disabled style={{ marginLeft: 8 }}>
                        <option>Default</option>
                      </select>
                    </div>
                    {/* Playback speed - agora abre modal */}
                    <div className="px-4 py-2 flex items-center justify-between hover:bg-[#23252B] cursor-pointer"
                      onClick={() => { setShowPlaybackModal(true); setShowSettings(false); }}
                    >
                      <label>Playback Speed</label>
                      <div className="text-[#DADADA] flex items-center justify-center">
                        <span>{playbackRate}x</span>
                        <span>
                          <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z" fill="#FFF" fillRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {/* Modal de legendas personalizado - agora dentro do mesmo wrapper do botão de config */}
                {showSubtitlesModal && showAllControls && (
                  <div
                    className="absolute right-0 bottom-10 z-10 bg-[#141519] text-white py-4 min-w-80 shadow" // z-10 para modal de legendas
                    onClick={e => e.stopPropagation()}
                  >
                    {/* Topo do modal de legendas */}
                    <div className="flex items-center text-left mb-2">
                      <button
                        onClick={() => { setShowSubtitlesModal(false); setShowSettings(true); }}
                        className="bg-none border-none text-white cursor-pointer text-sm flex items-center"
                        aria-label="Voltar para configurações"
                        type="button"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                          aria-hidden="true"
                        >
                          <path
                            d="M15.4 16.6L14 18l-6-6 6-6 1.4 1.4-4.6 4.6z"
                            fill="#FFF"
                            fillRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => { setShowSubtitlesModal(false); setShowSettings(true); }}
                        className="text-white cursor-pointer font-semibold text-base"
                        aria-label="Fechar legendas"
                        type="button"
                      >
                        Legendas
                      </button>
                    </div>
                    {/* Lista de legendas */}
                    <div className="flex flex-col">
                      <button
                        onClick={() => { setSelectedSubtitle(''); setShowSubtitlesModal(false); setShowSettings(true); }}
                        className={
                          `w-full text-left font-medium cursor-pointer text-sm px-4 py-3 transition hover:text-white hover:bg-[#23252B] flex items-center gap-3` +
                          (selectedSubtitle === ''
                            ? ' text-[#A0A0A0] font-bold'
                            : ' text-[#A0A0A0] font-normal')
                        }
                      >
                        {/* Bolinha de seleção customizada */}
                        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedSubtitle === '' ? 'border-[#2ABDBB]' : 'border-[#A0A0A0]'
                        }`}>
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            selectedSubtitle === '' ? 'bg-[#2ABDBB]' : 'bg-transparent'
                          }`} />
                        </span>
                        Nenhum
                      </button>
                      {subtitles.map((sub, idx) => (
                        <button
                          key={sub.url}
                          onClick={() => { setSelectedSubtitle(sub.url); setShowSubtitlesModal(false); setShowSettings(true); }}
                          className={
                            `w-full text-left font-medium cursor-pointer text-sm px-4 py-3 transition hover:text-white hover:bg-[#23252B] flex items-center gap-3` +
                            (selectedSubtitle === sub.url
                              ? ' text-[#A0A0A0] font-bold'
                              : ' text-[#A0A0A0] font-normal')
                          }
                        >
                          {/* Bolinha de seleção customizada */}
                          <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedSubtitle === sub.url ? 'border-[#2ABDBB]' : 'border-[#A0A0A0]'
                          }`}>
                            <span className={`w-2.5 h-2.5 rounded-full ${
                              selectedSubtitle === sub.url ? 'bg-[#2ABDBB]' : 'bg-transparent'
                            }`} />
                          </span>
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* Modal de playback speed personalizado */}
                {showPlaybackModal && showAllControls && (
                  <div
                    className="absolute right-0 bottom-10 z-10 bg-[#141519] text-white py-4 min-w-80 shadow" // z-10 para modal de playback
                    onClick={e => e.stopPropagation()}
                  >
                    {/* Topo do modal de playback */}
                    <div className="flex items-center text-left mb-2">
                      <button
                        onClick={() => { setShowPlaybackModal(false); setShowSettings(true); }}
                        className="bg-none border-none text-white cursor-pointer text-sm flex items-center"
                        aria-label="Voltar para configurações"
                        type="button"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                          aria-hidden="true"
                        >
                          <path
                            d="M15.4 16.6L14 18l-6-6 6-6 1.4 1.4-4.6 4.6z"
                            fill="#FFF"
                            fillRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => { setShowPlaybackModal(false); setShowSettings(true); }}
                        className="text-white cursor-pointer font-medium text-base"
                        aria-label="Fechar playback speed"
                        type="button"
                      >
                        Playback Speed
                      </button>
                    </div>
                    {/* Lista de velocidades */}
                    <div className="flex flex-col">
                      {[0.5, 1, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => { setPlaybackRate(speed); setShowPlaybackModal(false); setShowSettings(true); }}
                          className={
                            `w-full text-left font-medium cursor-pointer text-sm px-4 py-3 transition hover:text-white hover:bg-[#23252B] flex items-center gap-3` +
                            (playbackRate === speed
                              ? ' text-[#A0A0A0] font-bold'
                              : ' text-[#A0A0A0] font-normal')
                          }
                        >
                          {/* Bolinha de seleção customizada */}
                          <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            playbackRate === speed ? 'border-[#2ABDBB]' : 'border-[#A0A0A0]'
                          }`}>
                            <span className={`w-2.5 h-2.5 rounded-full ${
                              playbackRate === speed ? 'bg-[#2ABDBB]' : 'bg-transparent'
                            }`} />
                          </span>
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button className="p-2 cursor-pointer" onClick={handleFullscreen} aria-label={isFullscreen ? 'Sair do modo tela cheia' : 'Tela cheia'}>
                {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Camada inferior de controles - só aparece se hover OU config/legendas abertos */}
      {showAllControls && (
        <div className="w-full flex flex-col items-center px-4 py-4 relative z-10" style={{minHeight: 48}}>
          <div className="w-full flex items-center justify-center gap-4">
            <div className="text-white text-sm min-w-[48px] text-center flex-shrink-0">{formatTime(currentTime)}</div>
            {/* Timeline customizada com hover preview */}
            <div
              ref={timelineRef}
              className="relative flex-1 w-auto cursor-pointer mx-4 h-4 my-2 rounded"
              onClick={handleTimelineClick}
              onMouseDown={handleTimelineMouseDown}
              onMouseMove={handleTimelineMouseMove}
              onMouseLeave={() => { handleTimelineMouseLeave(); setIsTimelineHovered(false); }}
              onMouseEnter={() => setIsTimelineHovered(true)}
            >
              {/* Barra de fundo */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: isTimelineHovered ? 8 : 4,
                  width: '100%',
                  background: '#A0A0A0',
                  borderRadius: isTimelineHovered ? 4 : 0,
                  marginTop: isTimelineHovered ? 4 : 5,
                  zIndex: 1,
                }}
              />
              {/* Barra de progresso */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: isTimelineHovered ? 8 : 6,
                  width: duration ? `${(currentTime / duration) * 100}%` : '0%',
                  background: '#FF5E00',
                  borderRadius: isTimelineHovered ? 4 : 0,
                  marginTop: isTimelineHovered ? 4 : 5,
                  border: isTimelineHovered ? '1px solid #fff' : undefined,
                  zIndex: 2,
                  transition: 'width 0.1s linear',
                }}
              />
              {/* Bolinha (thumb) do progresso */}
              {duration > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    left: `calc(${duration ? (currentTime / duration) * 100 : 0}% - ${(seeking ? 16 : 8)}px)`,
                    width: seeking ? 22 : 16,
                    height: seeking ? 22 : 16,
                    top: seeking ? -2 : 0,
                    background: '#FF5E00',
                    borderRadius: '50%',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    zIndex: 3,
                    pointerEvents: 'none',
                  }}
                />
              )}
              {/* Overlay do preview da miniatura */}
              {hoverThumbnail && hoverPosition !== null && (
                <div
                  style={{
                    position: 'absolute',
                    left: Math.max(0, hoverPosition - 80),
                    bottom: 24,
                    width: 160,
                    height: 90,
                    background: '#222',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    zIndex: 30, // Mantém zIndex alto para o preview
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'relative', width: 160, height: 90 }}>
                    <img
                      src={mainThumbnailUrl}
                      alt="preview"
                      style={hoverSprite ? {
                        position: 'absolute',
                        left: hoverSprite && hoverSprite.w ? -hoverSprite.x * (160 / hoverSprite.w) : 0,
                        top: hoverSprite && hoverSprite.h ? -hoverSprite.y * (90 / hoverSprite.h) : 0,
                        width: hoverSprite && hoverSprite.w ? undefined : 160,
                        height: hoverSprite && hoverSprite.h ? undefined : 90,
                        objectFit: 'cover',
                        maxWidth: 'none',
                        maxHeight: 'none',
                      } : {
                        width: 160,
                        height: 90,
                        objectFit: 'cover',
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: 0,
                      transform: 'translateX(-50%)',
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 600,
                      textShadow: '0 1px 2px #000',
                      background: '#23252B',
                      padding: '2px 8px',
                    }}>{formatTime(hoverTime ?? 0)}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="text-white text-sm min-w-[48px] text-center flex-shrink-0">{formatTime(duration)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;